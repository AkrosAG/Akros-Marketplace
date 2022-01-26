# Akros-Marketplace

## README

Akros Marketplace, short AMP, is an application for companies internal advertising and is used for search and advertise an appartement, a room a roommate. The application is  expandable and can include additional categories e.g. to search and advertise ride- or clothes-sharing, rent a car, et cetera. 

The project is hosted on Github public. Open source license has to be defined (suggestion: Apache License). Public means that the code is an AKROS business card. Quality and state of the art development is essential.

The application should serve to train and practice the Akros employee for current and future development processes, technologies and "best practices".

## Folder Organisation
1. **datamodel**: Description of the data model for the market place.
2. **infrastructure**: How to run this project in different container model configurations.
	- **database_only**: Initializes and starts the database locally for Rest Service Backend developers.
	- **restservices**: Initializes and starts the database locally and run the Rest Service Backend for frontend developers.
3. **data-backend-service**: Rest-Services for the frontend. Accesses the database schema **am** and saves configurationSaves 
4. **admin-ui**: Administration and configuration tool for the dynamic parameters of the marketplace.
5. **am-auth-backend**: Service Backend for authorisation and authentification. 
6. **am-ui**: Marketplace Frontend Site. Web Site for the marketplace. Accesses the Rest Services of **data-backend-services** to fetch data and configuration for the marketplace. Accesses the **ui-auth-backend** and **am-ui-login** for login of users.
7. **am-ui-login**: Rest Service for authorisation and authentification. Stores the data in the database schema **userdb**.
8. **documents**: Temporary documents of the project.
9. **architecture**: Architecture documents of the project.
