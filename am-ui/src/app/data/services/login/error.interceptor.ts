import {AuthStore} from 'src/app/data/services/login/auth.services';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private akrosAuthService: AuthStore) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if ([301, 302].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          this.akrosAuthService.reconnectUser(err?.error?.payload);
          return next.handle(request);
        } else if ([401, 403].indexOf(err.status) !== -1) {
          // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
          const error = err?.error?.message || err?.statusText;
          return throwError(error);
        } else {
          return throwError('undefined');
        }
      })
    );
  }
}
