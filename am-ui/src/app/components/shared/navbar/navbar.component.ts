import {TranslateService} from '@ngx-translate/core';
import {OAuthProviderEnum} from './../../../data/services/login/OAuthProviderEnum';
import {Component} from '@angular/core';
import {AuthStore} from './../../../data/services/login/auth.service';

@Component({
  selector: 'mp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(public auth: AuthStore, private translate: TranslateService) {}

  public navigateHome(): void {
    console.log('GO HOME');
  }

  /* istanbul ignore next */
  public userMenu(): void {
    console.log('SHOW USER MENU - Currently just do Login');
    this.login(OAuthProviderEnum.AKROSAD);
  }

  /* istanbul ignore next */
  public login(socialProvider: OAuthProviderEnum): void {
    this.auth.login_sso(socialProvider);
  }

  /* istanbul ignore next */
  public logout(): void {
    this.auth.logout();
  }

  /* istanbul ignore next */
  public changeLanguage(lng: string) {
    this.translate.use(lng);
  }
}
