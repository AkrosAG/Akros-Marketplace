/* istanbul ignore file */
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {LoadingService} from './loading.service';

@Injectable({providedIn: 'root'})
export class HttpLoaderInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loadingService.setLoading(true, request.url);
    return next
      .handle(request)
      .pipe(
        catchError(err => {
          this.loadingService.setLoading(false, request.url);
          return err;
        })
      )
      .pipe(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        map((evt: any) => {
          if (evt instanceof HttpResponse) {
            this.loadingService.setLoading(false, request.url);
          }
          return evt;
        })
      );
  }
}
