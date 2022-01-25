import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class AuthAPIService {
  constructor(public http: HttpClient) {}

  postData(credentials: any, type: any) {
    return new Promise((resolve, reject) => {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'}), // TODO: To be written as Constant
      };

      this.http
        .post('api/auth/' + type, JSON.stringify(credentials), httpOptions)
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
