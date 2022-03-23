import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
  selector: 'mp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public appLanguage: string;
  public subscription: Subscription;

  constructor(private translate: TranslateService, private router: Router) {}

  public navigateCreateAdd() {
    this.router.navigate(['create']);
  }

  ngOnInit(): void {
    this.subscription = this.translate.onLangChange.subscribe(appLanguage => {
      this.appLanguage = appLanguage.lang;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  showResults(event: Event) {
    console.log((event as CustomEvent).detail);
    this.router.navigate(['search-results']);
  }
}
