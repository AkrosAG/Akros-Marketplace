## Marketplace-Service + Admin-UI

### Three Containers are started
1. This command runs the preconfigured **PostgreSQL** database as described in the **database_only** section.
2. The **Marketplace-Service** is started in a separate container and contains the **Rest Services**.
3. The **Admin-UI** is started in a separate container to configure the marketplace.

### Rest-Service-End-Point Configuration + Swagger End Point
- **End Point** : https://localhost:8443

### Start/Stop
- **start**: docker-compose up
- **stop**: docker-compose down

### Admin-UI Configuration
- **URL** : http://localhost:8080

### Reinitialize Rest-Service

If the Docker image **marketplace-service:latest** exists when a container of the image is just started.
The Rest-Service is only build when the Docker image **marketplace-service:latest** does not exists.

To force rebuild procede the following steps
- **show images**: docker images
- **remove image**: docker image rm marketplace-service:latest

### Script to Refresh and Restart all Containers
- **clean_startup.sh**: Removes old Postgres data files. Removes docker images. Rebuild new containers.
