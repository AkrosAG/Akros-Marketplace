import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'mp-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  public appLanguage: string;
  public subscription: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
      console.log('Language changed to ' + this.appLanguage);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
