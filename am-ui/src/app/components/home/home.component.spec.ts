import {Router} from '@angular/router';
import {
  TranslateLoader,
  TranslateFakeLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {HomeComponent} from './home.component';
class MockRouter {
  navigate(url: string) {
    return url;
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      providers: [{provide: Router, useClass: MockRouter}],
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
  });
});
