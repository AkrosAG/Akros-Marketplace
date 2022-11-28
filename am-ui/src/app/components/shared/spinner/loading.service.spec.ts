import {LoadingService} from './loading.service';
import {TestBed} from '@angular/core/testing';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('set loading to true when setLoadingEvent is sent with true value', () => {
    window.dispatchEvent(
      new CustomEvent('setLoadingEvent', {
        detail: true,
      })
    );
    expect(service.loadingSub.value).toBeTruthy();
  });

  it('set loading to false when setLoadingEvent is sent with false value', () => {
    window.dispatchEvent(
      new CustomEvent('setLoadingEvent', {
        detail: false,
      })
    );
    expect(service.loadingSub.value).toBe(false);
  });

  it('adds url to valueMap and sets loading to true when setLoading is called with true and an URL', () => {
    service.loadingMap.set('testurl', true);
    service.setLoading(false, 'testurl');
    expect(service.loadingMap.size).toBe(0);
    expect(service.loadingSub.value).toBe(false);
  });

  it('deletes value from loadingMap when setLoading method receives false for a given url and sets loading to false', () => {
    service.setLoading(true, 'testurl');
    expect(service.loadingSub.value).toBeTruthy();
    expect(service.loadingMap.size).toBe(1);
  });
});
