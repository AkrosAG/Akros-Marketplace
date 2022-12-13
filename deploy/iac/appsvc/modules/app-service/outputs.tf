#output "app_service_default_hostname" {
#  value = azurerm_linux_web_app.web_appdefault_hostname
#}
#
#output "outbound_ip_addresses" {
#  value = azurerm_linux_web_app.web_app.outbound_ip_addresses
#}

output "app_service_name" {
    value = azurerm_linux_web_app.web_app[0].name
}