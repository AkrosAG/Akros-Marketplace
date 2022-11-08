/* eslint-disable prettier/prettier */
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Topic} from '../../data/models/Topic';

@Injectable({providedIn: 'root'})
export class AdsService {
    constructor(private http : HttpClient) { }

    getAdsByUserId(userId: string) {
        return this.http.get<Topic[]>(`/topics/user/${userId}`);
    }
}
