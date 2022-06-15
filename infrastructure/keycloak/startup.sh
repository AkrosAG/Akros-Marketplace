#!/bin/bash
/opt/keycloak/bin/kc.sh import --file /opt/keycloak/realms.json --override false
/opt/keycloak/bin/kc.sh start