import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthStore} from '../../data/services/login/auth.service';
import {UntilDestroy, untilDestroyed} from '@ngneat/until-destroy';
import {LoadingService} from './../shared/spinner/loading.service';

@UntilDestroy()
@Component({
  selector: 'mp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public appLanguage: string;
  public subscription: Subscription;
  public showLoginMessage: boolean;
  public searching: boolean;

  /**
   * @description Component with the main screen of the appliction, which hosts the search webcomponent,
   *  as well as further information and button link to access ads creation page.
   * @constructor
   * @param {TranslateService} translate - use of translate service to detect language change
   * @param {Router} router - used for navigating to the creation
   * @param {AuthStore} auth - used to retrieve stored auth token
   */
  constructor(
    private translate: TranslateService,
    private router: Router,
    private auth: AuthStore,
    private loadingService: LoadingService
  ) {
    this.showLoginMessage = false;
  }

  public navigateCreateAdd() {
    const isLoggedIn = !!this.auth.userValue && this.auth.accessToken;

    if (!isLoggedIn) {
      this.showLoginMessage = true;
      return;
    }

    const navigationExtras = {
      state: {
        appLanguage: this.appLanguage,
      },
    };
    this.router.navigate(['create'], navigationExtras);
  }

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange
      .pipe(untilDestroyed(this))
      .subscribe(appLanguage => {
        this.appLanguage = appLanguage.lang;
      });
  }

  showLoading() {
    this.loadingService.loadingSub.next(true);
  }

  hideLoading() {
    this.loadingService.loadingSub.next(false);
  }

  showResults(event: Event) {
    const topics = (event as CustomEvent).detail.topics;
    const navigationExtras = {
      state: {
        topics: topics,
        language: this.appLanguage,
      },
    };
    this.router.navigate(['search-results'], navigationExtras);
  }
}
