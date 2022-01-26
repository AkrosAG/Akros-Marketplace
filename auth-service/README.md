# Auth-Service-Backend

This module serves the authentication of the users.

## Implemented Technologies
- Spring-Boot 2.6.2
- Maven (build on 3.8.3)
- JUnit 5


## Requirements


### Run-Only

- This module requires a running Postgres database for JUnit tests and normal operation. Look at infrastructure how to start the preconfigured database.


### Development

- Java 11 or higher
- Maven 3.3 or higher
- Docker (required to run preconfigured database)


## Build and Test

- **build-only**: mvn clean package
- **run**: mvn


## Rest Services

| Rest Service End Point       | Rest Service Controller                     | Description                               |
|------------------------------|---------------------------------------------|-------------------------------------------|
| Authentication               | AuthController                              | Accountmanagement: Register a social User |
| User                         | UserController                              | Usermanagement: Get List of All users     |


