export interface SignOnData {
  authority: string;
  clientId: string;
}

export interface KeycloakData {
  issuer: string;
  silentRefreshRedirectUri: string;
  clientId: string;
  dummyClientSecret: string;
  redirectUri?: string;
  scope?: string;
  responseType?: string;
  useSilentRefresh?: boolean;
  requireHTTPs?: boolean;
}

export interface ConfigData {
  ownUrl: string;
  apiUrl: string;
  authUrl: string;
  usersManagementUrl: string;
  signOn: SignOnData;
  keycloakConfig: KeycloakData;
}

export class RuntimeConfig {
  config: ConfigData;
}
