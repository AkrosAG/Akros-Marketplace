#!/bin/bash
set -e

az version > /dev/null
if [  "$?" -ne 0 ]; then  
    echo "command 'az' not found" 
    exit 1
fi

RESOURCE_GROUP=$(terraform output ${1} | tr -d "\"")
COUNT=$(az webapp list --resource-group ${RESOURCE_GROUP} | jq '. | length')
COUNT=$(( $COUNT - 1 ))

for i in $(seq 0 ${COUNT}); do
    APPSVC_NAME=$(az webapp list --resource-group ${RESOURCE_GROUP} | jq ".[${i}].name" | tr -d "\"")
    az webapp update --name ${APPSVC_NAME} --resource-group ${RESOURCE_GROUP} --set enabled=true
done


