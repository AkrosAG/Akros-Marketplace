import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const apiUrl = `${environment.apiUrl}/api/auth/`;

@Injectable({providedIn: 'root'})
export class AuthAPIService {

    constructor(public http: HttpClient) {
        console.log('Hello AuthService Provider');
    }

   postData(credentials, type) {
        return new Promise((resolve, reject) => {
            const httpOptions = {
                headers: new HttpHeaders({ 'Content-Type': 'application/json' }) // TODO: To be written as Constant
              };   

            this.http.post(apiUrl + type, JSON.stringify(credentials), httpOptions)
            .subscribe(res => {
                resolve(res);
                }, (err) => {
                    //  alert("err = "+ JSON.stringify(err))
                reject(err);
            });

        });

    }
}