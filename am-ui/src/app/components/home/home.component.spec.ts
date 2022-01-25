import {Component, CUSTOM_ELEMENTS_SCHEMA, Input} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {CategoriesListComponent} from './categories-list/categories-list.component';
import {SearchFormComponent} from './search-form/search-form.component';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {Category} from 'src/app/data/models/Category';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;

  const initialState = {
    categories: [],
    selectedCategorySearchFields: [],
    categorySelected: false,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        MockCategoriesListComponent,
        SearchFormComponent,
      ],
      providers: [provideMockStore({initialState})],
      imports: [
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
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('HomeComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});

@Component({
  selector: 'mp-categories-list',
  template: '',
})
class MockCategoriesListComponent {
  @Input() public categoriesList: Category[];
}
