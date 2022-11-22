/* eslint-disable prettier/prettier */
/* istanbul ignore file */
import { BehaviorSubject } from 'rxjs';
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class HttpLoaderInterceptor implements HttpInterceptor {
  private stack: String [] = [];
  private readonly ongoingCalls = new BehaviorSubject<boolean>(false);
  ongoingCalls$ = this.ongoingCalls.asObservable();

  getOngoingCallsSubject(): BehaviorSubject<boolean> {
    return this.ongoingCalls;
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.stack.length === 0) {
      console.log('send true')
      this.ongoingCalls.next(true);
    }
    this.stack.push(req.url);
    return next.handle(req).pipe(
      tap({
        next: () => {},
        error: () => {},
      }),

      finalize(() => {
        setTimeout(() => {
          this.stack.pop();
          if (this.stack.length === 0) {
            console.log('send false');
            console.log(this.ongoingCalls);
            this.ongoingCalls.next(false);
          }
        }, 200)
      })
    );
  }
}
