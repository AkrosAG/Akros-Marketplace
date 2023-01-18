/* istanbul ignore file */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslatePipe} from '@ngx-translate/core';
import {UserDto} from 'src/app/data/models/UserDto';
import {OAuthUserInfo} from 'src/app/shared/types/oauthuserinfo.type';
import {AuthStore} from '../../data/services/login/auth.service';
import {UserService} from './../../data/services/login/user.service';
@UntilDestroy()
@Component({
  selector: 'mp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public welcome!: String;
  public formGroup!: FormGroup;
  private userId!: string;
  public showModal = false;
  public deleteModalId = 'deleteProfileModal';

  public showAlert = false;
  public alertTextI18n: string;
  public alertCssClassesArray: string[];

  constructor(
    private auth: AuthStore,
    private translatePipe: TranslatePipe,
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.auth.user$?.pipe(untilDestroyed(this)).subscribe(user => {
      const email = user?.email;
      const name = user?.given_name;
      const lastName = user?.family_name;
      const phoneNumber = user?.phone_number;
      this.welcome = this.translatePipe.transform('profile.welcome', {
        user: `${name} ${lastName}`,
      });
      this.userId = user?.sub || '';

      this.username = user?.preferred_username || '';
      if (name && lastName && email) {
        this.formGroup = this.buildForm(name, lastName, email, phoneNumber);
      }
    });
  }

  updateUser() {
    const userDto: UserDto = {
      first_name: this.formGroup.get('firstName')?.value,
      last_name: this.formGroup.get('lastName')?.value,
      email: this.formGroup.get('email')?.value,
      phone_number: this.formGroup.get('phoneNumber')?.value,
    };

    this.userService.updateUser(this.userId, userDto).subscribe(
      data => {
        this.alertCssClassesArray = [];
        this.showAlert = true;
        this.alertTextI18n = 'profile.updateProfileSuccess';

        const updatedUser: UserDto = data;
        const updateAuthUser: OAuthUserInfo = {
          ...(this.auth.userSubject$.getValue() as OAuthUserInfo),
          email: updatedUser.email,
          given_name: updatedUser.first_name,
          family_name: updatedUser.last_name,
          phone_number: updatedUser.phone_number,
          name: `${updatedUser.first_name} ${updatedUser.last_name}`,
        };
        this.auth.updateUser(updateAuthUser);

        setTimeout(() => {
          this.showAlert = false;
        }, 2500);
      },
      err => {
        if (err) {
          this.alertCssClassesArray = ['error'];
          this.showAlert = true;
          this.alertTextI18n = 'profile.updateProfileError';

          setTimeout(() => {
            this.showAlert = false;
            this.alertCssClassesArray = [];
          }, 2500);
        }
      }
    );
  }

  onDeleteProfile() {
    this.userService.deleteUser(this.userId).subscribe(
      () => {
        this.alertCssClassesArray = [];
        this.showAlert = true;
        this.alertTextI18n = 'profile.deleteSuccess';
        this.hideDeleteProfileModal();

        setTimeout(() => {
          this.showAlert = false;
          this.auth.logout();
        }, 3000);
      },
      () => {
        this.alertCssClassesArray = ['error'];
        this.showAlert = true;
        this.alertTextI18n = 'profile.deleteError';

        this.hideDeleteProfileModal();

        setTimeout(() => {
          this.showAlert = false;
          this.alertCssClassesArray = [];
        }, 2500);
      }
    );
  }

  showDeleteProfileModal() {
    this.showModal = true;
  }

  hideDeleteProfileModal() {
    this.showModal = false;
  }

  private buildForm(
    name: string,
    lastName: string,
    email: string,
    phoneNumber?: string
  ): FormGroup {
    return this.formBuilder.group({
      firstName: new FormControl(name),
      lastName: new FormControl(lastName),
      email: new FormControl(email),
      phoneNumber: new FormControl(phoneNumber),
    });
  }
}
