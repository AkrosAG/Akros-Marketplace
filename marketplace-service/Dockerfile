FROM maven:3.6.3-jdk-11 AS builder
WORKDIR /usr/local/app/marketplace-service

COPY ./pom.xml /usr/local/app/
COPY ./marketplace-service/pom.xml /usr/local/app/marketplace-service
RUN mvn dependency:go-offline

COPY ./marketplace-service ./
COPY ./api.yaml /usr/local/app/

RUN mvn clean package -DskipTests -Pprod

FROM openjdk:11-jre-slim AS deploy

EXPOSE 8080 8443

COPY --from=builder /usr/local/app/marketplace-service/target/marketplace-service-1.0.0-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]