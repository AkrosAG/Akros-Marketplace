import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class ConfigReaderService {

  constructor() { }

  public init() {
    return from(
        fetch('assets/runtime-configs/app-config.json').then(function(response) {
          return response.json();
        })
      ).pipe(
        map((config) => {
        window.config = config;
        return 
      })).toPromise();
  }

}