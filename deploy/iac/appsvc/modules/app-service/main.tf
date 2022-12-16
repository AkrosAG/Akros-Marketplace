terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.32.0"
    }
  }
}

resource "azurerm_service_plan" "appsvc_plan" {
  name                = var.appsvc_plan_name
  resource_group_name = var.appsvc_resource_group
  location            = var.appsvc_location
  os_type             = "Linux"
  sku_name            = var.appsvc_sku_name
}

resource "azurerm_linux_web_app" "web_app" {
  count               = length(var.appsvc_names)
  resource_group_name = var.appsvc_resource_group
  location            = var.appsvc_location

  name            = var.appsvc_names[count.index]
  service_plan_id = azurerm_service_plan.appsvc_plan.id

  https_only = true
  enabled    = var.appsvc_enabled

  site_config {
    always_on                = false
    minimum_tls_version      = "1.2"
    ftps_state               = "FtpsOnly"
    remote_debugging_enabled = var.appsvc_remote_debugging_enabled

    container_registry_use_managed_identity       = true
    container_registry_managed_identity_client_id = var.appsvc_container_registry_managed_identity_client_id

    application_stack {
      docker_image     = var.appsvc_docker_images[count.index]
      docker_image_tag = var.appsvc_docker_image_tags[count.index]
    }
  }

  app_settings = var.appsvc_appsettings[count.index]

  identity {
    type         = "SystemAssigned, UserAssigned"
    identity_ids = [var.appsvc_user_assigned_identity_id]
  }
}
