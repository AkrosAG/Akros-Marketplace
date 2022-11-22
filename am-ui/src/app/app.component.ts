import {HttpLoaderInterceptor} from './components/shared/spinner/httpLoaderInterceptor.service';
import {Subscription} from 'rxjs';
import {appConfig} from './../config';
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'mp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Akros Marketplace';
  public appLoaded: boolean = true;
  public subscription: Subscription;
  public appLng: string;
  /* istanbul ignore next */
  constructor(
    private translate: TranslateService,
    private httpLoaderInterceptor: HttpLoaderInterceptor
  ) {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      translate.use(appLanguage.lang);
      this.appLng = appLanguage.lang;
    });
    this.httpLoaderInterceptor
      .getOngoingCallsSubject()
      .pipe(untilDestroyed(this))
      .subscribe(ongoingCalls => console.log(ongoingCalls));
    translate.setDefaultLang(appConfig.appLanguage);
    this.appLng = appConfig.appLanguage;
  }

  /* istanbul ignore next */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onOutletLoaded(component: any) {
    component.appLanguage = this.appLng;
  }
}
