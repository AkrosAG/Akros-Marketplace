import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthStore} from '../../data/services/login/auth.service';
import {OAuthService} from 'angular-oauth2-oidc';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'mp-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  public appLanguage: String;
  public subscription: Subscription;
  public topicId: Number;

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
    private oAuthService: OAuthService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.appLanguage = history.state.appLanguage;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });

   this.route.params.subscribe(
     (params: Params) => {
         this.topicId = +params['topicId'];
     }
   );

    // refresh token on start of edit, so page is not refreshed
    // during the automatic token refresh(triggered at 75% of token life passing)
    this.oAuthService.refreshToken();
  }

  getTopicId(): Number {
    return this.topicId;
  }

  getOauthToken(): string | null {
    const user = this.auth.userValue;
    const isLoggedIn = !!user && this.oAuthService.getRefreshToken();

    if (isLoggedIn) {
      return this.oAuthService.getAccessToken().replace(/"/g, '');
    }

    return null;
  }

  getUserId(): string | undefined {
    try {
      return this.auth.userValue.sub;
    } catch (e) {
      console.log(e);
      throw new Error();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
