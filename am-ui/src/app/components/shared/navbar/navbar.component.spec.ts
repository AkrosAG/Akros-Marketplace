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
        component.navigate('home');
        const url = spy.mock.calls[0][0];
        expect(url).toStrictEqual(['home']);
      }
    ));

    it('will display user menu when user icon is clicked', () => {
      component.showMenu('user');
      expect(component.optionsMenuShown).toBeTruthy();
    });

    it('will display language menu when language icon is clicked', () => {
      component.showMenu('lng');
      expect(component.lngMenuShown).toBeTruthy();
    });

    it('closes language menu if open and user menu is clicked', () => {
      component.showMenu('lng');
      component.showMenu('user');
      expect(component.optionsMenuShown).toBeTruthy();
      expect(component.lngMenuShown).toBeFalsy();
    });

    it('closes user menu if open and language menu is clicked', () => {
      component.showMenu('user');
      component.showMenu('lng');
      expect(component.optionsMenuShown).toBeFalsy();
      expect(component.lngMenuShown).toBeTruthy();
    });

    it('closes user menu if open clicked anywhere on the screen', () => {
      component.optionsMenuShown = true;
      component.clickout();
      expect(component.optionsMenuShown).toBeFalsy();
    });

    it('closes language menu if open clicked anywhere on the screen', () => {
      component.lngMenuShown = true;
      component.clickout();
      expect(component.lngMenuShown).toBeFalsy();
    });
  });
});
