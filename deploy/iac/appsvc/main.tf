
locals {
  keycloak_appsvc_name = "${var.env_name}-am-keycloak"
  am_marketplace_service_appsvc_name = "${var.env_name}-am-marketplace-service"
  keyvault_key_permissions = [ "Get", "List", "Update", "Create", "Import", "Delete", "Recover", "Backup", "Restore", "Decrypt", "Encrypt", "UnwrapKey", "WrapKey", "Verify", "Sign", "Purge"] 
}

resource "azurerm_resource_group" "rg" {
  name     = "${var.resource_group}-${var.env_name}"
  location = var.location
}

data "azurerm_client_config" "current_user" {}

resource "azurerm_key_vault" "key_vault" {
  name                        = "${var.env_name}-${var.am_key_vault_name}"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  tenant_id                   = data.azurerm_client_config.current_user.tenant_id

  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  enabled_for_disk_encryption = true

  sku_name = "standard"
}

resource "azurerm_user_assigned_identity" "user_assigned_identity" {
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  name                = "${var.env_name}_akrosmarketplace_user_assigned_identity"
}

module "container_registry" {
  source                            = "./modules/container-registry"
  acr_resource_group                = azurerm_resource_group.rg.name
  acr_location                      = azurerm_resource_group.rg.location
  acr_name                          = "${var.env_name}akrosmarketplacecr"
  acr_public_network_access_enabled = true

  depends_on = [
    azurerm_resource_group.rg
  ]
}

data "azurerm_user_assigned_identity" "data_user_assigned_identity" {
  name                = azurerm_user_assigned_identity.user_assigned_identity.name
  resource_group_name = azurerm_user_assigned_identity.user_assigned_identity.resource_group_name

  depends_on = [
    azurerm_user_assigned_identity.user_assigned_identity
  ]
}

data "azurerm_container_registry" "data_container_registry" {
  name                = module.container_registry.acr_name
  resource_group_name = module.container_registry.acr_resource_group

  depends_on = [
    module.container_registry
  ]
}

resource "azurerm_role_assignment" "container_registry_role_assignment" {
  scope                = data.azurerm_container_registry.data_container_registry.id
  role_definition_name = "AcrPull"
  principal_id         = data.azurerm_user_assigned_identity.data_user_assigned_identity.principal_id
}

module "am_postgresql_server" {
  source = "./modules/postgresql-db"
  psql_svr_location = azurerm_resource_group.rg.location
  psql_svr_resource_group_name = azurerm_resource_group.rg.name
  psql_db_name = "amdb"
  psql_svr_name = "${var.env_name}-${var.am_postgresql_server_name}"
  psql_svr_availability_zone = 3
  psql_svr_admin_password = var.postgresql_server_admin_password
  psql_svr_admin_username = var.postgresql_server_admin_username
}

module "keycloak_postgresql_server" {
  source = "./modules/postgresql-db"
  psql_svr_location = azurerm_resource_group.rg.location
  psql_svr_resource_group_name = azurerm_resource_group.rg.name
  psql_db_name = "keycloakdb"
  psql_svr_name = "${var.env_name}-${var.keycloak_postgresql_server_name}" 
  psql_svr_availability_zone = 3
  psql_svr_admin_password = var.postgresql_server_admin_password
  psql_svr_admin_username = var.postgresql_server_admin_username
}

module "am_keycloak_app_service" {
  source                                               = "./modules/app-service"
  appsvc_resource_group                                = azurerm_resource_group.rg.name
  appsvc_location                                      = azurerm_resource_group.rg.location

  appsvc_plan_name        = "${var.env_name}-am-keycloak-plan"
  appsvc_names             = [local.keycloak_appsvc_name]
  appsvc_docker_images     = ["${data.azurerm_container_registry.data_container_registry.login_server}/${var.am_keycloak_image}"]
  appsvc_docker_image_tags = [var.am_keycloak_image_tag]
  appsvc_user_assigned_identity_id = data.azurerm_user_assigned_identity.data_user_assigned_identity.id
  appsvc_container_registry_managed_identity_client_id = azurerm_user_assigned_identity.user_assigned_identity.client_id
  appsvc_acr_login_server = data.azurerm_container_registry.data_container_registry.login_server

  appsvc_website_ports = [7579]

  appsvc_remote_debugging_enabled = var.debugging_enabled
  appsvc_enabled = var.enable_app_services
  
  depends_on = [
    module.container_registry,
    module.keycloak_postgresql_server
  ]
}

module "am_ui_app_service" {
  source                                               = "./modules/app-service"
  appsvc_resource_group                                = azurerm_resource_group.rg.name
  appsvc_location                                      = azurerm_resource_group.rg.location

  appsvc_plan_name        = "${var.env_name}-am-ui-plan"
  appsvc_names             = ["${var.env_name}-am-ui"]
  appsvc_docker_images     = ["${data.azurerm_container_registry.data_container_registry.login_server}/${var.am_ui_image}"]
  appsvc_docker_image_tags = [var.am_ui_image_tag]
  appsvc_user_assigned_identity_id = data.azurerm_user_assigned_identity.data_user_assigned_identity.id
  appsvc_container_registry_managed_identity_client_id = azurerm_user_assigned_identity.user_assigned_identity.client_id
  appsvc_acr_login_server = data.azurerm_container_registry.data_container_registry.login_server

  appsvc_website_ports = [8001]
  appsvc_enabled = var.enable_app_services
  appsvc_remote_debugging_enabled = var.debugging_enabled

