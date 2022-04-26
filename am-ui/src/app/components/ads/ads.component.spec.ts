import {AdsComponent} from './ads.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('AdsComponent', () => {
  let component: AdsComponent;
  let fixture: ComponentFixture<AdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('AdsComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
