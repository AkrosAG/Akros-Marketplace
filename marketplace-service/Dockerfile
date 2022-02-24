FROM maven:3.6.3-jdk-11 AS builder
WORKDIR /usr/local/app

COPY ./ /usr/local/app/
RUN mvn clean package -DskipTests

FROM openjdk:11-jre-slim

EXPOSE 8080 8443

COPY --from=builder /usr/local/app/target/marketplace-service-1.0.0-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]