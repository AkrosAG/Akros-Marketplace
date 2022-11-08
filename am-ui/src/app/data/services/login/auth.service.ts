/* eslint-disable prettier/prettier */
/* istanbul ignore file */
import {UserLocalStorageService} from './user.localStorage.service';
import {AuthAPIService} from './auth.api.service';
import {LocalAccountType} from './LocalAccountType';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {OAuthUser} from '../../../shared/types/oauthuser.type';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {OAuthUserInfo} from '../../../shared/types/oauthuserinfo.type';
import {environment} from '../../../../environments/environment';

@Injectable({providedIn: 'root'})
export class AuthStore {
  userSubject$: BehaviorSubject<LocalAccountType | null> =
    new BehaviorSubject<LocalAccountType | null>(null);
  user$: Observable<LocalAccountType | null> = this.userSubject$.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  loggedInUserName$: Observable<String>;
  private keycloakConfig: AuthConfig = environment.keycloakConfig;

  constructor(
    private authApiService: AuthAPIService,
    private userLocalStorageService: UserLocalStorageService,
    private router: Router,
    private oAuthService: OAuthService
  ) {
    this.isLoggedIn$ = this.user$.pipe(map(user => !!user));

    this.isLoggedOut$ = this.isLoggedIn$.pipe(map(loggedIn => !loggedIn));

    this.loggedInUserName$ = this.user$.pipe(
      map(user => user?.name || (user as any)?.displayName)
    );

    const user = this.userLocalStorageService.getData();
    if (user) {
      this.userSubject$.next(user);
    }

    this.oAuthService.configure(this.keycloakConfig);
    setTimeout(() => this.initOAuth(), 0);
  }

  public get userValue(): LocalAccountType {
    return this.userSubject$.value!;
  }

  public get accessToken(): string {
    return this.userLocalStorageService.accessToken;
  }

  public get idToken(): string {
    return this.userLocalStorageService.idToken;
  }

  private initOAuth() {
    this.userLocalStorageService.logOut();
    this.userSubject$.next(null);

    this.oAuthService.loadDiscoveryDocument().then(() => {
      this.oAuthService.tryLoginCodeFlow().then(() => {
        if (!this.oAuthService.hasValidIdToken()) {
          this.router.navigate(['']);
        } else {
          this.oAuthService.refreshToken().then(() =>
            this.oAuthService.loadUserProfile().then(userProfile => {
              const user = this.buildPostUserFromOauth(
                (userProfile as OAuthUser).info
              );
              this.postLogin(
                this.oAuthService.getAccessToken(),
                this.oAuthService.getIdToken(),
                user
              );
              this.oAuthService.setupAutomaticSilentRefresh();
            })
          );
        }
      });
    });
  }

  public reconnectUser(user: any) {
    this.userSubject$.next(user);
    this.userLocalStorageService.storeData(user);
  }

  login_sso() {
    this.oAuthService.initCodeFlow();
  }

  private postLogin(accessToken: any, idToken: any, postUser: any) {
    this.userLocalStorageService.accessToken = accessToken;
    this.userLocalStorageService.idToken = idToken;
    this.userSubject$.next(postUser);
  }

  private buildPostUserFromOauth(oauthUser: OAuthUserInfo): any {
    return {
      id: oauthUser.sub,
      email: oauthUser.email,
      name: oauthUser.name,
    };
  }

  logout() {
    this.oAuthService.logOut();

    this.userLocalStorageService.logOut();
    this.userSubject$.next(null);
    this.router.navigate(['']);
  }
}
