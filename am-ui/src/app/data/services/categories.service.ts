import {FieldTypeResponse} from './../models/FieldTypeResponse';
import {RestHelperService} from './../../utils/restHelperService';
import {Category} from '../models/Category';
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NGXLogger} from 'ngx-logger';
import {catchError, tap} from 'rxjs/operators';

@Injectable()
export class CategoriesService {
  baseUrl: string;
  defaultHeaders: HttpHeaders;
  // withCredentials: boolean;

  constructor(
    private httpClient: HttpClient,
    private logger: NGXLogger,
    private restHelper: RestHelperService
  ) {
    this.defaultHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json');
    // this.withCredentials = true;
  }

  public getCategories(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>('/api/listCategories/', {
        headers: this.defaultHeaders,
        // withCredentials: this.withCredentials,
      })
      .pipe(
        tap(() =>
          this.logger.info('[CategoriesService]', "getCategories method'")
        ),
        catchError(err => {
          return this.restHelper.handleError(
            'Error in the loading of data.',
            err
          );
        })
      );
  }

  public getSearchFieldTypes(
    categoryId: number
  ): Observable<FieldTypeResponse[]> {
    return this.httpClient
      .get<FieldTypeResponse[]>(
        `api/listCategorySearchFieldTypes/${categoryId}`,
        {
          headers: this.defaultHeaders,
          // withCredentials: this.withCredentials,
        }
      )
      .pipe(
        tap(() =>
          this.logger.info('[CategoriesService]', "getSearchFieldTypes method'")
        ),
        catchError(err => {
          return this.restHelper.handleError(
            'Error in the loading of data.',
            err
          );
        })
      );
  }
}
