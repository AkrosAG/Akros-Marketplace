export const environment = {
  production: true,
  ownUrl: 'https://am-ui.azurewebsites.net',
  apiUrl: 'https://amp-marketplace-service.azurewebsites.net',
  authUrl: 'https://amp-auth-service.azurewebsites.net',
  signOn: {
    authority:
      'https://login.microsoftonline.com/45a8141c-94c3-4fde-9cf3-0cfcc10ad529',
    clientId: '9f9965aa-840d-4c88-8121-eac081ee2dd8',
  },
  keycloakConfig: {
    issuer: 'https://am-keycloak.azurewebsites.net/realms/akros-marketplace',
    redirectUri: window.location.origin,
    strictDiscoveryDocumentValidation: false,
    clientId: 'marketplace',
    scope: 'openid profile email',
    sessionChecksEnabled: true,
    clearHashAfterLogin: false,
    requireHttps: false,
  },
};
