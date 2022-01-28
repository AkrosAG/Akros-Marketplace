## Database **postgres_user_db**

- This command runs a preconfigured PostgreSQL database.
- This is primary used for backend developers using a database to test their Rest-Service to the Authorisation and Authentification service.

### Database Configuration
- **user** : userdb
- **password** : userdb
- **database_name** : userdb
- **host** : localhost
- **port** : 5433

### PostgreSQL Data Files / Reinitialize Database

The data files are stored in sub directory **../pg_data_userdb**. This directory is once created on first run and installs the required tables, views and initializes the data. 

To rebuild the database, shut the database down and delete the **../pg_data_db** directory. On next start the database will be reinitialized again.

The folder **../db_init_userdb** is used for initialization of the database.

### Warning

The initialization will fail, if encoding of file **../db_init_userdb/01-init-userdb.sh** is not Unix like. Line endings have to be CR and not Windows like CRLF.

**Do this manually:**
- Convert to Unix with command : **dos2unix < 01-init-userdb.sh > 01-init-userdb.sh.ux** (replace old file with new one)


**Or activate always treat line endings Unix like to CR:**
- Force git not to autoconvert CR to CRLF (always CR) : **git config --global core.autocrlf false**


### Clean Restart
- **clean_startup.sh**: Use this shell script to reset the database to clean startup settings.


### Start/Stop
- **start**: docker-compose up
- **stop**: docker-compose down

