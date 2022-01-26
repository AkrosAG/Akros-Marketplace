## Database **postgres_am_db**

- This command runs a preconfigured PostgreSQL database.
- This is primary used for backend developers using a database to test their Rest-Service to the marketplace functionality used by the Service **marketplace-service**.

### Database Configuration
- **user** : am
- **password** : am
- **database_name** : am
- **host** : localhost
- **port** : 5432

### PostgreSQL Data Files / Reinitialize Database

The data files are stored in sub directory **../pg_data_am**. This directory is once created on first run and installs the required tables, views and initializes the data. 

To rebuild the database, shut the database down and delete the **../pg_data_am** directory. On next start the database will be reinitialized again.

The folder **../db_init** is used for initialization of the database.

### Warning

The initialization will fail, if encoding of file **../db_init/01-init.sh** is not Unix like. Line endings have to be CR and not Windows like CRLF.

**Do this manually:**
- Convert to Unix with command : **dos2unix < 01-init.sh > 01-init.sh.ux** (replace old file with new one)


**Or activate always treat line endings Unix like to CR:**
- Force git not to autoconvert CR to CRLF (always CR) : **git config --global core.autocrlf false**


### Start/Stop
- **start**: docker-compose up
- **stop**: docker-compose down


### Clean Restart
- **clean_startup.sh**: Use this shell script to reset the database to clean startup settings.


### Data Model

The data model is described in folder 'datamodel'.

