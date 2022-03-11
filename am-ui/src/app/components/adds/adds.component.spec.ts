import {AddsComponent} from './adds.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('AddsComponent', () => {
  let component: AddsComponent;
  let fixture: ComponentFixture<AddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('AddsComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
