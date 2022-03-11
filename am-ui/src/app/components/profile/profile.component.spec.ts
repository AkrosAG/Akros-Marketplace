import {ProfileComponent} from './profile.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ProfileComponent', () => {
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  });
});
