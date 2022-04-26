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

  /**
   * @description Component to display the detail view of a Topic
   * @constructor
   * @param {TranslateService} translate - use of translate service to detect language change
   */
  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.language = history.state.language;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.language = appLanguage.lang;
    });
    this.result = JSON.stringify(history.state.topic);
    // TODO: If results is null, the webcomponent should send a request to the backend with the topic_id from the path parameter
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
