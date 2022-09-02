import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Topic} from '../../data/models/Topic';

@Injectable({providedIn: 'root'})
export class SearchResultDetailsService {
  constructor(private http: HttpClient) {}

  getById(id: number) {
    return this.http.get<Topic>(`/topics/${id}`);
  }
}
