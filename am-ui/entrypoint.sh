#!/bin/bash

echo "------------------------------------------------------"
echo "------------------------ START  ----------------------"
echo "------------------------------------------------------"
set -e
DIN_CONF_DIR="/usr/share/nginx/html/assets/runtime-configs"
envsubst < ${DIN_CONF_DIR}/app-config.env.json > ${DIN_CONF_DIR}/app-config.json

envsubst '$NGINX_UPSTREAM_MARKETPLACE_SERVICE,$NGINX_UPSTREAM_MONITORING_SERVICE,$NGINX_UPSTREAM_AUTH_SERVICE' < /etc/nginx/nginx.env.conf > /etc/nginx/conf.d/default.conf 

#for debugging purpose only
echo "----------- /etc/nginx/conf.d/default.conf--------------"
cat /etc/nginx/conf.d/default.conf
echo "---------- ${DIN_CONF_DIR}/app-config.json ------------"
cat ${DIN_CONF_DIR}/app-config.json
echo "-------------------------------------------------------"

/docker-entrypoint.sh nginx -g 'daemon off;'

echo "------------------------------------------------------"
echo "------------------------ END  ------------------------"
echo "------------------------------------------------------"
