#!/bin/bash

set -e
DIN_CONF_DIR="/usr/share/nginx/html/assets/runtime-configs"
envsubst < ${DIN_CONF_DIR}/app-config.env.json > ${DIN_CONF_DIR}/app-config.json

nginx -g daemon off
