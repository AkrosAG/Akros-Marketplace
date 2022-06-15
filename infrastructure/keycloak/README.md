## Keycloak for local development

### What is keycloak?
Keycloak provides user federation, strong authentication, user management, fine-grained authorization, and more.
We will use it for authentication and authorization of users for marketplace.
Keycloak provides a full solution for user management as well as integrations with authentication providers like Google, Facebook, Twitter.

### Local deployment
For local use all the communications between UI, Keycloak and marketplace service will be done through http.
A Postgres instance where the information is stored is also launched and import of configuration is done.

- the configuration import will be done only once and if in the database there are master and marketplace realms - import will be skipped;
- to force the import each time the container is started - change the `--override` parameter in `startup.sh` to `true`

### Links and users
 - Address for accessing admin console - http://127.0.0.1:9090
 - Administrator login/password - admin/admin
 - User with user role - test1/123456
 - Admin with user role - admin1/123456

### Exporting configuration
The easiest way to do this is the following:
- modify the Dockerfile to make a directory in `/opt/keycloak`: `RUN mkdir -p /opt/keycloak/out`
- modify the Dockerfile for local development to use as entrypoint: `ENTRYPOINT ["tail", "-f", "/dev/null"]`
- modify the docker-compose.yml to mount the created directory to a local one:
```    
volumes:
  - "../keycloakconfig:/opt/keycloak/out"
```
- open a console into the container
- change the directory to `/opt/keycloak/bin`
- execute the following: `./kc.sh export --users same_file --file /opt/keycloak/out/realms.json`
- now there should be a `realms.json` file with the configuration

### Azure configuration
Because we are letting azure securing the connection - the following(after a lot of trial and errors) env variables were set:
- `KC_DB_PASSWORD` - database password;
- `KC_DB_URL` - database url;
- `KC_DB_USERNAME` - database username;
- `KC_HOSTNAME` - hostname which will be used in the discovery document. Must be the URL of the container;
- `KC_HTTP_PORT` - http port value - using default of 8080;
- `KC_PROXY` - set to `edge` - this allows address forwarding and enables http. Basically will let Azure handle https and/or load balancing;
- `KEYCLOAK_ADMIN` - the username for the admin console which will be created on the first connection to the database;
- `KEYCLOAK_ADMIN_PASSWORD` - the password for the admin console which will be created on the first connection to the database;