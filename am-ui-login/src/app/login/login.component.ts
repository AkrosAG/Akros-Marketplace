import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SocialAuthService, SocialUser } from 'angularx-social-login';

import {Router} from '@angular/router';
import { AuthStore } from '../_services/auth.services';
import { OAuthProviderEnum } from '../common/oAuthProviderEnum';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AuthAPIService } from '../_services/auth.api.service';
import { UserLocalStorageService } from '../_services/user.localStorage.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  socialUser: SocialUser;
  oAuthProviderEnum= OAuthProviderEnum;

  constructor(
    private fb: FormBuilder,
    private socialAuthService: SocialAuthService,
    private router: Router,
    public auth: AuthStore) {

    this.form = fb.group({
      email: ['hermann@akros.ch', [Validators.required]],
      password: ['hermann', [Validators.required]]
    });

  }

  ngOnInit() {
    this.socialAuthService.authState.subscribe((user) => {
       if(user != null)
         {
           this.router.navigateByUrl("/");
         }
       else
         this.router.navigateByUrl("/login");
     });
  }

  // login() {
  //   const val = this.form.value;
  // }

  oAuthLogin(socialProvider: OAuthProviderEnum): void {
    this.auth.login_sso(socialProvider);
   }

  signOut(): void {
    this.auth.logout();
  }

}
