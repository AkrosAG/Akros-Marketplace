/* istanbul ignore file */

import {AuthStore} from './../login/auth.service';
import {User} from './../../models/User';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppRuntimeConfig} from '../../../config/appRuntimeConfig.service';

export interface UserDataModel {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  enabled: boolean;
  requiredActions: [];
  attributes?: {
    phoneNumber: [string];
  };
}

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(
    private http: HttpClient,
    private auth: AuthStore,
    private runtimeConfig: AppRuntimeConfig
  ) {}

  changeUserData(id: string, userData: UserDataModel) {
    const token = 'Bearer ' + this.auth.accessToken.replace(/"/g, '');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    };
    return this.http.put<User>(
      `${this.runtimeConfig.usersManagementUrl}/admin/realms/akros-marketplace/users/${id}`,
      userData,
      httpOptions
    );
  }
}
