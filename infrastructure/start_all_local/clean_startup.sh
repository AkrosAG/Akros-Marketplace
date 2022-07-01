#!/bin/bash
rm -rf ../pg_data_am
rm -rf ../pg_data_userdb
rm -rf ../pg_data_keycloakdb
docker container prune -f
docker image prune -f
docker image rm start_all_local_marketplace-service:latest start_all_local_admin-ui:latest start_all_local_auth-service:latest start_all_local_client-ui:latest
docker-compose up
