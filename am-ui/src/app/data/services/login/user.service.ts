/* istanbul ignore file */

import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserDto} from '../../models/UserDto';
import {AuthStore} from './../login/auth.service';

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
  constructor(private http: HttpClient, private auth: AuthStore) {}

  updateUser(userId: string, userDto: UserDto) {
    const token = this.auth.accessToken.replace(/"/g, '');

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    };

    return this.http.put<UserDto>(`/users/${userId}`, userDto, httpOptions);
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
