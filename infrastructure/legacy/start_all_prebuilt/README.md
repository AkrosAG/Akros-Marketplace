## Marketplace-Service + Admin-UI

### Three Containers are started
1. This command runs the preconfigured **PostgreSQL** databases as described in the **postgres_user_db** and **postgres_am_db** section.
2. Images for marketplace-service, auth-service, admin-ui and am-ui mus be pre-created
3. The **marketplace-service** is started in a separate container and contains the marketplace Rest Services.
4. The **auth-service** is started in a separate container and contains the authentication Rest Services.
5. The **admin-ui** is started in a separate container to configure the marketplace.

### Marketplace Services
- **End Point** : https://localhost:8443

### Auth Services
- **End Point** : https://localhost:9090

### Admin-UI Configuration
- **URL** : http://localhost:8080

### Start/Stop
- **start**: docker-compose up
- **stop**: docker-compose down


