## Local development guide (Fullstack) - Marketplace

### Getting started 
To build the local environment the follow steps must be followed.
1. Docker containers must be started. They are used to start and configure the databases and the authentication services.
The command bellow should be executed from the start_dev folder
   ```
   # UNIX based
   sh start_dev.sh
   # Windows
   ./ start_dev.sh
   ```

2. Starting the backend(marketplace-service) - If containers are set correctly, the backend should be started from the 
IDE. The application should be accessible from the following link: https://localhost:8443
3. Starting the frontend(am-ui) - Navigate to the frontend folder and execute the following commands:
   ```
   npm install
   ```
   ```
    npm run start_ssl
   ```
   The application should be running on the following link: https://localhost:4200

### Additional information

For the authentication is used keycloak. More information about could be found in the following [link](https://www.keycloak.org/).
The market-place database is named: _postgres_am_db_ and it runs on port 5432. To log in the database pgadmin can be used.
Example for login via pgadmin:

<p align="center">
   <img align="center" alt="Pg admin logo" src="./docs_images/pgAdminLogin.png"/>
</p>

Marketplace database credentials - database: am username: am

Keyclock database credentials: - database: keycloakdb username: keycloakdb 

### Possible problems
- Make sure that, the postgres is not started as service on your local machine, because this is the default port for the postgres instance,
  that's why a running instance can lead to problems!
- Permission denied: Check files with extension _.sh_ the line separator format should be **LF** NOT **CRLF**.
  Easiest way is in Notepad, Visual Studio Code or IntelliJ
- Permission denied **UNIX** based operating systems: Make sure that all files with
  extension _.sh_ have **read, write** and **execute** permissions. This can be checked in the directory of the file with
  the command ``` ls -ll```. The second, third and fourth character should look similar as the output bellow (**rwx**):
  ```
  -rwxr-xr-x@  1 atanasatanasov  staff  254 Dec  9 11:23 01-init-keycloak.sh
  ```
  The first picture bellow shows how a problem with the permissions might look.

  <p align="center">
   <img align="center" alt="Problem with permissions" src="./docs_images/permissionsProblem.png"/>
  </p>
  <br/>
  The second picture shows how the permissions problem were fixed.
   <p align="center">
   <img align="center" alt="Permissions fixed" src="./docs_images/permissionsFixed.png"/>
  </p>





