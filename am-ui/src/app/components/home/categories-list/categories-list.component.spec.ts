import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {CategoriesListComponent} from './categories-list.component';

class TranslateServiceStub {
  public get(key: any): any {
    return of(key);
  }
}
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
  });
});
