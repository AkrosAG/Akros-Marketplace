import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'search-webcomponent';
  public appLoaded: boolean = true;

  constructor(private readonly translate: TranslateService) {
    translate.setDefaultLang('de');
  }
}
