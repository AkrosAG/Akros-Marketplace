import { TranslateFakeLoader, TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {AuthStore} from './../../../data/services/login/auth.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';

jest.mock('./../../../data/services/login/auth.service');

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
      providers: [AuthStore, TranslateService],
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
  });
});
