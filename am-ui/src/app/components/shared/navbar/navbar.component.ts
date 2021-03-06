import {appConfig} from './../../../../config';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Component, HostListener} from '@angular/core';
import {AuthStore} from './../../../data/services/login/auth.service';

import * as storeActions from './../../../data/store/marketplace.actions';

@Component({
  selector: 'mp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  public currentLng: String;
  public lngMenuShown = false;
  public optionsMenuShown = false;
  private menuEvent = false;

  constructor(
    public auth: AuthStore,
    private translate: TranslateService,
    private router: Router
  ) {
    this.currentLng = appConfig.appLanguage;
  }

  public navigate(route: string): void {
    this.router.navigate([route]);
  }

  /* istanbul ignore next */
  public showModal(type: string) {
    console.log('Modal type: ' + type);
  }

  /* istanbul ignore next */
  public login(): void {
    this.auth.login_sso();
  }

  /* istanbul ignore next */
  public logout(): void {
    this.auth.logout();
  }

  /* istanbul ignore next */
  public changeLanguage(lng: string) {
    storeActions.setCurrentLanguage({currentLanguage: lng});
    this.currentLng = lng;
    this.translate.use(lng);
  }

  /**
   * @description Method with logic to show and hide language/userOptions selector
   */
  public showMenu(tag: string) {
    let element;
    switch (tag) {
      case 'lng':
        if (this.optionsMenuShown) {
          this.optionsMenuShown = false;
          document.getElementById('user-menu')?.classList.toggle('active');
        }
        element = document.getElementById('lang-menu');
        this.lngMenuShown = true;
        break;
      default:
        if (this.lngMenuShown) {
          this.lngMenuShown = false;
          document.getElementById('lang-menu')?.classList.toggle('active');
        }
        element = document.getElementById('user-menu');
        this.optionsMenuShown = true;
        break;
    }
    this.menuEvent = true;
    element?.classList.toggle('active');
  }

  /**
   * @description Click envent listener to complement logic to show and hide language/userOptions selector
   */
  @HostListener('document:click')
  clickout() {
    if (this.menuEvent) {
      this.menuEvent = false;
    } else {
      if (this.lngMenuShown) {
        document.getElementById('lang-menu')?.classList.toggle('active');
        this.lngMenuShown = false;
      } else if (this.optionsMenuShown) {
        document.getElementById('user-menu')?.classList.toggle('active');
        this.optionsMenuShown = false;
      }
    }
  }
}
