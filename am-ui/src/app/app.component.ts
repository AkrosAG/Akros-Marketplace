import {Subscription} from 'rxjs';
import {appConfig} from './../config';
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

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
  constructor(private translate: TranslateService) {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      translate.use(appLanguage.lang);
      this.appLng = appLanguage.lang;
    });
    translate.setDefaultLang(appConfig.appLanguage);
    this.appLng = appConfig.appLanguage;
  }
  onOutletLoaded(component: any) {
    component.appLanguage = this.appLng;
  }
}
