import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {TestBed} from '@angular/core/testing';
import {Topic} from 'src/app/data/models/Topic';
import {SearchResultDetailsService} from './search-result-details.service';

const fakeTopicResponse: Topic = {
  topic_id: 123,
  category_id: 125,
  subcategory_id: 35,
  request_or_offer: 'REQUEST',
  topic_values: [],
  topic_images: [],
};

const getMethod = 'GET';

describe('SearchResultServiceTest', () => {
  let service: SearchResultDetailsService;
  let httpMockController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SearchResultDetailsService],
    });
    service = TestBed.inject(SearchResultDetailsService);
    httpMockController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get topic by id', () => {
    let actualTopic: Topic | undefined;
    service.getById(fakeTopicResponse.topic_id).subscribe(data => {
      actualTopic = data;
    });
    const testReq = httpMockController.expectOne(
      `/topics/${fakeTopicResponse.topic_id}`
    );
    testReq.flush(fakeTopicResponse);
    expect(testReq.request.method).toEqual(getMethod);
    expect(actualTopic).toEqual(fakeTopicResponse);
  });
});
