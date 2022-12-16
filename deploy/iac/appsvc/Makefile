#TARGET: PREREQUISITES
#	RECIPE
#--------------------
#
# run `make <target>` to run this rule
#<target>:	<prerequisite 1> <prerequisite 2> <prerequisite N>
#	<command 1>
#	<command 2>

#Usage:
# make        #
# make clean  #
.PHONY: build-infra destroy-infra __help

#Generate a random password: openssl rand -base64 12
POSTGRESQL_ADMIN_USERNAME ?= yN1DtHZ3nFR3piP5
POSTGRESQL_ADMIN_PASSWORD ?= dREP/8yyXtZxkPAO

AM_UI_IMG ?= am/client-ui
AM_UI_IMG_TAG ?= latest

AM_MARKETPLACE_SVC_IMG ?= am/marketplace-service
AM_MARKETPLACE_SVC_IMG_TAG ?= latest

AM_KEYCLOAK_IMG ?= am/keycloak-service
AM_KEYCLOAK_IMG_TAG ?= latest

AM_PROMETHEUS_IMG ?= am-monitoring/prometheus
AM_PROMETHEUS_IMG_TAG ?= latest

AM_GRAFANA_IMG ?= am-monitoring/grafana
AM_GRAFANA_IMG_TAG ?= latest

ENV_NAME ?= demo

__help:
	@echo "---------------------------------"
	@echo "HELP:"
	@echo "	make <build-infra|destroy-infra>"

build-infra:
	@echo "---------------------------------"
	@terraform init
	@TF_LOG=Debug terraform apply --auto-approve 							\
	-var="env_name=${ENV_NAME}"												\
	-var="am_ui_image=${AM_UI_IMG}" 										\
	-var="am_ui_image_tag=${AM_UI_IMG_TAG}"									\
	-var="am_marketplace_service_image=${AM_MARKETPLACE_SVC_IMG}"			\
	-var="am_marketplace_service_image_tag=${AM_MARKETPLACE_SVC_IMG_TAG}"	\
	-var="am_keycloak_image=${AM_KEYCLOAK_IMG}"								\
	-var="am_keycloak_image_tag=${AM_KEYCLOAK_IMG_TAG}"						\
	-var="am_prometheus_image=${AM_PROMETHEUS_IMG}"							\
	-var="am_prometheus_image_tag=${AM_PROMETHEUS_IMG_TAG}"					\
	-var="am_grafana_image=${AM_GRAFANA_IMG}"								\
	-var="am_grafana_image_tag=${AM_GRAFANA_IMG_TAG}"						\
	-var="postgresql_server_admin_username=${POSTGRESQL_ADMIN_USERNAME}"	\
	-var="postgresql_server_admin_password=${POSTGRESQL_ADMIN_PASSWORD}"	\
	-var="am_key_vault_name=am-keyvault"

destroy-infra:
	@echo "---------------------------------"
	@terraform destroy --auto-approve -var="env_name=demo"

.ONESHELL:
provision_acr:
	@echo "---------------------------------"
	@DOCKER_REGISTRY=$$(terraform output acr_login_server         | tr -d "\"")
	@DOCKER_REGISTRY_USR=$$(terraform output acr_admin_username   | tr -d "\"")
	@DOCKER_REGISTRY_PSSWD=$$(terraform output acr_admin_passwd   | tr -d "\"")
	@AM_REGISTRY=$${DOCKER_REGISTRY}                										\
	DOCKER_USER=$${DOCKER_REGISTRY_USR}             										\
	DOCKER_PASSWD=$${DOCKER_REGISTRY_PSSWD}         										\
	INPUT_CLIENT_UI_IMAGE="${AM_UI_IMG}:${AM_UI_IMG_TAG}"              						\
	INPUT_MARKETPLACE_SVC_IMAGE="${AM_MARKETPLACE_SVC_IMG}:${AM_MARKETPLACE_SVC_IMG_TAG}"   \
	INPUT_AUTH_SVC_IMAGE="${AM_KEYCLOAK_IMG}:${AM_KEYCLOAK_IMG_TAG}"                		\
	INPUT_PROMETHEUS_IMAGE="${AM_PROMETHEUS_IMG}:${AM_PROMETHEUS_IMG_TAG}"           		\
	INPUT_GRAFANA_IMAGE="${AM_GRAFANA_IMG}:${AM_GRAFANA_IMG_TAG}"                  			\
	make -C acr_provision build-and-push-images


start_all_app_services:
	@echo "---------------------------------"
	@./start_appsvc.sh am_resource_group_name


all: build-infra provision_acr start_all_app_services
	@echo "---------------------------------"
