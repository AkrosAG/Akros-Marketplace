terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "3.32.0"
    }
  }
}

resource "azurerm_postgresql_flexible_server" "postgres_db_server" {
  name                   = var.psql_svr_name
  resource_group_name    = var.psql_svr_resource_group_name
  location               = var.psql_svr_location
  version                = var.psql_svr_version
  administrator_login    = var.psql_svr_admin_username
  administrator_password = var.psql_svr_admin_password
  sku_name               = var.psql_svr_sku_name
  storage_mb             = var.psql_svr_storage_mb
  zone                   = var.psql_svr_availability_zone

  backup_retention_days = var.psql_svr_backup_retention_days
  create_mode           = "Default"

  timeouts {
    read   = "20m"
    create = "20m"
  }
}

resource "azurerm_postgresql_flexible_server_database" "postgres_db" {
  name      = var.psql_db_name
  server_id = azurerm_postgresql_flexible_server.postgres_db_server.id
  collation = "en_US.utf8"
  charset   = "UTF8"
}