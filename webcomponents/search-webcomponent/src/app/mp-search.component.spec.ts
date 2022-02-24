import {FormFieldControlService} from './shared/form/form-field-control.service';
import {TestBed} from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
  TranslateService,
} from '@ngx-translate/core';
import {MpSearchComponent} from './mp-search.component';
import {provideMockStore, MockStore} from '@ngrx/store/testing';

jest.mock('./shared/form/form-field-control.service');

describe('MpSearchComponent', () => {
  const initialState = {
    categories: [],
    selectedCategorySearchFields: [],
    categorySelected: false,
  };

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
      declarations: [MpSearchComponent],
      providers: [
        FormFieldControlService,
        TranslateService,
        provideMockStore({initialState}),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'search-webcomponent'`, () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('search-webcomponent');
  });

  it('should dispatch loadCategories action upon category selection', () => {
    const fixture = TestBed.createComponent(MpSearchComponent);
    const app = fixture.componentInstance;
    const store = TestBed.inject(MockStore);
    const cat = {
      categoryId: 0,
      key: '',
      fields: [],
    };
    store.dispatch = jest.fn();
    app.categorySelect(2, cat);
    expect(store.dispatch).toHaveBeenCalled();
  });
});
