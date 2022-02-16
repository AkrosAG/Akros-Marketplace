import {TranslateService} from '@ngx-translate/core';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public appLanguage: string;
  public subscription: Subscription;

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
