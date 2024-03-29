FROM maven:3.6.3-jdk-11 AS builder
RUN apt-get update && apt-get install -y
WORKDIR /workdir/server

COPY ./admin-ui/pom.xml ./
RUN mvn dependency:go-offline
RUN mvn vaadin:prepare-frontend

COPY ./admin-ui/src ./src/
COPY ./admin-ui/frontend ./frontend/
RUN mvn install -DskipTests -Pproduction
RUN mkdir  -p target/dependency

WORKDIR /workdir/server/target/dependency
RUN jar -xf ../*.jar

FROM openjdk:11-jre-slim

EXPOSE 9090

VOLUME /tmp
ARG DEPENDENCY=/workdir/server/target/dependency
COPY --from=builder ${DEPENDENCY}/BOOT-INF/lib /app/lib
COPY --from=builder ${DEPENDENCY}/META-INF /app/META-INF
COPY --from=builder ${DEPENDENCY}/BOOT-INF/classes /app
ENTRYPOINT ["java","-cp","app:app/lib/*","ch.akros.marketplace.administration.AdminUIApplication"]