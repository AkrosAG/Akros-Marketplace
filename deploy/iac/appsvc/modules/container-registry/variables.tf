variable "acr_resource_group" {
  default = "demoakrosmarketplacerg"
}

variable "acr_location" {
  default = "Switzerland North"
}


variable "acr_name" {
  default = "demoakrosmarketplacecr"
}

variable "acr_admin_enabled" {
  default     = true
  type        = bool
  description = "tells whether or not to enable the registry admin"
}

variable "acr_sku" {
  default     = "Standard"
  type        = string
  description = "Stock-keeping Unit to choose from: Standard Prenium and Basic. It is the "
}

variable "acr_public_network_access_enabled" {
  default     = false
  type        = bool
  description = "Tells whether or not the acr will be accessible from the internet"
}