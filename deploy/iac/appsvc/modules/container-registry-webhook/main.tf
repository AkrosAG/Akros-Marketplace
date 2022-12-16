terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.32.0"
    }
  }
}


resource "azurerm_container_registry_webhook" "webhook" {
  name                = var.cr_webhook_name
  resource_group_name = var.cr_webhook_resource_group_name
  location            = var.cr_webhook_location

  registry_name = var.cr_webhook_container_registry_name

  service_uri = var.cr_webhook_service_uri
  scope       = var.cr_webhook_scope

  status  = "enabled"
  actions = ["push"]
  custom_headers = {
    "Content-Type" = "application/json"
  }
}