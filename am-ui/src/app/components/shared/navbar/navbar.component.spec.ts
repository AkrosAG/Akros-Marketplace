import {AuthStore} from './../../../data/services/login/auth.service';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NavbarComponent} from './navbar.component';

jest.mock('./../../../data/services/login/auth.service');

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers: [AuthStore],
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
