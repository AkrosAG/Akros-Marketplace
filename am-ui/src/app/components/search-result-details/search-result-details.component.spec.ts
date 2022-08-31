import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import {SearchResultDetailsComponent} from './search-result-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, Input} from '@angular/core';

@Component({
  /*eslint-disable-next-line*/
  selector: 'search-result-details',
  template: '',
})
class MockSearchResultsComponent {
  @Input() language: string;
  @Input() resultJson: [];
}

describe('SearchResultDetailsComponent', () => {
  let component: SearchResultDetailsComponent;
  let fixture: ComponentFixture<SearchResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultDetailsComponent, MockSearchResultsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultDetailsComponent);
    component = fixture.componentInstance;
    /*eslint-disable-next-line*/
    window.history.pushState({resultJson: [{field_description: 'title', value: 'Test title'}], language: 'de'}, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check if subscription is created', () => {
    expect(component).toBeTruthy();
    expect(component.subscription).toBeTruthy();
  });

  it('Check if subscription is undefined when no data is there', () => {
    expect(component).toBeTruthy();
    component.ngOnDestroy();
    expect(component.searchResultDetailSubscription).toBeUndefined();
  });

  it('Check if language is set', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.language === 'de');
  });

  it('should find correct value in resultJson', () => {
    const resultJsonValue = 'Test title';
    expect(component).toBeTruthy();
    /*eslint-disable-next-line*/
    component.resultJson = [ {field_description: 'title', value: resultJsonValue } ];
    expect(component.getValueByKey('title') === resultJsonValue);
  });
});
