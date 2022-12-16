output "acr_login_server" {
  value       = module.container_registry.acr_login_server
  description = "container registry"
}

output "acr_admin_passwd" {
  value       = module.container_registry.acr_admin_passwd
  description = "container registry admin password"
  sensitive   = true
}

output "acr_admin_username" {
  value       = module.container_registry.acr_admin_username
  description = "container registry admin username"
  sensitive   = true
}

output "am_ui_appsvc_name" {
  value = module.am_ui_app_service.app_service_name
  sensitive = false
}

output "am_market_place_service_appsvc_name" {
  value = module.am_marketplace_service_app_service.app_service_name
  sensitive = false
}

output "am_keycloak_app_service_name" {
  value = module.am_keycloak_app_service.app_service_name
  sensitive = false
}

output "am_monitoring_prometheus_app_service_name" {
  value = module.am_monitoring_app_service.app_service_name
  sensitive = false
}

output "am_monitoring_grafana_app_service_name" {
  value = module.am_monitoring_app_service.app_service_name
  sensitive = false
}

output "am_resource_group_name" {
  value = azurerm_resource_group.rg.name
  sensitive = false
}
