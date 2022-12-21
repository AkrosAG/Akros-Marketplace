import {AuthStore} from 'src/app/data/services/login/auth.service';
import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AppRuntimeConfig} from '../../../config/appRuntimeConfig.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthStore,
    private auth: AuthStore,
    private runtimeConfig: AppRuntimeConfig
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // add auth header with jwt if user is logged in and request is to api url
    const user = this.authenticationService.userValue;
    const isLoggedIn = !!user && this.auth.accessToken;
    const isApiUrl = request.url.startsWith(this.runtimeConfig.apiUrl);

    if (isLoggedIn && isApiUrl) {
      const token = 'Bearer ' + this.auth.idToken.replace(/"/g, '');
      request = request.clone({
        setHeaders: {
          Authorization: token,
        },
      });
    }

    return next.handle(request);
  }
}
