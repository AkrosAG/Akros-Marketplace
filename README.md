# Akros-Marketplace


## Folder Organisation
1. **architecture**: Architecture documents of the project.
2. **datamodel**: Description of the data model for the marketplace.
3. **infrastructure**: How to run this project in different container model configurations.
    - **postgres_am_db**: Initializes and starts the database **postgres_am_db** locally for Rest Service developers using the **marketplace-service**.
    - **postgres_user_db**: Initializes and starts the database **postgres_user_db** locally for Rest Service Backend developers using the **auth-service**.
    - **restservices**: Initializes and starts all databases locally and run all services for frontend developers.
    - **start_all_local**: Initializes and starts the application complete locally by starting all databases, services and the frontend containers.
4. **marketplace-service**: Rest-Services for the frontend. Accesses the database **postgres_am_db** schema **am**. 
5. **admin-ui**: Administration and configuration tool for the dynamic parameters of the marketplace.
6. **client-ui**: Marketplace Frontend Site. Web-Site for the marketplace. Accesses the Rest Services of **marketplace-service** to fetch data and configuration for the marketplace and access the **auth-service** for login of users.
7. **am-auth-backend**: Service Backend for authorisation and authentification. 
8. **am-ui-login**: Rest Service for authorisation and authentification. Stores the data in the database schema **userdb**.
9. **documents**: Temporary documents of the project.
