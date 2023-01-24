import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {AdsService} from './ads.service';
import {Topic} from 'src/app/data/models/Topic';

const topicsUrl = '/topics';
const userId = '1';
const deleteMethod = 'DELETE';
const getMethod = 'GET';


const fakeTopicsResponse: Topic[] = [
  {
    topic_id: 123,
    category_id: 125,
    subcategory_id: 35,
    request_or_offer: 'REQUEST',
    topic_values: [],
    topic_images: [],
  },
  {
    topic_id: 2,
    category_id: 2,
    subcategory_id: 2,
    request_or_offer: 'OFFER',
    topic_values: [],
    topic_images: [],
  },
];

describe('AdsService', () => {
  let adsService: AdsService;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdsService],
    });
    adsService = TestBed.inject(AdsService);
    controller = TestBed.inject(HttpTestingController);
  });

  it('gets topics for the user with the given id', () => {
    const expectedUrl = `${topicsUrl}/user/${userId}`;
    adsService.getAdsByUserId(userId).subscribe(topics => {
      expect(topics).toEqual(fakeTopicsResponse);
    });

    const testReq = controller.expectOne(expectedUrl);
    testReq.flush(fakeTopicsResponse);
    expect(testReq.request.method).toEqual(getMethod);

  });

  it('should throw error user not found', () => {
    const expectedUrl = `${topicsUrl}/user/${userId}`;
    const errorStatus = 404;
    adsService.getAdsByUserId(userId).subscribe(
      () => {},
      err => {
        expect(err.status).toBe(errorStatus);
      }
    );

    const request = controller.expectOne(expectedUrl);
    request.flush('', {status: errorStatus, statusText: 'Not Found'});
  });

  it('should delete topic', () => {
    const topicId = 13;
    const expectedUrl = `${topicsUrl}/${topicId}`;
    const reqStatus = 200;

    adsService.deleteTopic(topicId).then();

    const testReq = controller.expectOne(expectedUrl);
    testReq.flush(null, {status: reqStatus, statusText: 'OK'});
    expect(testReq.request.method).toBe(deleteMethod);

  });
});
