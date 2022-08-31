import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import { of } from 'rxjs';
import {SearchResultDetailsComponent} from './search-result-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SearchResultDetailsComponent', () => {
  let component: SearchResultDetailsComponent;
  let fixture: ComponentFixture<SearchResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultDetailsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
            useValue: {
              params: of({id: 1})
            }
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultDetailsComponent);
    component = fixture.componentInstance;
    window.history.pushState({appLanguage: 'de'}, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resultJson should have data in ngOnInit', () => {
    expect(component).toBeTruthy();
    expect(component.resultJson.length !== 0);
  });

  it('check if ID can be read', () => {
    expect(component).toBeTruthy();
    console.log(component.id);
    expect(component.id?.length !== 0);
  });

  it('Check if subscription is created', () => {
    expect(component).toBeTruthy();
    expect(component.subscription).toBeTruthy()
  })
});
