import {TranslateService} from '@ngx-translate/core';
import {Injectable} from '@angular/core';
import de from '../../../assets/i18n/de';
import en from '../../../assets/i18n/en';

@Injectable({
  providedIn: 'root',
})
export class LocalizationService {
  /* istanbul ignore next */
  constructor(private translate: TranslateService) {
    this.translate.setTranslation('de', de);
    this.translate.setTranslation('en', en);
  }
  /* istanbul ignore next */
  use(language: string): void {
    this.translate.use(language);
  }
}
