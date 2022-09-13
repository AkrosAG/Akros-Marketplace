import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class MpSearchService {
  constructor(private http: HttpClient) {}

  getAllTopics() {
    return this.http.get<any>(`/topics/searches`);
  }
}
