# Akros Marketplace Incubator

## Folder Organisation
1. **datamodel**: Description of the data model for the market place.
2. **infrastructure**: How to run this project in different container model configurations.
	- **database_only**: Initializes and starts the database locally for Rest Service Backend developers.
	- **restservices**: Initializes and starts the database locally and run the Rest Service Backend for frontend developers.
3. **data-backend-service**: Rest-Services for the frontend. Accesses the database schema **am** and saves configurationSaves 
4. **administration-business-ui**: Administration and configuration tool for the dynamic parameters of the marketplace.
5. **am-auth-backend**: Service Backend for authorisation and authentification. 
6. **am-ui**: Marketplace Frontend Site. Web Site for the marketplace. Accesses the Rest Services of **data-backend-services** to fetch data and configuration for the marketplace. Accesses the **ui-auth-backend** and **am-ui-login** for login of users.
7. **am-ui-login**: Rest Service for authorisation and authentification. Stores the data in the database schema **userdb**.
8. **documents**: Temporary documents of the project.
9. **architecture**: Architecture documents of the project.