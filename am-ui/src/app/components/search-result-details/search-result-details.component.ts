import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SearchResultDetailsService} from './search-result-details.service';
import {TopicValue} from '../../data/models/TopicValue';
import {TopicImage} from '../../data/models/TopicImage';

interface DetailViewControls {
  priceUnit: String;
  hasSize: boolean;
  hasFloor: boolean;
  isFurnished: boolean;
  isTemporary: boolean;
  isAvailableByDate: boolean;
  isAvailableNow: boolean;
  isAvailableByRequest: boolean;
  hasDate: boolean;
  hasExpectations: boolean;
}

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
  public viewControlValues!: DetailViewControls;

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
          this.setDetailViewControlValues(this.resultJson);
        });
    }
  }

  /* istanbul ignore next */
  setDetailViewControlValues(values: TopicValue[]) {
    const availability = values.find(
      (element: TopicValue) => element.field_description === 'availability'
    )?.value;
    this.viewControlValues = {
      priceUnit:
        values.find(
          (element: TopicValue) => element.field_description === 'priceUnit'
        )?.value || '',
      hasSize:
        values.find(
          (element: TopicValue) => element.field_description === 'size'
        )?.value !== '',
      hasFloor:
        values.find(
          (element: TopicValue) => element.field_description === 'floor'
        )?.value !== '',
      isFurnished:
        values.find(
          (element: TopicValue) => element.field_description === 'furnished'
        )?.value === 'true',
      isTemporary:
        values.find(
          (element: TopicValue) => element.field_description === 'temporary'
        )?.value === 'true',
      isAvailableNow:
        values.find(
          (element: TopicValue) => element.field_description === 'availability'
        )?.value === 'now',
      isAvailableByDate:
        values.find(
          (element: TopicValue) => element.field_description === 'availability'
        )?.value === 'date'
          ? true
          : false,
      isAvailableByRequest:
        availability !== '' &&
        availability !== 'now' &&
        availability !== 'date',
      hasDate:
        values.find(
          (element: TopicValue) => element.field_description === 'date'
        )?.value !== '',
      hasExpectations:
        values.find(
          (element: TopicValue) => element.field_description === 'expectations'
        )?.value !== '',
    };
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
