/* istanbul ignore file */

import {
  UserService,
  UserDataModel,
} from './../../data/services/login/user.service';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {AuthStore} from '../../data/services/login/auth.service';
import {Component, OnInit} from '@angular/core';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {TranslatePipe} from '@ngx-translate/core';
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
      console.log('userId', this.userId);

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

  showDeleteProfileModal() {
    this.showModal = true;
  }

  onDeleteProfile() {
    console.log('delete');
  }

  onModalClose() {
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
