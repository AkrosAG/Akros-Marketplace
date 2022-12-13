terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.32.0"
    }
  }
}

resource "azurerm_container_registry" "acr" {
  name                          = var.acr_name
  resource_group_name           = var.acr_resource_group
  location                      = var.acr_location
  sku                           = var.acr_sku
  admin_enabled                 = var.acr_admin_enabled
  public_network_access_enabled = var.acr_public_network_access_enabled
}
