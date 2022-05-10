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

### Docker-Compose

The easiest way to just run the application is to start the docker-compose for the entire application. This requires a docker-installation.
To do so, run the docker-compose file in `./infrastructure/start_all_local` or run the `clean_startup.sh`-script in the same folder.

### Without Docker

Alternatively you can run both the `am-ui` and `marketplace-service` without the docker-compose. This is probably preferred for development.

- You can run the backend in IntelliJ with the provided `Backend`-run-config in the `./.run` directory.
- Run `npm run start_ssl` in `./am-ui` to start the frontend, including all the webcomponents

## Folder Organisation

1. **datamodel**: Description of the data model for the market place of the database **postgres_am_db**.
2. **infrastructure**: How to run this project in different container model configurations.
   - **database_only**: Initializes and starts the database locally for Rest Service Backend developers.
   - **restservices**: Initializes and starts the database locally and run the Rest Service Backend for frontend developers.
3. **data-backend-service**: Rest-Services for the frontend. Accesses the database schema **am** and saves configurationSaves
4. **admin-ui**: Administration and configuration tool for the dynamic parameters of the marketplace.
5. **am-auth-backend**: Service Backend for authorisation and authentification.
6. **am-ui**: Marketplace Frontend Site. Web Site for the marketplace. Accesses the Rest Services of **data-backend-services** to fetch data and configuration for the marketplace. Accesses the **ui-auth-backend** and **am-ui-login** for login of users.
   - **build_scripts**: Build scripts to be used for npm
   - **webcomponents**: Reusable webcomponents for the UI
     - **search-webcomponent**: Search-Module implemented in Angular
     - **search-results-webcomponent**: Search-Results-Module implemented in React
7. **documents**: Temporary documents of the project.
8. **architecture**: Architecture documents of the project.
9. **.github**: Workflows for Github Actions
10. **organize project work**: Documentation on methodic workflow
11. **.run**: IntelliJ Run-Configs
12. **documents**: Various documentation about the application itself
