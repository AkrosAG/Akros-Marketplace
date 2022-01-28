#!/bin/bash
rm -rf ../pg_data_am
rm -rf ../pg_data_userdb
docker container prune -f
docker image prune -f
docker image rm restservices_marketplace-service:latest restservices_admin-ui:latest restservices_auth-service:latest
docker-compose up
