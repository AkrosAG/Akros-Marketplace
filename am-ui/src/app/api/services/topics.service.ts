/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { TopicLoadResponseDto } from '../models/topic-load-response-dto';
import { TopicSaveRequestDto } from '../models/topic-save-request-dto';
import { TopicSearchListResponseDto } from '../models/topic-search-list-response-dto';
import { TopicSearchRequestDto } from '../models/topic-search-request-dto';

@Injectable({
  providedIn: 'root',
})
export class TopicsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation topicsTopicIdGet
   */
  static readonly TopicsTopicIdGetPath = '/topics/{topicId}';

  /**
   * Load a topic.
   *
   * Load a topic
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `topicsTopicIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  topicsTopicIdGet$Response(params: {

    /**
     * Primary Key ID to Topic.
     */
    topicId: number;
  }): Observable<StrictHttpResponse<TopicLoadResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, TopicsService.TopicsTopicIdGetPath, 'get');
    if (params) {
      rb.path('topicId', params.topicId, {});
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopicLoadResponseDto>;
      })
    );
  }

  /**
   * Load a topic.
   *
   * Load a topic
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `topicsTopicIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  topicsTopicIdGet(params: {

    /**
     * Primary Key ID to Topic.
     */
    topicId: number;
  }): Observable<TopicLoadResponseDto> {

    return this.topicsTopicIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<TopicLoadResponseDto>) => r.body as TopicLoadResponseDto)
    );
  }

  /**
   * Path part for operation topicsPost
   */
  static readonly TopicsPostPath = '/topics';

  /**
   * Save a topic.
   *
   * Save a topic
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `topicsPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  topicsPost$Response(params: {

    /**
     * All values to save a topic
     */
    body: TopicSaveRequestDto
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TopicsService.TopicsPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Save a topic.
   *
   * Save a topic
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `topicsPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  topicsPost(params: {

    /**
     * All values to save a topic
     */
    body: TopicSaveRequestDto
  }): Observable<void> {

    return this.topicsPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation topicsDelete
   */
  static readonly TopicsDeletePath = '/topics';

  /**
   * Delete a topic.
   *
   * Delete a topic
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `topicsDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  topicsDelete$Response(params: {

    /**
     * Primary Key ID to Topic.
     */
    topicId: number;
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, TopicsService.TopicsDeletePath, 'delete');
    if (params) {
      rb.path('topicId', params.topicId, {});
    }

    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Delete a topic.
   *
   * Delete a topic
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `topicsDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  topicsDelete(params: {

    /**
     * Primary Key ID to Topic.
     */
    topicId: number;
  }): Observable<void> {

    return this.topicsDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation topicsSearchesPost
   */
  static readonly TopicsSearchesPostPath = '/topics/searches';

  /**
   * Search for topics.
   *
   * Search for topics
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `topicsSearchesPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  topicsSearchesPost$Response(params: {

    /**
     * All fields for search query
     */
    body: TopicSearchRequestDto
  }): Observable<StrictHttpResponse<TopicSearchListResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, TopicsService.TopicsSearchesPostPath, 'post');
    if (params) {
      rb.body(params.body, 'application/json');
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<TopicSearchListResponseDto>;
      })
    );
  }

  /**
   * Search for topics.
   *
   * Search for topics
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `topicsSearchesPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  topicsSearchesPost(params: {

    /**
     * All fields for search query
     */
    body: TopicSearchRequestDto
  }): Observable<TopicSearchListResponseDto> {

    return this.topicsSearchesPost$Response(params).pipe(
      map((r: StrictHttpResponse<TopicSearchListResponseDto>) => r.body as TopicSearchListResponseDto)
    );
  }

}
