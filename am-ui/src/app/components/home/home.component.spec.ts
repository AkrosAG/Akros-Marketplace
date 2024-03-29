/* eslint-disable @typescript-eslint/no-unused-vars */
import {Router} from '@angular/router';
import {
  TranslateLoader,
  TranslateFakeLoader,
  TranslateModule,
} from '@ngx-translate/core';
import {ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {HomeComponent} from './home.component';
import {Component, Input} from '@angular/core';
import {AuthStore} from '../../data/services/login/auth.service';
class MockRouter {
  navigate(url: string) {
    return url;
  }
}
@Component({
  /*eslint-disable-next-line*/
  selector: 'search-component',
  template: '',
})
class MockSearchComponent {
  @Input() language: string;
}

class MockStore {
  public user: unknown = {};
  token = 'abc';

  get userValue() {
    return this.user;
  }

  get accessToken() {
    return this.token;
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
      declarations: [HomeComponent, MockSearchComponent],
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: AuthStore, useClass: MockStore},
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

    it('should attempt call router with create value', inject(
      [Router],
      (router: Router) => {
        const spy = jest.spyOn(router, 'navigate');
        component.navigateCreateAdd();
        const url = spy.mock.calls[0][0];
        expect(url).toStrictEqual(['create']);
      }
    ));

    it('should show login message', inject([AuthStore], (store: AuthStore) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(store, 'userValue', 'get').mockReturnValue(null);
      component.navigateCreateAdd();
      expect(component.showLoginMessage).toBeTruthy();
    }));

    it('should attempt call router with search-results value', inject(
      [Router],
      (router: Router) => {
        const spy = jest.spyOn(router, 'navigate');
        const event: CustomEvent = {
          detail: {
            topics: [],
          },
          initCustomEvent: function (
            type: string,
            bubbles?: boolean,
            cancelable?: boolean,
            detail?: unknown
          ): void {
            throw new Error('Function not implemented.');
          },
          bubbles: false,
          cancelBubble: false,
          cancelable: false,
          composed: false,
          currentTarget: null,
          defaultPrevented: false,
          eventPhase: 0,
          isTrusted: false,
          returnValue: false,
          srcElement: null,
          target: null,
          timeStamp: 0,
          type: '',
          composedPath: function (): EventTarget[] {
            throw new Error('Function not implemented.');
          },
          initEvent: function (
            type: string,
            bubbles?: boolean,
            cancelable?: boolean
          ): void {
            throw new Error('Function not implemented.');
          },
          preventDefault: function (): void {
            throw new Error('Function not implemented.');
          },
          stopImmediatePropagation: function (): void {
            throw new Error('Function not implemented.');
          },
          stopPropagation: function (): void {
            throw new Error('Function not implemented.');
          },
          AT_TARGET: 0,
          BUBBLING_PHASE: 0,
          CAPTURING_PHASE: 0,
          NONE: 0,
        };
        component.showResults(event);
        const url = spy.mock.calls[0][0];
        expect(url).toStrictEqual(['search-results']);
      }
    ));
  });
});
