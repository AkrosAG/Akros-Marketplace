import {Injectable} from '@angular/core';
import {NGXLogger} from 'ngx-logger';
import {HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class RestHelperService {
  constructor(public logger: NGXLogger) {}

  /**
   * @description Handles Errors after a restservice call in a convenient way
   *
   * @param actionMsg
   * @param err
   *
   * @returns a observable error
   */
  public handleError(actionMsg: string, err: any): Observable<any> {
    let errorMessage: string;

    if (err instanceof HttpErrorResponse) {
      // The backend returned an unsuccessful response code.
      errorMessage = actionMsg + '\n' + (err.error ? err.error : err.message);
      this.logger.error('[Backend error]', errorMessage, err);
      return throwError(errorMessage);
    } else if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `Error in network: ${err.error.message}`;
      this.logger.error('[Backend error]', errorMessage, err);
      return throwError(errorMessage);
    }

    errorMessage = 'Error in service';
    this.logger.error('[Backend error]', err);
    return throwError(errorMessage);
  }
}