  depends_on = [
    module.container_registry,
    module.am_postgresql_server
  ]
}

module "am_marketplace_service_app_service" {
  source                                               = "./modules/app-service"
  appsvc_resource_group                                = azurerm_resource_group.rg.name
  appsvc_location                                      = azurerm_resource_group.rg.location

  appsvc_plan_name        = "${var.env_name}-am-marketplace-service-plan"
  appsvc_names             = [local.am_marketplace_service_appsvc_name]
  appsvc_docker_images     = ["${data.azurerm_container_registry.data_container_registry.login_server}/${var.am_marketplace_service_image}"]
  appsvc_docker_image_tags = [var.am_marketplace_service_image_tag]
  appsvc_user_assigned_identity_id = data.azurerm_user_assigned_identity.data_user_assigned_identity.id
  appsvc_container_registry_managed_identity_client_id = azurerm_user_assigned_identity.user_assigned_identity.client_id
  appsvc_acr_login_server = data.azurerm_container_registry.data_container_registry.login_server

  appsvc_website_ports = [80]
  appsvc_enabled = var.enable_app_services
  appsvc_remote_debugging_enabled = var.debugging_enabled

  depends_on = [
    module.container_registry
  ]
}

module "am_monitoring_app_service" {
  source                                               = "./modules/app-service"
  appsvc_resource_group                                = azurerm_resource_group.rg.name
  appsvc_location                                      = azurerm_resource_group.rg.location

  appsvc_plan_name        = "${var.env_name}-am-monitoring-plan"
  appsvc_names             = ["${var.env_name}-am-prometheus", "${var.env_name}-am-monitoring-service"]
  appsvc_docker_images     = ["${data.azurerm_container_registry.data_container_registry.login_server}/${var.am_prometheus_image}", "${data.azurerm_container_registry.data_container_registry.login_server}/${var.am_grafana_image}"]
  appsvc_docker_image_tags = [var.am_prometheus_image_tag, var.am_grafana_image_tag]
  appsvc_user_assigned_identity_id = data.azurerm_user_assigned_identity.data_user_assigned_identity.id
  appsvc_container_registry_managed_identity_client_id = azurerm_user_assigned_identity.user_assigned_identity.client_id
  appsvc_acr_login_server = data.azurerm_container_registry.data_container_registry.login_server

  appsvc_website_ports = [80, 80]
  appsvc_remote_debugging_enabled = var.debugging_enabled
  appsvc_enabled = var.enable_app_services

  depends_on = [
    module.container_registry
  ]
}

#module "am_keycloak_cr_webhook" {
#  source = "./modules/container-registry-webhook"
#  cr_webhook_name = "webappamkeycloak"
#  cr_webhook_location = azurerm_resource_group.rg.location
#  cr_webhook_resource_group_name = azurerm_resource_group.rg.name
#  cr_webhook_container_registry_name = data.azurerm_container_registry.data_container_registry.name
#  cr_webhook_scope = "${var.am_keycloak_image}:*"
#  cr_webhook_service_uri = ""
#}
#
#module "am_marketplace_service_cr_webhook" {
#  source = "./modules/container-registry-webhook"
#  cr_webhook_name = "webappammarketplaceservice"
#  cr_webhook_location = azurerm_resource_group.rg.location
#  cr_webhook_resource_group_name = azurerm_resource_group.rg.name
#  cr_webhook_container_registry_name = data.azurerm_container_registry.data_container_registry.name
#  cr_webhook_scope = "${var.am_marketplace_service_image}:*"
#  cr_webhook_service_uri = ""
#}
#
#module "am_ui_cr_webhook" {
#  source = "./modules/container-registry-webhook"
#  cr_webhook_name = "webappamui"
#  cr_webhook_location = azurerm_resource_group.rg.location
#  cr_webhook_resource_group_name = azurerm_resource_group.rg.name
#  cr_webhook_container_registry_name = data.azurerm_container_registry.data_container_registry.name
#  cr_webhook_scope = "${var.am_ui_image}:*"
#  cr_webhook_service_uri = ""
#}

data "azurerm_linux_web_app" "data_keycloak_webapp" {
  resource_group_name = azurerm_resource_group.rg.name
  name                = local.keycloak_appsvc_name

  depends_on = [
    module.am_keycloak_app_service
  ]
}

resource "azurerm_key_vault_access_policy" "keycloak_keyvault_access_policy" {
  tenant_id    = data.azurerm_client_config.current_user.tenant_id

  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = data.azurerm_linux_web_app.data_keycloak_webapp.identity[0].principal_id

  key_permissions = local.keyvault_key_permissions

  depends_on = [
    azurerm_key_vault.key_vault    
  ]
}

data "azurerm_linux_web_app" "data_marketplace_service_webapp" {
  resource_group_name = azurerm_resource_group.rg.name
  name                = local.am_marketplace_service_appsvc_name

  depends_on = [
    module.am_marketplace_service_app_service
  ]
}

resource "azurerm_key_vault_access_policy" "am_marketplace_service_keyvault_access_policy" {
  tenant_id    = data.azurerm_client_config.current_user.tenant_id

  key_vault_id = azurerm_key_vault.key_vault.id
  object_id    = data.azurerm_linux_web_app.data_marketplace_service_webapp.identity[0].principal_id

  key_permissions = local.keyvault_key_permissions

  depends_on = [
    azurerm_key_vault.key_vault    
  ]
}
