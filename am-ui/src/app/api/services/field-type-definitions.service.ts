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

import { FieldTypeDefinitionResponseDto } from '../models/field-type-definition-response-dto';

@Injectable({
  providedIn: 'root',
})
export class FieldTypeDefinitionsService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation listFieldTypeDefinitionsGet
   */
  static readonly ListFieldTypeDefinitionsGetPath = '/list-field-type-definitions';

  /**
   * List the field type definitions.
   *
   * Helper function to see different possible field types that frontend must handle
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `listFieldTypeDefinitionsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  listFieldTypeDefinitionsGet$Response(params?: {
  }): Observable<StrictHttpResponse<FieldTypeDefinitionResponseDto>> {

    const rb = new RequestBuilder(this.rootUrl, FieldTypeDefinitionsService.ListFieldTypeDefinitionsGetPath, 'get');
    if (params) {
    }

    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<FieldTypeDefinitionResponseDto>;
      })
    );
  }

  /**
   * List the field type definitions.
   *
   * Helper function to see different possible field types that frontend must handle
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `listFieldTypeDefinitionsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  listFieldTypeDefinitionsGet(params?: {
  }): Observable<FieldTypeDefinitionResponseDto> {

    return this.listFieldTypeDefinitionsGet$Response(params).pipe(
      map((r: StrictHttpResponse<FieldTypeDefinitionResponseDto>) => r.body as FieldTypeDefinitionResponseDto)
    );
  }

}
