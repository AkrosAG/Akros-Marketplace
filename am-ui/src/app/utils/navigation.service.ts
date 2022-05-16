import {Injectable} from '@angular/core';
import {Location} from '@angular/common';
import {Router, NavigationEnd} from '@angular/router';

@Injectable({providedIn: 'root'})
export class NavigationService {
  private history: string[] = [];
  /* istanbul ignore next */
  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }
  /* istanbul ignore next */
  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
