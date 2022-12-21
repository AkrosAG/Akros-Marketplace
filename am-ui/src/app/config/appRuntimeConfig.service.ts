import {Injectable, InjectionToken} from '@angular/core';
import {ConfigData, RuntimeConfig} from './model';
import {AuthConfig} from 'angular-oauth2-oidc';

const defaultKeycloakConfigRedirectUri = 'window.location.origin';
const defaultKeycloakConfigScope = 'openid profile email offline_access';
const defaultKeycloakConfigResponseType = 'code';
const defaultKeycloakConfigUseSilentRefresh = true;
const defaultKeycloakConfigRequireHTTPs = false;

@Injectable({
  providedIn: 'root',
})
export class AppRuntimeConfig {
  private runtimeConfig: RuntimeConfig;

  constructor() {
    this.runtimeConfig = new RuntimeConfig();
  }

  public setConfig(config: ConfigData) {
    this.runtimeConfig.config = config;
  }

  public get ownUrl(): string {
    return this.runtimeConfig.config.ownUrl;
  }

  public get apiUrl(): string {
    return this.runtimeConfig.config.apiUrl;
  }

  public get authUrl(): string {
    return this.runtimeConfig.config.authUrl;
  }

  public get usersManagementUrl(): string {
    return this.runtimeConfig.config.usersManagementUrl;
  }

  public get signOnAuthority(): string {
    return this.runtimeConfig.config.signOn.authority;
  }

  public get signOnClientID(): string {
    return this.runtimeConfig.config.signOn.clientId;
  }

  public get keycloakConfig(): AuthConfig {
    const auth = new AuthConfig();
    auth.clientId = this.runtimeConfig.config.keycloakConfig.clientId;
    auth.issuer = this.runtimeConfig.config.keycloakConfig.issuer;
    auth.dummyClientSecret =
      this.runtimeConfig.config.keycloakConfig.dummyClientSecret;
    auth.silentRefreshRedirectUri =
      this.runtimeConfig.config.keycloakConfig.silentRefreshRedirectUri;

    auth.scope =
      this.runtimeConfig.config.keycloakConfig.scope ||
      defaultKeycloakConfigScope;

    auth.requireHttps =
      this.runtimeConfig.config.keycloakConfig.requireHTTPs ||
      defaultKeycloakConfigRequireHTTPs;

    auth.redirectUri =
      this.runtimeConfig.config.keycloakConfig.redirectUri ||
      defaultKeycloakConfigRedirectUri;

    auth.responseType =
      this.runtimeConfig.config.keycloakConfig.responseType ||
      defaultKeycloakConfigResponseType;

    auth.useSilentRefresh =
      this.runtimeConfig.config.keycloakConfig.useSilentRefresh ||
      defaultKeycloakConfigUseSilentRefresh;

    return auth;
  }
}

export const APP_RUNTIME_CONFIG = new InjectionToken<AppRuntimeConfig>(
  'APP_RUNTIME_CONFIG'
);
