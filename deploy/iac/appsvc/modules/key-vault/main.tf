terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.32.0"
    }
  }
}



resource "azurerm_key_vault" "key_vault" {
  name                        = var.key_vault_name
  location                    = var.key_vault_location
  resource_group_name         = var.key_vault_resource_group_name
  tenant_id                   = var.key_vault_tenant_id

  soft_delete_retention_days  = 7
  purge_protection_enabled    = false
  enabled_for_disk_encryption = true

  sku_name = var.key_vault_sku_name
}
