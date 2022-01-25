import {TestBed} from '@angular/core/testing';
import {FormFieldControlService} from './form-field-control.service';

describe('FormFieldControlService', () => {
  let service: FormFieldControlService;

  beforeEach(() => {
    service = new FormFieldControlService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
