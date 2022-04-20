import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';

import {SearchResultDetailsComponent} from './search-result-details.component';

describe('SearchResultDetailsComponent', () => {
  let component: SearchResultDetailsComponent;
  let fixture: ComponentFixture<SearchResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      declarations: [SearchResultDetailsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    window.history.pushState({appLanguage: 'de'}, '', '');
    fixture = TestBed.createComponent(SearchResultDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
