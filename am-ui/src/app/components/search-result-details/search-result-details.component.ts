import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mp-search-result-details',
  templateUrl: './search-result-details.component.html',
  styleUrls: ['./search-result-details.component.scss'],
})
export class SearchResultDetailsComponent implements OnInit, OnDestroy {
  public language: String = '';
  public subscription: Subscription;
  public result = {};
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.language = history.state.language;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.language = appLanguage.lang;
    });
    this.result = JSON.stringify(history.state.topic);
    // TODO: If results is null, redirect to home
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
