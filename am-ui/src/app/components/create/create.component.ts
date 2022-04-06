import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'mp-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit, OnDestroy {
  public appLanguage: String;
  public subscription: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.appLanguage = history.state.appLanguage;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
