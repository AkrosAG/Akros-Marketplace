/* eslint-disable prettier/prettier */
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthStore} from '../../data/services/login/auth.service';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'mp-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  public appLanguage: String;
  public subscription: Subscription;

  /**
   * @description Component which hosts the webcomponent for ads creation
   * @constructor
   * @param {TranslateService} translate - use of translate service to detect language change
   * @param {AuthStore} auth - used to retrieve stored auth token
   * @param {OAuthService} oAuthService - oAuth service instance for retrieving the access token
   */
  constructor(
    private translate: TranslateService,
    private auth: AuthStore,
    private oAuthService: OAuthService
  ) {}

  ngOnInit(): void {
    this.appLanguage = history.state.appLanguage;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });

    // refresh token on start of edit, so page is not refreshed
    // during the automatic token refresh(triggered at 75% of token life passing)
    this.oAuthService.refreshToken();
  }

  getOauthToken(): string | null {
    const user = this.auth.userValue;
    const isLoggedIn = !!user && this.oAuthService.getRefreshToken();

    if (isLoggedIn) {
      return this.oAuthService.getAccessToken().replace(/"/g, '');
    }

    return null;
  }

  getUserId(): string | null {
    const user = this.auth.userValue.id;
    if (user) {
      return user;
    }
    return null;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
