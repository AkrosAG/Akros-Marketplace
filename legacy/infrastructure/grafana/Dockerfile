FROM grafana/grafana:7.1.5-ubuntu as deploy

# Disable Login form or not
ENV GF_AUTH_DISABLE_LOGIN_FORM "true"
# Allow anonymous authentication or not
ENV GF_AUTH_ANONYMOUS_ENABLED "true"
# Role of anonymous user
ENV GF_AUTH_ANONYMOUS_ORG_ROLE "Admin"
ENV GF_PATHS_PROVISIONING "/var/lib/grafana/provisioning/"