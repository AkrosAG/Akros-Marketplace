# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
  }

  required_version = ">= 1.1.0"
}

# data "azurerm_client_config" "current" {}

provider "azurerm" {
  features {}
}

data "azurerm_client_config" "current" {
}

data "azurerm_subscription" "current" {}

data "azurerm_role_definition" "contributor" {
  name = "Contributor"
}

variable "AM_DB_LOGIN" {
  type = string
}

variable "AM_DB_PASSWORD" {
  type = string
}

resource "azurerm_resource_group" "rg" {
  name     = "amp-test"
  location = "Switzerland North"
}

resource "azurerm_user_assigned_identity" "amp-mi" {
    resource_group_name = azurerm_resource_group.rg.name
    name = "amp-mi"
    location = azurerm_resource_group.rg.location
}


resource "azurerm_container_registry" "acr" {
  name                = "ampcrtest"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard"
  admin_enabled       = true
}

resource "azurerm_key_vault" "key_vault" {
  name                        = "amp-kv-test"
  location                    = azurerm_resource_group.rg.location
  resource_group_name         = azurerm_resource_group.rg.name
  enabled_for_disk_encryption = true
  tenant_id                   = data.azurerm_client_config.current.tenant_id
  soft_delete_retention_days  = 90
  purge_protection_enabled    = false

  sku_name = "standard"

  access_policy {
    tenant_id = data.azurerm_client_config.current.tenant_id
    object_id = data.azurerm_client_config.current.object_id

    key_permissions = [
      "Get",
      "List",
      "Update",
      "Create",
      "Import",
      "Delete",
      "Recover",
      "Backup",
      "Restore",
      "Decrypt",
      "Encrypt",
      "UnwrapKey",
      "WrapKey",
      "Verify",
      "Sign",
      "Purge",
    ]

    secret_permissions = [
      "Get",
    ]

    storage_permissions = [
      "Get",
    ]
  }
}

resource "azurerm_postgresql_flexible_server" "database" {
  name                   = "amp-db-test"
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  version                = "13"
  administrator_login    = var.AM_DB_LOGIN
  administrator_password = var.AM_DB_PASSWORD
  zone                   = "1"

  storage_mb = 32768

  sku_name   = "B_Standard_B1ms"
}

resource "azurerm_service_plan" "amp-marketplace-service-plan" {
  name                = "amp-marketplace-service-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "B1"
  
}

resource "azurerm_linux_web_app" "amp-marketplace-service" {
  name                = "amp-marketplace-service"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_service_plan.amp-marketplace-service-plan.location
  service_plan_id     = azurerm_service_plan.amp-marketplace-service-plan.id
  
  site_config {}
}

resource "azurerm_service_plan" "amp-ui-service-plan" {
  name                = "amp-ui-service-plan"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "amp-ui-service" {
  name                = "amp-ui-service"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_service_plan.amp-ui-service-plan.location
  service_plan_id     = azurerm_service_plan.amp-ui-service-plan.id

  site_config {}
}