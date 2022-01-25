import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

const AUTH_DATA = 'auth_data';
const LOGIN_PROVIDER = 'login_provider';
const TOKEN = 'accesstoken';
const IDTOKEN = 'idtoken';

@Injectable({providedIn: 'root'})
export class UserLocalStorageService {
  constructor(public router: Router) {}

  async storeData(data: any) {
    localStorage.setItem(AUTH_DATA, JSON.stringify(data));
    const newData = await this.getData();
    return this.router.navigate(['home'], newData);
  }

  getData() {
    return JSON.parse(localStorage.getItem(AUTH_DATA)!);
  }

  sessionIn() {
    let A;
    if (this.getData()) {
      A = this.router.navigate(['home'], this.getData());
    }
    return A;
  }

  public set socialProvider(socialProvider) {
    localStorage.setItem(LOGIN_PROVIDER, JSON.stringify(socialProvider));
  }

  public get socialProvider(): string {
    return localStorage.getItem(LOGIN_PROVIDER)!;
  }

  public set accessToken(token) {
    localStorage.setItem(TOKEN, JSON.stringify(token));
  }

  public get accessToken(): string {
    return localStorage.getItem(TOKEN)!;
  }

  public set idToken(token) {
    localStorage.setItem(IDTOKEN, JSON.stringify(token));
  }

  public get idToken(): string {
    return localStorage.getItem(IDTOKEN)!;
  }

  sessionOut() {
    let A;
    if (!this.getData()) {
      A = this.router.navigate(['']);
    }
    return A;
  }

  logOut() {
    localStorage.removeItem(AUTH_DATA);
    localStorage.removeItem(LOGIN_PROVIDER);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(IDTOKEN);
    // return this.router.navigate(['login']);
  }
}
