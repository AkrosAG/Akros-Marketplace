# AKROS-Marketplace

<br />
<p align="center">
  <a href="https://github.com/AkrosAG/Akros-Marketplace">
    <img src="Architecture/images/am_logo.svg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">AKROS Marketplace</h3>
  <p align="center">
    <a href="https://github.com/AkrosAG/Akros-Marketplace/issues">Report Bug or Request Feature</a>
  </p>
</p>

## Description

AKROS Marketplace, short AM, is an application for companies' internal advertising. It can be used for advertising and seraching of appartements, rooms or roommates. The application is extendable and may include additional categories eg. to search and advertise ride- or clothes-sharing, renting cars, et cetera. The project is licensed under the Apache License.

## Goal

The application serves:

- to train and practice the AKROS employees for current and future development processes, technologies and best practices
- to assess the candidates in the hiring process

## Running the application

### Docker-Compose

The easiest way to just run the application is to start the docker-compose for the entire application. This requires a docker-installation. To do so, run the docker-compose file in `./infrastructure/start_all_local` or run the `clean_startup.sh`-script in the same folder.

### Without Docker

Alternatively you can run both the `am-ui` and `marketplace-service` without the docker-compose. This is probably preferred for development.

- You can run the backend in IntelliJ with the provided `Backend`-run-config in the `./.run` directory.
- Run `npm run start_ssl` in `./am-ui` to start the frontend, including all the webcomponents

### Issues that could occur

If some containers do not startup successfully, it might be that you need to make sure that the "end of line sequence" are correct.
**For Windows users**: Run `git config --global core.autocrlf true` in the root directory of the project.

## Accessing the application

Afterwards, you can access the application at `https://localhost:4200`.

You can use two roles for development:

- user with USER role: `test1@test.com` with password `123456`
- user with ADMIN and USER role: `admin@test.com` with password `123456`

## Folder Organisation

1. **admin-ui**: Administration and configuration tool for the dynamic parameters of the marketplace (currently not in use).
2. **am-ui**: Marketplace Frontend Site. Web Site for the marketplace. Accesses the Rest Services of **data-backend-services** to fetch data and configuration for the marketplace. Accesses the **ui-auth-backend** and **am-ui-login** for login of users.
    - **build_scripts**: Build scripts to be used for npm
    - **webcomponents**: Reusable webcomponents for the UI
      - **create-ad-webcomponent**: Module implemented in Vue for Ad-Creation
      - **search-results-webcomponent**: Search-Results-Module implemented in React
      - **search-webcomponent**: Search-Module implemented in Angular
3. **architecture**: Architecture documents of the project.
4. **auth-service**: Service Backend for authorisation and authentification (currently not in use).
5. **infrastructure**: How to run this project in different container model configurations.
   - **database_only**: Initializes and starts the database locally for Rest Service Backend developers.
   - **restservices**: Initializes and starts the database locally and run the Rest Service Backend for frontend developers.
6. **marketplace-service**: Rest-Services for the frontend. Accesses the database schema **am** and saves configurationSaves
7. **.github**: Workflows for Github Actions
8. **.run**: IntelliJ Run-Configs
