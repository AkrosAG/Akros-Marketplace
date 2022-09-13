import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {TopicSearchListResponseDto} from "./api/models/topic-search-list-response-dto";

@Injectable({providedIn: 'root'})
export class MpSearchService {
  constructor(private http: HttpClient) {}

  getAllTopics() {
    return this.http.get<TopicSearchListResponseDto>(`/topics/searches`);
  }
}
