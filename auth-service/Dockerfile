FROM maven:3.6.3-jdk-11 AS builder
COPY ./ ./
RUN mvn clean package -DskipTests

FROM openjdk:11-jre-slim

EXPOSE 8080 8443

COPY --from=builder /auth-service/target/auth-service-0.0.1-SNAPSHOT.jar /app.jar
ENTRYPOINT ["java","-jar","/app.jar"]