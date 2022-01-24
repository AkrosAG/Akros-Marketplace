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

  constructor(private readonly translate: TranslateService) {
    translate.setDefaultLang('de');
  }
}
