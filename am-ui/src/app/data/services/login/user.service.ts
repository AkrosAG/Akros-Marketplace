/* istanbul ignore file */

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {User} from './../../models/User';
import {AuthStore} from './../login/auth.service';
import {AppRuntimeConfig} from '../../../configs/app-runtime-configuration.service';

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

  deleteUser(userId: string) {
    const token = this.auth.accessToken.replace(/"/g, '');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.delete<void>(`/users/${userId}`, httpOptions);
  }
}
