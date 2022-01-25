#!/bin/bash
rm -rf ../pg_data_am
rm -rf ../pg_data_userdb
docker container prune -f
docker image prune -f
docker image rm restservices_data-service-backend:latest restservices_administration-business-ui:latest
docker-compose up
