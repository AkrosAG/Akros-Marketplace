/* istanbul ignore file */
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AppRuntimeConfig} from '../../../config/appRuntimeConfig.service';

const authPath = '/api/auth/';

@Injectable({providedIn: 'root'})
export class AuthAPIService {
  constructor(private http: HttpClient, private config: AppRuntimeConfig) {}

  postData(credentials: unknown, type: unknown) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}),
      };

      this.http
        .post(
          this.config.authUrl + authPath + type,
          JSON.stringify(credentials),
          httpOptions
        )
        .subscribe(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          }
        );
    });
  }
}
