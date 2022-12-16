variable "appsvc_plan_name" {
  default = "akrosmarketplacedemo"
}

variable "appsvc_resource_group" {
  default = "demoakrosmarketplacerg"
}

variable "appsvc_location" {
  default = "Switzerland North"
}

variable "appsvc_sku_name" {
  default     = "B1"
  description = "type of the sku"
}

variable "appsvc_container_registry_managed_identity_client_id" {
  type        = string
  description = "user managed identity with role acr_pull"
}

variable "appsvc_user_assigned_identity_id" {
  type = string
  description = "identity of the resource"
  default = "none"
}

variable "appsvc_acr_login_server" {
  type = string
  description = "container registry url"
  default = "none"
}

variable "appsvc_remote_debugging_enabled" {
  type = bool
  description = "enable remote debugging"
  default = false
}

variable "appsvc_names" {
  type = list(string)
  default = ["demomarketplaceapp"]
  description = "specifies the name of all app-service to create with this app-service-plan"
}

variable "appsvc_docker_images" {
  type = list(string)
  default     = ["nginx"]
  description = "application docker images"
}

variable "appsvc_docker_image_tags" {
  type = list(string)
  default     = ["latest"]
  description = "application docker images tags"
}

variable "appsvc_website_ports" {
  type = list(number)
  default = [80]
  description = "specifies the ports where each application  will be accessed at"
}

variable "appsvc_enabled" {
  type = bool
  description = "should the app service be enabled ?"
  default = false  
}
