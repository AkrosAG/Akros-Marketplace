/* istanbul ignore file */

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslatePipe} from '@ngx-translate/core';
import {AuthStore} from '../../data/services/login/auth.service';
import {
  UserDataModel,
  UserService,
} from './../../data/services/login/user.service';
@UntilDestroy()
@Component({
  selector: 'mp-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  public welcome!: String;
  public formGroup!: FormGroup;
  public saveAction = false;
  public saveError = false;
  private userId!: string;
  private username!: string;
  public showModal = false;
  public deleteModalId = 'deleteProfileModal';
  public showDeleteUserAlert = false;
  public deleteUserAlertCssClassesArray: string[] = ['error'];
  public deleteUserAlertText: string;

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

  changeUserData() {
    const newUserData: UserDataModel = {
      email: this.formGroup.get('email')?.value,
      firstName: this.formGroup.get('firstName')?.value,
      lastName: this.formGroup.get('lastName')?.value,
      attributes: {
        phoneNumber: [this.formGroup.get('phoneNumber')?.value],
      },
      username: this.username,
      enabled: true,
      emailVerified: false,
      requiredActions: [],
    };
    this.userService
      .changeUserData(this.userId, newUserData)
      .pipe(untilDestroyed(this))
      .subscribe(
        () => {
          this.saveAction = true;
          this.saveError = false;
        },
        () => {
          this.saveAction = true;
          this.saveError = true;
        }
      );
  }

  onDeleteProfile() {
    this.userService.deleteUser(this.userId).subscribe(
      () => {
        this.deleteUserAlertText = this.translatePipe.transform(
          'profile.deleteSuccess'
        );
        this.deleteUserAlertCssClassesArray = [];
        this.showDeleteUserAlert = true;
        this.hideDeleteProfileModal();

        setTimeout(() => {
          this.showDeleteUserAlert = false;
          this.auth.logout();
        }, 3000);
      },
      () => {
        this.deleteUserAlertText = this.translatePipe.transform(
          'profile.deleteError'
        );
        this.deleteUserAlertCssClassesArray.push('error');
        this.showDeleteUserAlert = true;
        this.hideDeleteProfileModal();

        setTimeout(() => {
          this.showDeleteUserAlert = false;
          this.deleteUserAlertCssClassesArray = [];
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
