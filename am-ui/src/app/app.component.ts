/* istanbul ignore file */
import {LoadingService} from './components/shared/spinner/loading.service';
import {Subscription} from 'rxjs';
import {appConfig} from './../config';
import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {delay} from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Akros Marketplace';
  public loading: boolean = false;
  public subscription: Subscription;
  public appLng: string;
  /* istanbul ignore next */
  constructor(
    private translate: TranslateService,
    private loadingService: LoadingService
  ) {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      translate.use(appLanguage.lang);
      this.appLng = appLanguage.lang;
    });
    translate.setDefaultLang(appConfig.appLanguage);
    this.appLng = appConfig.appLanguage;
  }

  ngOnInit() {
    this.subscribeToLoader();
  }

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onOutletLoaded(component: any) {
    component.appLanguage = this.appLng;
  }

  subscribeToLoader() {
    this.loadingService.loadingSub
      .pipe(delay(0))
      .pipe(untilDestroyed(this))
      .subscribe(loading => {
        this.loading = loading;
      });
  }
}
