import {CreateComponent} from './create.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateFakeLoader,
  TranslateService,
  TranslateModule,
  TranslateLoader,
} from '@ngx-translate/core';
import {Component, Input} from '@angular/core';

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
class MockCreateAdWebcomponent {}

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
      providers: [TranslateService],
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
});
