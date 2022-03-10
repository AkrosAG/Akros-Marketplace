import {Router} from '@angular/router';
import {
  TranslateFakeLoader,
  TranslateService,
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {AuthStore} from './../../../data/services/login/auth.service';
import {ComponentFixture, inject, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';

jest.mock('./../../../data/services/login/auth.service');
class MockRouter {
  navigate(url: string) {
    return url;
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
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
      declarations: [NavbarComponent],
      providers: [
        AuthStore,
        TranslateService,
        {provide: Router, useClass: MockRouter},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('NavbarComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    it('should attempt call router with home value', inject(
      [Router],
      (router: Router) => {
        const spy = jest.spyOn(router, 'navigate');
        component.navigateHome();
        const url = spy.mock.calls[0];
        expect(url).toBe('home');
      }
    ));
  });
});
