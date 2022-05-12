import {TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';

import {NavigationService} from './navigation.service';

class MockRouter {
  navigate(url: string) {
    return url;
  }
  public events = {
    subscribe(fn: any) {
      return null;
    },
  };
}

const locationStub = {
  back: jest.fn(),
};

describe('NavigationService', () => {
  let service: NavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: Router, useClass: MockRouter},
        {provide: Location, useValue: locationStub},
      ],
    });
    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
