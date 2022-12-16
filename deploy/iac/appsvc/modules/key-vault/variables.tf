variable "key_vault_name" {
  default     = "demokeyvault"
  type        = string
  description = "specifies the name of the keyvault"
}

variable "key_vault_location" {
  default     = ""
  type        = string
  description = "specifies the location"
}

variable "key_vault_resource_group_name" {
  default     = "demo"
  type        = string
  description = "specifies the name of the resource group"
}

variable "key_vault_sku_name" {
  default     = "standard"
  type        = string
  description = "specifies the Name of the SKU used for this Key Vault"
}

variable "key_vault_tenant_id" {
  type        = string
  description = "Specifies the Azure Active Directory tenant ID that should be used for authenticating requests to the key vault"
}

variable "key_vault_object_id" {
  type        = string
  description = "Specifies the object ID of a user, service principal or security group in the Azure Active Directory tenant for the vault"
}

variable "key_vault_application_id" {
  type        = string
  description = "Specifies the object ID of an Application"
}

variable "key_vault_key_permissions" {
  type        = list(string)
  description = ""
  default     = []
}

variable "key_vault_secret_permissions" {
  type        = list(string)
  description = ""
  default     = []
}

variable "key_vault_storage_permissions" {
  type        = list(string)
  description = ""
  default     = []
}

variable "key_vault_certificate_permissions" {
  type        = list(string)
  description = ""
  default     = []
}
