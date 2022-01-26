import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {Category} from 'src/app/data/models/Category';
import {CategoriesListComponent} from './categories-list.component';

describe('CategoriesListComponent', () => {
  let component: CategoriesListComponent;
  let fixture: ComponentFixture<CategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesListComponent],
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
    fixture = TestBed.createComponent(CategoriesListComponent);

    component = fixture.componentInstance;
    component.categoriesList = [];
    fixture.detectChanges();
  });

  describe('CategoriesListComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should be set categories correctly on initilization', () => {
      const category1 = {} as Category;
      const category2 = {} as Category;
      component.categoriesList.push(category1);
      component.categoriesList.push(category2);
      component.ngOnInit();
      expect(component.categoriesList.length).toEqual(2);
    });

    it('should emit the categoryWasSelected event when a category gets selected', () => {
      const category1 = {} as Category;
      const category2 = {} as Category;
      component.categoriesList.push(category1);
      component.categoriesList.push(category2);
      component.categoryWasSelected.emit = jest.fn();
      component.categorySelect(1);
      expect(component.categoryWasSelected.emit).toHaveBeenCalled();
    });
  });
});
