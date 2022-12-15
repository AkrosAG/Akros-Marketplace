import {AuthConfig} from 'angular-oauth2-oidc';

declare var window: any;

export class DynamicEnvironment {

    public keycloakConfigRedirectUri: string;
    public keycloakConfigScope: string;
    public keycloakConfigUseSilentRefresh: boolean;
    public keycloakConfigRequireHTTPs: boolean;
    public keycloakConfigResponseType: string
  
    constructor() {
        this.keycloakConfigRedirectUri = "window.location.origin";
        this.keycloakConfigScope = "openid profile email offline_access"
        this.keycloakConfigUseSilentRefresh = true
        this.keycloakConfigRequireHTTPs = false
        this.keycloakConfigResponseType = "code"
    }
    
    public get ownUrl(): string {
        return window.config.ownUrl
    }

    public get apiUrl(): string {
        return window.config.apiUrl
    } 

    public get authUrl(): string {
        return window.config.authUrl
    } 

    public get usersManagementUrl(): string {
        return window.config.usersManagementUrl
    }

    public get signOnAuthority(): string {
        return window.config.signOn.authority
    } 

    public get signOnClientID(): string {
        return window.config.signOn.clientId
    } 

    public get keycloakConfig(): AuthConfig {
        var auth = new AuthConfig()
        auth.clientId = window.config.keycloakConfig.clientId
        auth.issuer = window.config.keycloakConfig.issuer
        auth.dummyClientSecret = window.config.keycloakConfig.dummyClientSecret
        auth.silentRefreshRedirectUri = window.config.keycloakConfig.silentRefreshRedirectUri
        auth.scope = this.keycloakConfigScope
        auth.requireHttps = this.keycloakConfigRequireHTTPs
        auth.redirectUri = this.keycloakConfigRedirectUri
        auth.responseType = this.keycloakConfigResponseType
        auth.useSilentRefresh = this.keycloakConfigUseSilentRefresh
        return auth
    }

}

//export const environment = {
//    production: true,
//    ownUrl: 'https://am-ui.azurewebsites.net',
//    apiUrl: 'https://amp-marketplace-service.azurewebsites.net',
//    authUrl: 'https://amp-auth-service.azurewebsites.net',
//    signOn: {
//      authority:
//        'https://login.microsoftonline.com/45a8141c-94c3-4fde-9cf3-0cfcc10ad529',
//      clientId: '9f9965aa-840d-4c88-8121-eac081ee2dd8',
//    },
//    keycloakConfig: {
//      issuer: 'https://am-keycloak.azurewebsites.net/realms/akros-marketplace',
//      redirectUri: window.location.origin,
//      silentRefreshRedirectUri:
//        'https://am-keycloak.azurewebsites.net/assets/silent-refresh.html',
//      useSilentRefresh: true,
//      clientId: 'marketplace',
//      scope: 'openid profile email offline_access',
//      requireHttps: false,
//      responseType: 'code',
//      dummyClientSecret: 'dIaYUsn6MrNIaHhGuciT6bgplIE2vlOi',
//    },
//  };
  