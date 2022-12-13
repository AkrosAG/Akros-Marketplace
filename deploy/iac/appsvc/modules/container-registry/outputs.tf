output "acr_admin_username" {
  value       = azurerm_container_registry.acr.admin_username
  description = "username to use for docker login"
  sensitive   = true
}

output "acr_admin_passwd" {
  value     = azurerm_container_registry.acr.admin_password
  sensitive = true
}

output "acr_login_server" {
  value       = azurerm_container_registry.acr.login_server
  description = "The URL of this container registry"
}

output "acr_name" {
  value = azurerm_container_registry.acr.name
}

output "acr_resource_group" {
  value = azurerm_container_registry.acr.resource_group_name
}