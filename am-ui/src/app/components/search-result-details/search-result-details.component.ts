import {Component, OnDestroy, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {SearchResultDetailsService} from "./search-result-details.service";
import {DatePipe} from '@angular/common'

@Component({
  selector: 'mp-search-result-details',
  templateUrl: './search-result-details.component.html',
  styleUrls: ['./search-result-details.component.scss'],
  providers: [DatePipe]
})
export class SearchResultDetailsComponent implements OnInit, OnDestroy {
  public language: String = '';
  public subscription: Subscription;
  public searchResultDetailSubscription: Subscription;
  public result = {};
  public resultJson: any = [];
  public id: string | null;

  /**
   * @description Component to display the detail view of a Topic
   * @constructor
   * @param {TranslateService} translate - use of translate service to detect language change
   */
  constructor(private translate: TranslateService, private route: ActivatedRoute, private searchDetailResultService: SearchResultDetailsService, public datepipe: DatePipe) {
    this.getDefaultSearchResultDetails();
  }

  getDefaultSearchResultDetails() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id != null) {
      this.searchResultDetailSubscription = this.searchDetailResultService.getById(+this.id).subscribe(res => {
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

  getValueByKey(key: String): string {
    return this.resultJson.find((element: any) => element.field_description === key)?.value;
  }

  getValueByDate(): string {
    return new Date(this.getValueByKey('date')).toLocaleDateString();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.searchResultDetailSubscription.unsubscribe();
  }
}
