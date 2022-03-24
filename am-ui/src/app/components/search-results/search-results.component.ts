import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'mp-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public language: String = '';
  public subscription: Subscription;
  public results: String[] = [];
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.language = history.state.language;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.language = appLanguage.lang;
    });
    this.results = history.state.topics;
    // TODO: If results is null, redirect to home
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
