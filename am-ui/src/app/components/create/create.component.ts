import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthStore} from '../../data/services/login/auth.service';

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
   */
  constructor(private translate: TranslateService, private auth: AuthStore) {}

  ngOnInit(): void {
    this.appLanguage = history.state.appLanguage;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });
  }

  getOauthToken(): string | null {
    const user = this.auth.userValue;
    const isLoggedIn = !!user && this.auth.accessToken;

    if (isLoggedIn) {
      return this.auth.accessToken.replace(/"/g, '');
    }

    return null;
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
