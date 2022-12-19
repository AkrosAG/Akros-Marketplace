import {Injectable} from '@angular/core';
import {from} from 'rxjs';
import {map} from 'rxjs/operators';

declare const window: any;

@Injectable({
  providedIn: 'root',
})
export class ConfigReaderService {
  constructor() {}

  public init() {
    return from(
      fetch('assets/runtime-configs/app-config.json').then(response => {
        return response.json();
      })
    )
      .pipe(
        map(config => {
          window.config = config;
          return;
        })
      )
      .toPromise();
  }
}
