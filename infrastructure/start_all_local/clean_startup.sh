#!/bin/bash
docker container prune -f
docker image prune -f
docker image rm start_all_local_marketplace-service:latest start_all_local_admin-ui:latest start_all_local_auth-service:latest start_all_local_client-ui:latest
docker volume rm am_db --force
docker volume rm keycloak_db --force
docker-compose up -d 