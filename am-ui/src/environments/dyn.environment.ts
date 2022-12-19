import {AuthConfig} from 'angular-oauth2-oidc';

declare let window: any;
export class DynamicEnvironment {
  public keycloakConfigRedirectUri: string;
  public keycloakConfigScope: string;
  public keycloakConfigUseSilentRefresh: boolean;
  public keycloakConfigRequireHTTPs: boolean;
  public keycloakConfigResponseType: string;

  constructor() {
    this.keycloakConfigRedirectUri = 'window.location.origin';
    this.keycloakConfigScope = 'openid profile email offline_access';
    this.keycloakConfigUseSilentRefresh = true;
    this.keycloakConfigRequireHTTPs = false;
    this.keycloakConfigResponseType = 'code';
  }

  public get ownUrl(): string {
    return window.config.ownUrl;
  }

  public get apiUrl(): string {
    return window.config.apiUrl;
  }

  public get authUrl(): string {
    return window.config.authUrl;
  }

  public get usersManagementUrl(): string {
    return window.config.usersManagementUrl;
  }

  public get signOnAuthority(): string {
    return window.config.signOn.authority;
  }

  public get signOnClientID(): string {
    return window.config.signOn.clientId;
  }

  public get keycloakConfig(): AuthConfig {
    const auth = new AuthConfig();
    auth.clientId = window.config.keycloakConfig.clientId;
    auth.issuer = window.config.keycloakConfig.issuer;
    auth.dummyClientSecret = window.config.keycloakConfig.dummyClientSecret;
    auth.silentRefreshRedirectUri =
      window.config.keycloakConfig.silentRefreshRedirectUri;
    auth.scope = this.keycloakConfigScope;
    auth.requireHttps = this.keycloakConfigRequireHTTPs;
    auth.redirectUri = this.keycloakConfigRedirectUri;
    auth.responseType = this.keycloakConfigResponseType;
    auth.useSilentRefresh = this.keycloakConfigUseSilentRefresh;
    return auth;
  }
}
