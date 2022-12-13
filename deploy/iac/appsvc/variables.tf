variable "env_name" {
  type = string
  description = "prefix set before names of each resource."
  default = "demo"
}

variable "resource_group" {
  default     = "am"
  description = "akros-marketplace resource group"
  type        = string
}

variable "location" {
  default = "Switzerland North"
  type    = string
}

variable "container_registry" {
  type        = string
  default     = "akrosmarketplacecr"
  description = "name of akros marketplace container registry "
}

variable "am_ui_image" {
  type        = string
  description = "set am ui image"
  default = "am/client-ui"
}

variable "am_ui_image_tag" {
  type        = string
  description = "set am ui image tag"
  default = "latest"  
}

variable "am_keycloak_image" {
  type        = string
  description = "set keycloak image"
  default = "am/keycloak-service"  
}

variable "am_keycloak_image_tag" {
  type        = string
  description = "set keycloak image tag"
  default = "latest"
}

variable "am_marketplace_service_image" {
  type        = string
  description = "specifies the marketplace-service image"
  default = "am/marketplace-service"  
}

variable "am_marketplace_service_image_tag" {
  type        = string
  description = "specifies the marketplace-service image tag"
  default = "latest"
}

variable "am_grafana_image" {
  type        = string
  description = "specifies the grafana image"
  default = "am-monitoring/grafana"
}

variable "am_grafana_image_tag" {
  type        = string
  description = "specifies the grafana image tag"
  default = "latest"
}

variable "am_prometheus_image" {
  type        = string
  description = "specifies the prometheus image"
  default = "am-monitoring/prometheus"
}

variable "am_prometheus_image_tag" {
  type        = string
  description = "specifies the prometheus image tag"
  default = "latest"
}

variable "debugging_enabled" {
  type = bool
  description = "allow remote debugging"
  default = false
}

variable "postgresql_server_admin_username" {
  type = string
  description = "specifies the username of administrator the postgresql database server"
  sensitive = true
  default = "ibkz4bCyNDDv3Heb"
}

variable "postgresql_server_admin_password" {
  type = string
  description = "specifies the password of the administrator of the postgresql database server"
  sensitive = true
  default = "8pAXOPS/TJSDmkfao84="
}

variable "keycloak_postgresql_server_name" {
  type = string
  default = "keycloak-psql-server"
}

variable "am_postgresql_server_name" {
  type = string
  default = "am-psql-server"
}

variable "am_key_vault_name" {
  type = string
  default = "am-keyvault"
  description = "name of the azure keyvault"
}

variable "enable_app_services" {
  type = bool
  description = "Should the app services be enabled ?"
  default = false
}