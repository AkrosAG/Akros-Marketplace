# AKROS-Marketplace

<br />
<p align="center">
  <a href="https://github.com/AkrosAG/Akros-Marketplace">
    <img src="Architecture/images/am_logo.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">AKROS Marketplace</h3>
  <p align="center">
    <a href="https://github.com/AkrosAG/Akros-Marketplace/issues">Report Bug</a>
    ·
    <a href="https://github.com/AkrosAG/Akros-Marketplace/issues">Request Feature</a>
  </p>
</p>

AKROS Marketplace, short AMP, is an application for companies internal advertising and is used for search and advertise an appartement, a room a roommate. The application is expandable and can include additional categories e.g. to search and advertise ride- or clothes-sharing, rent a car, et cetera.

The project is hosted on Github public. It is licensed under the Apache License. Public means that the code is an AKROS business card. Quality and state of the art development is essential.

The application should serve

- to train and practice the AKROS employee for current and future development processes, technologies and "best practices",
- to assess the candidates in the hiring process.

## Running the application

The easiest way to run the application is to start the docker-compose for the entire application. This requires a docker installation.
To do so, run the command below **inside** the  `./infrastructure/start_local` folder. The frontend will be running on the following link: https://localhost:4200 and the backend on https://localhost:8443

   ```
    docker-compose --profile local up -d --build
   ```
   
For more information and for local development setup, check the `README` file in the folder `./infrastructure/start_local`.

## Folder Organisation

1. **infrastructure**: How to run this project in different container model configurations.
   - **database_only**: Initializes and starts the database locally for Rest Service Backend developers.
   - **restservices**: Initializes and starts the database locally and run the Rest Service Backend for frontend developers.
2. **marketplace-service**: Rest-Services for the frontend. Accesses the database schema **am** and saves configurationSaves
3. **admin-ui**: Administration and configuration tool for the dynamic parameters of the marketplace (Currently out of date).
4. **auth-service**: Service Backend for authorisation and authentification (Currently out of date).
5. **am-ui**: Marketplace Frontend Site. Web Site for the marketplace. Accesses the Rest Services of **data-backend-services** to fetch data and configuration for the marketplace. Accesses the **ui-auth-backend** and **am-ui-login** for login of users.
   - **build_scripts**: Build scripts to be used for npm
   - **webcomponents**: Reusable webcomponents for the UI
     - **search-webcomponent**: Search-Module implemented in Angular
     - **search-results-webcomponent**: Search-Results-Module implemented in React
     - **create-ad-webcomponent**: Module implemented in Vue for Ad-Creation
6. **architecture**: Architecture documents of the project.
7. **.github**: Workflows for Github Actions
8. **.run**: IntelliJ Run-Configs
