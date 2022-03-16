import {Router} from '@angular/router';
import {
  TranslateLoader,
  TranslateFakeLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {FormFieldsBuilderService} from './../../data/services/form-fields-builder.service';
import {provideMockStore, MockStore} from '@ngrx/store/testing';

jest.mock('./../../data/services/form-fields-builder.service');
class MockRouter {
  navigate(url: string) {
    return url;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
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
      declarations: [HomeComponent],
      providers: [
        {provide: Router, useClass: MockRouter},
        FormFieldsBuilderService,
        provideMockStore({initialState}),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('HomeComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('subscription should be closed after calling OnDestroy', () => {
      expect(component.subscription.closed).toBeFalsy();
      component.ngOnDestroy();
      expect(component.subscription.closed).toBeTruthy();
    });

    it('should attempt call router with create value', inject(
      [Router],
      (router: Router) => {
        const spy = jest.spyOn(router, 'navigate');
        component.navigateCreateAdd();
        const url = spy.mock.calls[0][0];
        expect(url).toStrictEqual(['create']);
      }
    ));

    it('should dispatch loadCategories action upon category selection', () => {
      const fixture = TestBed.createComponent(HomeComponent);
      const app = fixture.componentInstance;
      const store = TestBed.inject(MockStore);
      const cat = {
        category_id: 0,
        key: '',
        fields: [{field_id: 17}],
      };
      const event = {
        detail: {
          category: cat,
          index: 2,
        },
      };
      app.ngOnInit();
      store.dispatch = jest.fn();
      app.categoryChange(event);
      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
