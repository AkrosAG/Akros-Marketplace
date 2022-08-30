import {Component, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';

import {SearchResultsComponent} from './search-results.component';

class MockRouter {
  navigate(url: string) {
    return url;
  }
}

@Component({
  /*eslint-disable-next-line*/
  selector: 'search-results-component',
  template: '',
})
class MockSearchResultsComponent {
  @Input() language: string;
  @Input() results: [];
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent, MockSearchResultsComponent],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [{provide: Router, useClass: MockRouter}],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    window.history.pushState({results: [], language: 'de'}, '', '');
    fixture.detectChanges();
  });

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('subscription should be closed after calling OnDestroy', () => {
    expect(component.subscription.closed).toBeFalsy();
    component.ngOnDestroy();
    expect(component.subscription.closed).toBeTruthy();
  });
     */
});


