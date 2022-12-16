variable "psql_svr_sku_name" {
  type    = string
  default = "B_Standard_B1ms"
}

variable "psql_svr_name" {
  type        = string
  description = "specifies the name of the postgresql database server"
}

variable "psql_svr_resource_group_name" {
  type = string
}

variable "psql_svr_location" {
  type = string
}

variable "psql_svr_version" {
  type        = string
  description = "set the PostgreSQL version"
  default     = "13"
}

variable "psql_svr_admin_username" {
  type        = string
  description = "postgreSQL administrator username"
}

variable "psql_svr_admin_password" {
  type        = string
  description = "postgreSQL administrator password"
}

variable "psql_svr_storage_mb" {
  default     = 32768
  type        = number
  description = "specifies the maximum amount of storage available to the postgreSQL db server"
}

variable "psql_svr_availability_zone" {
  type        = string
  default     = "3"
  description = "Specifies the Availability Zone in which the PostgreSQL Flexible Server should be located."
}

variable "psql_svr_backup_retention_days" {
  type        = number
  description = "how long (in days) are the backups kept"
  default     = 7
}

variable "psql_db_name" {
  type        = string
  description = "specifies the name of the database"
  default     = "am_demo_db"
}