import {ComponentFixture, TestBed} from '@angular/core/testing';
import {
  TranslateModule,
  TranslateLoader,
  TranslateFakeLoader,
} from '@ngx-translate/core';
import {SearchResultDetailsComponent} from './search-result-details.component';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Component, Input} from '@angular/core';
import {TopicValue} from '../../data/models/TopicValue';
import {FieldOption} from '../../data/models/FieldOption';

@Component({
  /*eslint-disable-next-line*/
  selector: 'search-result-details',
  template: '',
})
class MockSearchResultsComponent {
  @Input() language: string;
  @Input() resultJson: [];
}

describe('SearchResultDetailsComponent', () => {
  let component: SearchResultDetailsComponent;
  let fixture: ComponentFixture<SearchResultDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultDetailsComponent, MockSearchResultsComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useClass: TranslateFakeLoader,
          },
        }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultDetailsComponent);
    component = fixture.componentInstance;
    /*eslint-disable-next-line*/
    window.history.pushState({resultJson: [{field_description: 'title', value: 'Test title'}], language: 'de'}, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Check if subscription is created', () => {
    expect(component).toBeTruthy();
    expect(component.subscription).toBeTruthy();
  });

  it('Check if subscription is undefined when no data is there', () => {
    expect(component).toBeTruthy();
    expect(component.searchResultDetailSubscription).toBeUndefined();
  });

  it('Check if subscription is not undefined when id is set', () => {
    expect(component).toBeTruthy();
    component.id = '1';
    component.getDefaultSearchResultDetails();
    expect(component.searchResultDetailSubscription).toBeDefined();
  });

  it('Check if language is set', () => {
    expect(component).toBeTruthy();
    component.ngOnInit();
    expect(component.language).toBe('de');
  });

  it('should find correct value in resultJson', () => {
    const resultJsonValue = 'Test title';
    expect(component).toBeTruthy();
    /*eslint-disable-next-line*/
    const topicValue = createTopicValue('title', resultJsonValue);

    component.resultJson = [topicValue];
    expect(component.getValueByKey('title')).toBe(resultJsonValue);
  });

  it('Check if price is correct formatted', () => {
    const topicValue = createTopicValue('price', '1500');
    component.resultJson = [topicValue];
    const value = component.getValueNumberByKey('price');
    /*eslint-disable-next-line*/
    expect(value).toBe(`CHF 1’500.00`);
  });

  /*
  it('Check if date is correct formatted', () => {
    const topicValue = createTopicValue('date', '2022-10-10');
    component.resultJson = [topicValue];
    const value = component.getValueByDate();
    expect(value).toBe('10.10.2022' || '10/10/2022');
  });
   */

  it('Check if getById is called', () => {
    expect(component).toBeTruthy();
    component.id = '1';
    const getDefaultSearchResultDetails = jest.fn();
    /*eslint-disable-next-line*/
    getDefaultSearchResultDetails.call(component.getDefaultSearchResultDetails());
    expect(getDefaultSearchResultDetails).toBeCalled();
  });

  it('creates conditions correctly according to received data', () => {
    expect(component).toBeTruthy();
    component.setDetailViewControlValues(sampleRoomAddValues);
    expect(component.viewControlValues.priceUnit).toBe('month');
    expect(component.viewControlValues.hasSize).toBe(true);
    expect(component.viewControlValues.hasFloor).toBe(true);
    expect(component.viewControlValues.isFurnished).toBe(true);
    expect(component.viewControlValues.isTemporary).toBe(true);
    expect(component.viewControlValues.isAvailableNow).toBe(true);
    expect(component.viewControlValues.isAvailableByDate).toBe(false);
    expect(component.viewControlValues.isAvailableByRequest).toBe(false);
    expect(component.viewControlValues.hasDate).toBe(false);
    expect(component.viewControlValues.hasExpectations).toBe(true);
  });

  function createTopicValue(key: string, value: string): TopicValue {
    const topicValue = new TopicValue();
    const fieldOption = new FieldOption();
    fieldOption.key = key;
    fieldOption.field_option_id = 1;
    fieldOption.sort_number = 1;

    topicValue.value = value;
    topicValue.field_description = key;
    topicValue.topic_value_id = 1;
    topicValue.field_id = 1;
    topicValue.field_short_description = key;
    topicValue.field_type_definition_id = 1;
    topicValue.field_type_definition_description = 'test description';
    topicValue.min_value = 1;
    topicValue.max_value = 2;
    topicValue.field_type_options = [fieldOption];
    return topicValue;
  }

  const sampleRoomAddValues: TopicValue[] = [
    {
      topic_value_id: 19,
      field_id: 1,
      field_description: 'title',
      field_short_description: '',
      field_type_definition_id: 1,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 100,
      value: 'Luxury Bedroom',
      field_type_options: [],
    },
    {
      topic_value_id: 20,
      field_id: 12,
      field_description: 'region',
      field_short_description: '',
      field_type_definition_id: 1,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 100,
      value: 'Zürich',
      field_type_options: [],
    },
    {
      topic_value_id: 21,
      field_id: 11,
      field_description: 'postalCode',
      field_short_description: '',
      field_type_definition_id: 2,
      field_type_definition_description: '',
      min_value: 4,
      max_value: 5,
      value: '8005',
      field_type_options: [],
    },
    {
      topic_value_id: 22,
      field_id: 13,
      field_description: 'address',
      field_short_description: '',
      field_type_definition_id: 2,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 150,
      value: 'Pfingstweidstrasse 96',
      field_type_options: [],
    },
    {
      topic_value_id: 23,
      field_id: 8,
      field_description: 'size',
      field_short_description: '',
      field_type_definition_id: 2,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: '28',
      field_type_options: [],
    },
    {
      topic_value_id: 24,
      field_id: 9,
      field_description: 'floor',
      field_short_description: '',
      field_type_definition_id: 2,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: '14',
      field_type_options: [],
    },
    {
      topic_value_id: 25,
      field_id: 6,
      field_description: 'price',
      field_short_description: '',
      field_type_definition_id: 2,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: '1650',
      field_type_options: [],
    },
    {
      topic_value_id: 26,
      field_id: 7,
      field_description: 'priceUnit',
      field_short_description: '',
      field_type_definition_id: 6,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: 'month',
      field_type_options: [],
    },
    {
      topic_value_id: 27,
      field_id: 29,
      field_description: 'availability',
      field_short_description: '',
      field_type_definition_id: 6,
      field_type_definition_description: '',
      min_value: 0,
      max_value: 0,
      value: 'now',
      field_type_options: [],
    },
    {
      topic_value_id: 28,
      field_id: 15,
      field_description: 'date',
      field_short_description: '',
      field_type_definition_id: 12,
      field_type_definition_description: '',
      min_value: 0,
      max_value: 0,
      value: '',
      field_type_options: [],
    },
    {
      topic_value_id: 29,
      field_id: 14,
      field_description: 'furnished',
      field_short_description: '',
      field_type_definition_id: 14,
      field_type_definition_description: '',
      min_value: 0,
      max_value: 0,
      value: 'true',
      field_type_options: [],
    },
    {
      topic_value_id: 30,
      field_id: 30,
      field_description: 'temporary',
      field_short_description: '',
      field_type_definition_id: 8,
      field_type_definition_description: '',
      min_value: 0,
      max_value: 1,
      value: 'true',
      field_type_options: [],
    },
    {
      topic_value_id: 31,
      field_id: 2,
      field_description: 'description',
      field_short_description: '',
      field_type_definition_id: 4,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: 'Geräumiges Doppelzimmer mit guter Aussicht auf die Stadt',
      field_type_options: [],
    },
    {
      topic_value_id: 32,
      field_id: 3,
      field_description: 'expectations',
      field_short_description: '',
      field_type_definition_id: 4,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: 'ruhig und sauber sein, keine Haustiere',
      field_type_options: [],
    },
    {
      topic_value_id: 33,
      field_id: 33,
      field_description: 'about',
      field_short_description: '',
      field_type_definition_id: 4,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: '',
      field_type_options: [],
    },
    {
      topic_value_id: 34,
      field_id: 17,
      field_description: 'phone',
      field_short_description: '',
      field_type_definition_id: 1,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 100,
      value: '0246518842',
      field_type_options: [],
    },
    {
      topic_value_id: 35,
      field_id: 16,
      field_description: 'email',
      field_short_description: '',
      field_type_definition_id: 1,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 100,
      value: 'anothertest@hotmail.com',
      field_type_options: [],
    },
    {
      topic_value_id: 36,
      field_id: 36,
      field_description: 'lat',
      field_short_description: '',
      field_type_definition_id: 1,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: '47.3909515',
      field_type_options: [],
    },
    {
      topic_value_id: 37,
      field_id: 37,
      field_description: 'lon',
      field_short_description: '',
      field_type_definition_id: 1,
      field_type_definition_description: '',
      min_value: 1,
      max_value: 1000,
      value: '8.512142063644248',
      field_type_options: [],
    },
  ];
});
