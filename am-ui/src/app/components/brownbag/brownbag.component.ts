import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mp-brownbag',
  templateUrl: './brownbag.component.html',
  styleUrls: ['./brownbag.component.scss'],
})
export class BrownbagComponent implements OnInit, OnDestroy {
  public appLanguage: string;
  public subscription: Subscription;

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
