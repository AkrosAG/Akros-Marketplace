import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {AuthStore} from './auth.service';
import {UserService} from './user.service';

const url = '/users';
const userId = '1';
const expectedUrl = `${url}/${userId}`;
const accessToken = 'myAcessToken';
const bearerToken = `Bearer ${accessToken}`;
const deleteMethod = 'DELETE';

class MockAuthStore {
  get accessToken() {
    return accessToken;
  }
}

describe('UserServiceTests', () => {
  let service: UserService;
  let httpMockController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService, {provide: AuthStore, useClass: MockAuthStore}],
    });
    service = TestBed.inject(UserService);
    httpMockController = TestBed.inject(HttpTestingController);
  });

  it('should delete user', () => {
    service.deleteUser(userId).subscribe(() => {});

    const testReq = httpMockController.expectOne(expectedUrl);
    testReq.flush('', {status: 204, statusText: 'No Content'});
    expect(testReq.request.method).toBe(deleteMethod);
    expect(testReq.request.headers.get('Authorization')).toBe(bearerToken);
  });
});
