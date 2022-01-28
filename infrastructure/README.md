# Installing and Running the Infrastructure

## Databases (local/dev)

For Java-Backend-Developers start only the PostGreSQL database to develop the Rest Services.

- **database_am**: Akros Marketplace Database for marketplace-service.
- **database_userdb**: Authentification and Authorization Database for auth-backend.


## Rest-Services (local/dev)

For Frontend-Developers start all the PostGreSQL databases and the Rest Services to develop the frontend functionality.

Use **restservice** folder configuration.


## Additional Folder

- **db_init_am** : Folder is used for initialization of the database.
- **db_init_userdb** : Folder is used for initialization of the database.
- **pg_data_am** : Folder will be created when starting the database. All database data persists in this folder, so no data loss between restart of the database.
- **pg_data_userdb** : Folder will be created when starting the database. All database data persists in this folder, so no data loss between restart of the database.
