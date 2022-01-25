import {OAuthProviderEnum} from './../../../data/services/login/OAuthProviderEnum';
import {Component} from '@angular/core';
import {AuthStore} from 'src/app/data/services/login/auth.services';
import {Router} from '@angular/router';

@Component({
  selector: 'mp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    // private fb: FormBuilder,
    // private router: Router,
    public auth: AuthStore
  ) {}

  public navigateHome(): void {
    console.log('GO HOME');
  }

  public userMenu(): void {
    console.log('SHOW USER MENU - Currently just do Login');
    this.login(OAuthProviderEnum.AKROSAD);
  }

  public login(socialProvider: OAuthProviderEnum): void {
    this.auth.login_sso(socialProvider);
  }

  public logout(): void {
    this.auth.logout();
  }
}
