import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SearchResultDetailsService} from './search-result-details.service';
import {TopicValue} from '../../data/models/TopicValue';
import {TopicImage} from '../../data/models/TopicImage';

@Component({
  selector: 'mp-search-result-details',
  templateUrl: './search-result-details.component.html',
  styleUrls: ['./search-result-details.component.scss'],
})
export class SearchResultDetailsComponent implements OnInit, OnDestroy {
  public language: String = '';
  public subscription: Subscription;
  public searchResultDetailSubscription: Subscription;
  public result = {};
  public resultJson: TopicValue[] = [];
  public id: string | null;
  public images: TopicImage[] = [];

  /**
   * @description Component to display the detail view of a Topic
   * @constructor
   * @param {TranslateService} translate - use of translate service to detect language change
   */
  constructor(
    private translate: TranslateService,
    private route: ActivatedRoute,
    private searchDetailResultService: SearchResultDetailsService
  ) {
    this.getDefaultSearchResultDetails();
  }

  getDefaultSearchResultDetails() {
    if (this.id === undefined && this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
    }
    if (this.id) {
      this.searchResultDetailSubscription = this.searchDetailResultService
        .getById(+this.id)
        .subscribe(res => {
          this.images = res.topic_images;
          this.resultJson = res.topic_values;
        });
    }
  }

  ngOnInit(): void {
    this.language = history.state.language;
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.language = appLanguage.lang;
    });
  }

  getValueByKey(key: string): string {
    /*eslint-disable-next-line*/
    return this.resultJson.find((element: TopicValue) => element.field_description === key)?.value || '';
  }

  getValueNumberByKey(key: string) {
    /*eslint-disable-next-line*/
    const value = this.resultJson.find((element: TopicValue) => element.field_description === key)?.value || '';
    return this.formatCurrency(value);
  }

  formatCurrency(x: number | string) {
    /*eslint-disable-next-line*/
    return Number(x).toLocaleString("de-CH", {style: "currency", currency: "CHF"});
  }

  getValueByDate(): string {
    return new Date(this.getValueByKey('date')).toLocaleDateString();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.searchResultDetailSubscription) {
      this.searchResultDetailSubscription.unsubscribe();
    }
  }
}
