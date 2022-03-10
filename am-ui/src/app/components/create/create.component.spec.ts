import {CreateComponent} from './create.component';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('HomeComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateComponent],
    }).compileComponents();
  });

  beforeEach(() => {
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
