import {CreateComponent} from './create.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateService,
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {Component, Input} from '@angular/core';
import {AuthStore} from '../../data/services/login/auth.service';

@Component({
  /*eslint-disable-next-line*/
  selector: 'i18n-host',
  template: '',
})
/*eslint-disable-next-line*/
class Mocki18nHost {
  @Input() locale: string;
}

@Component({
  /*eslint-disable-next-line*/
  selector: 'create-ad-webcomponent',
  template: '',
})
/*eslint-disable-next-line*/
class MockCreateAdWebcomponent {
  @Input() bearerToken: string;
}

class MockStore {
  get userValue() {
    return {};
  }

  get accessToken() {
    return 'abc';
  }
}

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent, Mocki18nHost, MockCreateAdWebcomponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
      providers: [TranslateService, {provide: AuthStore, useClass: MockStore}],
    }).compileComponents();
  });

  beforeEach(() => {
    window.history.pushState({appLanguage: 'de'}, '', '');
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('CreateComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('CreateComponent', () => {
    it('should getToken', () => {
      expect(component.getOauthToken()).toEqual('abc');
    });
  });
});
