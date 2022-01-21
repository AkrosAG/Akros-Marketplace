## Rest-Services + Administration-Business-UI

### Three Containers are started
1. This command runs the preconfigured **PostgreSQL** database as described in the **database_only** section.
2. The **Data-Service-Backend** is started in a separate container and contains the **Rest Services**.
3. The **Administration-Business-UI** is started in a separate container to configure the marketplace.

### Rest-Service-End-Point Configuration + Swagger End Point
- **End Point** : https://localhost:8443

### Start/Stop
- **start**: docker-compose up
- **stop**: docker-compose down

### Administration-Business-UI Configuration
- **URL** : https://localhost:9443

### Reinitialize Rest-Service

If the Docker image **data-service-backend:latest** exists when a container of the image is just started.
The Rest-Service is only build when the Docker image **data-service-backend:latest** does not exists.

To force rebuild procede the following steps
- **show images**: docker images
- **remove image**: docker image rm data-service-backend:latest

