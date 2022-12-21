import {TestBed} from '@angular/core/testing';
import {AppRuntimeConfig} from './appRuntimeConfig.service';

describe('ConfigReaderService', () => {
  let service: AppRuntimeConfig;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppRuntimeConfig);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
