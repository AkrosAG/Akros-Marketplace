import {HttpClient} from '@angular/common/http';
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class SearchResultDetailsService {

  constructor(private http: HttpClient) { }

  getById(id: number) {
    return this.http.get<any>(`/topics/${id}`);
  }
}
