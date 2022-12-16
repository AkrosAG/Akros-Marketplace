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
.PHONY: build-images 

#Variables:
ROOT_DIR  ?= "../../../../"

DOCKER_PASSWD ?= ""
DOCKER_USER   ?= ""

AM_REGISTRY   			?= demoakrosmarketplacecr.azurecr.io

INPUT_CLIENT_UI_IMAGE 		?= am/client-ui:latest
INPUT_MARKETPLACE_SVC_IMAGE	?= am/marketplace-service:latest
INPUT_AUTH_SVC_IMAGE		?= am/keycloak-service:latest
INPUT_PROMETHEUS_IMAGE		?= am-monitoring/prometheus:latest
INPUT_GRAFANA_IMAGE			?= am-monitoring/grafana:latest

CLIENT_UI_IMAGE 		?= ${AM_REGISTRY}/${INPUT_CLIENT_UI_IMAGE}
MARKETPLACE_SVC_IMAGE	?= ${AM_REGISTRY}/${INPUT_MARKETPLACE_SVC_IMAGE}
AUTH_SVC_IMAGE			?= ${AM_REGISTRY}/${INPUT_AUTH_SVC_IMAGE}
PROMETHEUS_IMAGE		?= ${AM_REGISTRY}/${INPUT_PROMETHEUS_IMAGE}
GRAFANA_IMAGE			?= ${AM_REGISTRY}/${INPUT_GRAFANA_IMAGE}

define LIST_OF_TARGETS_WHICH_BUILDS_IMAGES
_build-client-ui-image				\
_build-marketplace-service-image	\
_build-auth-service-image			\
_build-prometheus-image				\
_build-grafana-image
endef

define LIST_OF_TARGETS_WHICH_PUSHES_IMAGES
_push-client-ui-image				\
_push-marketplace-service-image		\
_push-auth-service-image			\
_push-prometheus-image				\
_push-grafana-image
endef

__help:
	@echo "---------------------------------"
	@echo "HELP:"
	@echo "	make <target>"
	@echo "	make <build-and-push-images|build-images|push-images>"

#----------------------------------------
.ONESHELL:
_build-client-ui-image:
	@echo "---------------------------------"
	@cd ${ROOT_DIR}
	@if [ -z "${CLIENT_UI_IMAGE}" ]; then echo "CLIENT_UI_IMAGE is empty"; exit 1; fi
	@docker build -t ${CLIENT_UI_IMAGE} -f ./am-ui/Dockerfile .

.ONESHELL:
_build-marketplace-service-image:
	@echo "---------------------------------"
	@cd ${ROOT_DIR}
	@@if [ -z "${MARKETPLACE_SVC_IMAGE}" ]; then echo "MARKETPLACE_SVC_IMAGE is empty"; exit 1; fi
	@docker build -t ${MARKETPLACE_SVC_IMAGE} -f ./marketplace-service/Dockerfile .

.ONESHELL:
_build-auth-service-image:
	@echo "---------------------------------"
	@cd ${ROOT_DIR}
	@if [ -z "${AUTH_SVC_IMAGE}" ]; then echo "AUTH_SVC_IMAGE is empty"; exit 1; fi
	@DOCKER_BUILDKIT=1 docker build -t ${AUTH_SVC_IMAGE} -f ./infrastructure/keycloak/Dockerfile .

.ONESHELL:
_build-prometheus-image:
	@echo "---------------------------------"
	@cd ${ROOT_DIR}
	@if [ -z "${PROMETHEUS_IMAGE}" ]; then echo "PROMETHEUS_IMAGE is empty"; exit 1; fi
	@echo "${PROMETHEUS_IMAGE}"
	@docker build -t "${PROMETHEUS_IMAGE}" -f ./infrastructure/prometheus/Dockerfile .

.ONESHELL:
_build-grafana-image:
	@echo "---------------------------------"
	@cd ${ROOT_DIR}
	@if [ -z "${GRAFANA_IMAGE}" ]; then echo "GRAFANA_IMAGE is empty"; exit 1; fi
	@docker build -t ${GRAFANA_IMAGE} -f ./infrastructure/grafana/Dockerfile .

#----------------------------------------
_push-client-ui-image:
	@echo "---------------------------------"
	@docker push ${CLIENT_UI_IMAGE}

_push-marketplace-service-image:
	@echo "---------------------------------"
	@docker push ${MARKETPLACE_SVC_IMAGE}

_push-auth-service-image:
	@echo "---------------------------------"
	@docker push ${AUTH_SVC_IMAGE}

_push-prometheus-image:
	@echo "---------------------------------"
	@docker push ${PROMETHEUS_IMAGE}

_push-grafana-image:
	@echo "---------------------------------"
	@docker push ${GRAFANA_IMAGE}

#----------------------------------------
_docker-login:
	@echo "---------------------------------"
	@if [ -z "${DOCKER_PASSWD}" -o -z "${DOCKER_USER}" -o -z "${AM_REGISTRY}" ]; then echo "missing data for docker login"; exit 1; fi
	@echo ${DOCKER_PASSWD} | docker login ${AM_REGISTRY} --username ${DOCKER_USER} --password-stdin

_docker-logout:
	@echo "---------------------------------"
	@if [ -z "${AM_REGISTRY}" ]; then echo "missing registry. Docker logout not possible"; exit 1; fi
	@docker logout ${AM_REGISTRY}

#----------------------------------------
.SECONDEXPANSION:
build-images: $(LIST_OF_TARGETS_WHICH_BUILDS_IMAGES)
	@echo "---------------------------------"

.SECONDEXPANSION:
push-images: $(LIST_OF_TARGETS_WHICH_PUSHES_IMAGES)
	@echo "---------------------------------"

#----------------------------------------
build-and-push-images: _docker-login build-images push-images _docker-logout
	@echo "---------------------------------"

_push_image_test: _docker-login _build-grafana-image _push-grafana-image _docker-logout
	@echo "---------------------------------"

