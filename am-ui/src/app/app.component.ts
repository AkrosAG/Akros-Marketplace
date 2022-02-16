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

  constructor(private translate: TranslateService) {
    translate.setDefaultLang(appConfig.appLanguage);
    translate.use(appConfig.appLanguage);
  }
}
