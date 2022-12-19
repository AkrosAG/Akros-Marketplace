# Installing and Running the Infrastructure

## Database (local/dev)

For Java-Backend-Developers start only keycloak auth service to develop the Rest Services.

- **database_am**: Akros Marketplace Database for marketplace-service.

## Rest-Services (local/dev)

For Frontend-Developers start all the Rest Services to develop the frontend functionality.

Use **restservice** folder configuration.


## Additional Folder

- **db_init_am** : Folder is used for initialization of the database.
- **pg_data_am** : Folder will be created when starting the database. All database data persists in this folder, so no data loss between restart of the database.