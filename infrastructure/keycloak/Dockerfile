FROM quay.io/keycloak/keycloak:18.0.0 as builder

ENV KC_DB=postgres
ENV KC_FEATURES=authorization,account2,account-api,admin-fine-grained-authz,admin2,docker,impersonation,scripts,token-exchange,web-authn,client-policies,ciba,par,declarative-user-profile,recovery-codes,preview

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:18.0.0 AS deploy
COPY --from=builder /opt/keycloak/ /opt/keycloak/

WORKDIR /opt/keycloak

ENV KC_DB=postgres

EXPOSE 8080

ENTRYPOINT ["./bin/kc.sh", "start"]