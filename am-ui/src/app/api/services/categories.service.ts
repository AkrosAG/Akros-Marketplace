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

import { CategoryResponseDto } from '../models/category-response-dto';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation categoriesGet
   */
  static readonly CategoriesGetPath = '/categories';

  /**
   * List categories.
   *
   * used for primary search page
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `categoriesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  categoriesGet$Response(params?: {
  }): Observable<StrictHttpResponse<CategoryResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, CategoriesService.CategoriesGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CategoryResponseDto>;
      })
    );
  }

  /**
   * List categories.
   *
   * used for primary search page
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `categoriesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  categoriesGet(params?: {
  }): Observable<CategoryResponseDto> {

    return this.categoriesGet$Response(params).pipe(
      map((r: StrictHttpResponse<CategoryResponseDto>) => r.body as CategoryResponseDto)
    );
  }

}
