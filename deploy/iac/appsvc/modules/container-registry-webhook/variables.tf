variable "cr_webhook_name" {
  default = "demowebhook"
  type = string
  description = "specifies the name of the webhook"
}

variable "cr_webhook_location" {
  default = ""
  type = string
  description = "specifies the location"
}

variable "cr_webhook_resource_group_name" {
  default = "demo"
  type = string
  description = "specifies the name of the resource group"
}

variable "cr_webhook_container_registry_name" {
  type = string
  description = "specifies the name of the container registry this webhook belongs to"
}

variable "cr_webhook_scope" {
  type = string
  description = "Specifies the scope of repositories that can trigger an event"
  default = null
}

variable "cr_webhook_service_uri" {
  type = string
  description = "Specifies the service URI for the Webhook to post notifications to"
}
