FROM maven:3.6.3-jdk-11 AS builder
WORKDIR /usr/local/app/auth-service

COPY ./pom.xml /usr/local/app
COPY ./auth-service/pom.xml ./
RUN mvn dependency:go-offline

COPY ./auth-service ./
RUN mvn clean package -DskipTests

FROM openjdk:11-jre-slim

EXPOSE 8080 8443 9443

COPY --from=builder /usr/local/app/auth-service/target/auth-service-0.0.1-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]