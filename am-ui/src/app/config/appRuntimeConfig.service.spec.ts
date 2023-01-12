//
import {TestBed} from '@angular/core/testing';
import fetchMock from "jest-fetch-mock";

import {
  AppRuntimeConfig,
  defaultKeycloakConfigRedirectUri,
  defaultKeycloakConfigRequireHTTPs,
  defaultKeycloakConfigScope,
} from './appRuntimeConfig.service';
import {ConfigData} from './model';

const configFull: ConfigData = {
  ownUrl: 'ownUrl',
  apiUrl: 'apiUrl',
  authUrl: 'authUrl',
  usersManagementUrl: 'fakeUsersManagementUrl',
  signOn: {authority: 'authority', clientId: 'clientId'},
  keycloakConfig: {
    issuer: 'issuer',
    silentRefreshRedirectUri: 'silentRefreshRedirectUri',
    clientId: 'clientId',
    dummyClientSecret: 'dummyClientSecret',
    redirectUri: 'redirectUri',
    scope: 'scope',
    responseType: 'responseType',
    useSilentRefresh: true,
    requireHTTPs: false,
  },
};

const configPart: ConfigData = {
  ownUrl: 'ownUrl',
  apiUrl: 'apiUrl',
  authUrl: 'authUrl',
  usersManagementUrl: 'usersManagementUrl',
  signOn: {authority: 'authority', clientId: 'clientID'},
  keycloakConfig: {
    issuer: 'issuer',
    silentRefreshRedirectUri: 'silentRefreshRedirectUri',
    clientId: 'clientId',
    dummyClientSecret: 'dummyClientSecret',
  },
};

const configFullJson = `{
  "ownUrl": "ownUrl",
  "apiUrl": "apiUrl",
  "authUrl": "authUrl",
  "usersManagementUrl": "usersManagementUrl",
  "signOn": {"authority": "authority", "clientId": "clientId"},
  "keycloakConfig": {
    "issuer": "issuer",
    "silentRefreshRedirectUri": "silentRefreshRedirectUri",
    "clientId": "clientId",
    "dummyClientSecret": "dummyClientSecret",
    "redirectUri": "redirectUri",
    "scope": "scope",
    "responseType": "responseType",
    "useSilentRefresh": true,
    "requireHTTPs: false
  }
}`;

const configPartJson = `{
  "ownUrl": "ownUrl",
  "apiUrl": "apiUrl",
  "authUrl": "authUrl",
  "usersManagementUrl": "usersManagementUrl",
  "signOn": {"authority": "authority", "clientId": "clientId"},
  "keycloakConfig": {
    "issuer": "issuer",
    "silentRefreshRedirectUri": "silentRefreshRedirectUri",
    "clientId": "clientId",
    "dummyClientSecret": "dummyClientSecret"
  }
}`;

describe('ConfigReaderService With full Config', () => {
  let service: AppRuntimeConfig;

  fetchMock.enableMocks();

  beforeEach(() => {
    fetchMock.resetMocks();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRuntimeConfig);
    fetchMock.mockResponse( JSON.stringify(configFull));
    service.loadRuntimeConfig('DontCare');
    console.log(service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected ownUrl', () => {
    expect(service.ownUrl).toBe(configFull.ownUrl);
  });

  it('should return expected apiUrl', () => {
    expect(service.apiUrl).toBe(configFull.apiUrl);
  });

  it('should return expected authUrl', () => {
    expect(service.authUrl).toBe(configFull.authUrl);
  });

  it('should return expected usersManagementUrl', () => {
    expect(service.usersManagementUrl).toBe(configFull.usersManagementUrl);
  });

  it('should return expected signOnAuthority', () => {
    expect(service.signOnAuthority).toBe(configFull.signOn.authority);
  });

  it('should return expected signOnClientID', () => {
    expect(service.signOnClientID).toBe(configFull.signOn.clientId);
  });

  it('should return expected keycloakConfig clientId', () => {
    expect(service.keycloakConfig.clientId).toBe(
      configFull.keycloakConfig.clientId
    );
  });

  it('should return expected keycloakConfig redirectUri', () => {
    expect(service.keycloakConfig.redirectUri).toBe(
      configFull.keycloakConfig.redirectUri
    );
  });

  it('should return expected keycloakConfig requireHTTPs', () => {
    expect(service.keycloakConfig.requireHttps).toBe(
      configFull.keycloakConfig.requireHTTPs
    );
  });
});

describe('ConfigReaderService: Config with missing field', () => {
  let service: AppRuntimeConfig;

  beforeAll(() => {
    jest.spyOn(window, 'fetch').mockReturnValue(
      new Promise<Response>(
        () =>
          new Response(JSON.stringify(configPart), {
            status: 200,
            statusText: 'OK',
          })
      )
    );
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRuntimeConfig);
    service.loadRuntimeConfig('DontCare');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return expected ownUrl', () => {
    expect(service.ownUrl).toBe(configPart.ownUrl);
  });

  it('should return expected signOnAuthority', () => {
    expect(service.signOnAuthority).toBe(configPart.signOn.authority);
  });

  it('should return expected keycloakConfig clientId', () => {
    expect(service.keycloakConfig.clientId).toBe(
      configFull.keycloakConfig.clientId
    );
  });

  it('should return expected keycloakConfig default redirectUri', () => {
    expect(service.keycloakConfig.redirectUri).toBe(
      defaultKeycloakConfigRedirectUri
    );
  });

  it('should return expected keycloakConfig default scope', () => {
    expect(service.keycloakConfig.scope).toBe(defaultKeycloakConfigScope);
  });

  it('should return expected keycloakConfig default requireHTTPs', () => {
    expect(service.keycloakConfig.requireHttps).toBe(
      defaultKeycloakConfigRequireHTTPs
    );
  });
});
