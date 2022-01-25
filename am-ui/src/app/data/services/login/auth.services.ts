import {Role} from './../../models/role';
import {OAuthProviderEnum} from './OAuthProviderEnum';
import {UserLocalStorageService} from './user.localStorage.service';
import {AuthAPIService} from './auth.api.service';
import {LocalAccountType} from './LocalAccountType';
import {Injectable} from '@angular/core';
// import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from "angularx-social-login";
import {MsalService as AuthService} from '@azure/msal-angular';
// eslint-disable-next-line node/no-extraneous-import
import {AuthenticationResult} from '@azure/msal-common';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

// const AUTH_DATA = 'auth_name';
// const LOGIN_PROVIDER = 'login_provider';

@Injectable({providedIn: 'root'})
export class AuthStore {
  userSubject$: BehaviorSubject<LocalAccountType | null> =
    new BehaviorSubject<LocalAccountType | null>(null);
  user$: Observable<LocalAccountType | null> = this.userSubject$.asObservable();
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;
  loggedInUserName$: Observable<String>;

  constructor(
    // private http: HttpClient,
    // private auth: SocialAuthService,
    private authApiService: AuthAPIService,
    private userLocalStorageService: UserLocalStorageService,
    private azureADAuthService: AuthService
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

  public reconnectUser(user: any) {
    this.userSubject$.next(user);
    this.userLocalStorageService.storeData(user);
  }

  login_sso(socialProvider: OAuthProviderEnum) {
    if (socialProvider === OAuthProviderEnum.AKROSAD) {
      this.loginWithAkrosAD(socialProvider);
      return;
    }

    // let socialPlatformProvider;
    // if (socialProvider === OAuthProviderEnum.FACEBOOK) {
    //   socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    // } else if (socialProvider === OAuthProviderEnum.GOOGLE) {
    //   socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    // }

    // return this.auth.signIn(socialPlatformProvider).then(socialusers => {
    //   this.postLogin(
    //     socialProvider,
    //     socialusers.authToken,
    //     socialusers.idToken,
    //     {...socialusers, role: Role.Admin}
    //   );
    // });
  }

  private loginWithAkrosAD(socialProvider: OAuthProviderEnum): void {
    this.azureADAuthService
      .loginPopup()
      .pipe(
        tap(authenticationResult => {
          console.log(JSON.stringify(authenticationResult));
          this.postLogin(
            socialProvider,
            authenticationResult.accessToken,
            authenticationResult.idToken,
            this.buildPostUser(authenticationResult, socialProvider)
          );
        }),
        shareReplay()
      )
      .subscribe(t => {});
  }

  private postLogin(
    socialProvider: OAuthProviderEnum,
    accessToken: any,
    idToken: any,
    postUser: any
  ) {
    this.userLocalStorageService.accessToken = accessToken;
    this.userLocalStorageService.idToken = idToken;
    this.userLocalStorageService.socialProvider =
      OAuthProviderEnum[socialProvider];

    this.authApiService
      .postData(postUser, 'signup') // save user to backend service
      .then((result: any) => {
        if (result.payload) {
          this.userLocalStorageService.storeData(
            result.payload
            // socialProvider
          ); // save user to local storage
          this.userSubject$.next(postUser);
        }
      })
      .catch(err => {
        console.error(JSON.stringify(err?.error?.message));
      });
  }

  private buildPostUser(
    ssoUser: AuthenticationResult,
    socialProvider: OAuthProviderEnum
  ): any {
    const user = {
      ...ssoUser.account,
      role: Role.Admin,
      id: ssoUser.account!.homeAccountId,
      email: ssoUser.account!.username,
      socialProvider: OAuthProviderEnum[socialProvider],
    };

    return user;
  }

  logout() {
    // this.auth.authState.subscribe(user => {
    //   console.log(LOGIN_PROVIDER, user);
    // });

    // this.userSubject$.next(null);
    // this.auth
    //   .signOut()
    //   .then(data => {
    //     console.log(LOGIN_PROVIDER, data);
    //   })
    //   .catch(err => {
    //     console.log('Logged out : ' + err);
    //   });

    // this.userLocalStorageService.logOut(); // clear user from local storage
    console.log('Not yet implemented');
  }
}
