import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';

@Component({
  selector: 'mp-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  public language: String = '';
  public subscription: Subscription;
  public results: String[] = [];
  constructor(private translate: TranslateService, private router: Router) {}

  /* istanbul ignore next */
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

  /* istanbul ignore next */
  @HostListener('document:openDetailsEvent', ['$event'])
  directToDetails(event: Event) {
    const topic = (event as CustomEvent).detail;
    const navigationExtras = {
      state: {
        topic: topic,
        language: this.language,
      },
    };
    this.router.navigate(
      ['search-result-details/' + topic.topic_id],
      navigationExtras
    );
  }
}
