import {User} from './../../models/User';
import {environment} from 'src/environments/environment';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<User[]>(`${environment.authUrl}/api/allusers`);
  }

  getById(id: number) {
    return this.http.get<User>(`${environment.authUrl}/users/${id}`);
  }
}
