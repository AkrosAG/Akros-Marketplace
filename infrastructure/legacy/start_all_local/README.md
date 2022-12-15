## Marketplace-Service + Admin-UI

### Three Containers are started
1. This command runs the preconfigured **PostgreSQL** databases as described in the **postgres_user_db** and **postgres_am_db** section.
2. The **marketplace-service** is started in a separate container and contains the marketplace Rest Services.
2. The **auth-service** is started in a separate container and contains the authentification Rest Services.
3. The **admin-ui** is started in a separate container to configure the marketplace.

### Marketplace Services
- **End Point** : https://localhost:8443


### Auth Services
- **End Point** : https://localhost:18080

### Admin-UI Configuration
- **URL** : http://localhost:8080

### Start/Stop
- **start**: docker-compose up
- **stop**: docker-compose down

### Script to Refresh and Restart all Containers
- **clean_startup.sh**: Removes old Postgres data files. Removes docker images. Rebuild new containers.


