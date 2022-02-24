import { TranslateService } from '@ngx-translate/core';
import { Injectable } from '@angular/core';
import de from 'src/assets/i18n/de';
import en from 'src/assets/i18n/en';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  constructor(private translate: TranslateService) {
    this.translate.setTranslation('de', de);
    this.translate.setTranslation('en', en);

    // this.translate.setDefaultLang('de');
  }

  use(language: string): void {
    this.translate.use(language);
  }
}
