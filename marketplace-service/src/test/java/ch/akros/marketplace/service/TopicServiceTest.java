package ch.akros.marketplace.service;

import ch.akros.marketplace.api.model.*;
import ch.akros.marketplace.service.entity.*;
import ch.akros.marketplace.service.repository.*;

import ch.akros.marketplace.service.service.TopicService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatcher;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class TopicServiceTest {

    private TopicService topicService;
    @Mock
    private FieldRepository fieldRepository;
    @Mock
    private TopicRepository topicRepository;
    @Mock
    private SubCategoryRepository subCategoryRepository;

    @Mock
    private TopicImageRepository topicImageRepository;

    @Mock
    private TopicValueRepository topicValueRepository;

    private Field field;
    private Topic firstExpectedTopic;
    private Topic secondExpectedTopic;
    private Topic thirdExpectedTopic;
    private Topic fourthExpectedTopic;

    final private String OFFER = "OFFER";
    final private String REQUEST = "REQUEST";
    final private Long TOPIC_ID_11 = 11L;
    final private Long TOPIC_ID_12 = 12L;
    final private Long TOPIC_ID_13 = 13L;
    final private Long TOPIC_ID_14 = 14L;

    final private Long CATEGORY_ID_1 = 1L;
    final private Long SUBCATEGORY_ID_1 = 1L;
    final private Long SUBCATEGORY_ID_2 = 2L;
    final private Long TOPIC_FIELD_ID_6 = 6L;
    final private Long TOPIC_FIELD_ID_8 = 8L;
    final private Long TOPIC_FIELD_ID_24 = 24L;
    final private Long TOPIC_FIELD_ID_25 = 25L;
    final private String FIELD_VALUE_40 = "40";
    final private String FIELD_VALUE_80 = "80";
    final private String FIELD_VALUE_90 = "90";
    final private String FIELD_VALUE_100 = "100";
    final private String FIELD_VALUE_200 = "200";
    final private String FIELD_VALUE_150 = "150";

    final private String USER_ID = "user-id";
    @BeforeEach
    public void beforeEach() {
        MockitoAnnotations.openMocks(this);
        this.topicService = new TopicService(fieldRepository,
                topicRepository,
                subCategoryRepository,
                topicImageRepository,
                topicValueRepository);

        this.field = new Field();

        this.firstExpectedTopic = expectedTopicCreator(OFFER, TOPIC_ID_11, SUBCATEGORY_ID_1, TOPIC_FIELD_ID_6, FIELD_VALUE_40, USER_ID);
        this.secondExpectedTopic = expectedTopicCreator(OFFER, TOPIC_ID_12, SUBCATEGORY_ID_1, TOPIC_FIELD_ID_6, FIELD_VALUE_80, USER_ID);
        this.thirdExpectedTopic = expectedTopicCreator(REQUEST, TOPIC_ID_13, SUBCATEGORY_ID_2, TOPIC_FIELD_ID_8, FIELD_VALUE_100, USER_ID);
        this.fourthExpectedTopic = expectedTopicCreator(OFFER, TOPIC_ID_14, SUBCATEGORY_ID_2, TOPIC_FIELD_ID_8, FIELD_VALUE_200, USER_ID);
    }

    private Topic expectedTopicCreator(String requestOrOfferValue, Long topicIdValue, Long subCategoryIdValue,
                                        Long topicFieldIdValue, String valueValue, String userId) {
        field.setFieldId(topicFieldIdValue);

        return Topic.builder()
                .requestOrOffer(requestOrOfferValue)
                .topicId(topicIdValue)
                .userId(userId)
                .subCategory(SubCategory.builder()
                        .subCategoryId(subCategoryIdValue)
                        .category(new Category())
                        .build())
                .topicValues(List.of(TopicValue.builder()
                        .value(valueValue)
                        .field(field)
                        .build()))
                .build();
    }

    @Test
    public void searchTopic_NoInput_Test(){
        // given
        TopicSearchRequestDTO inputTopicSearchRequestDTO = new TopicSearchRequestDTO();

        inputTopicSearchRequestDTO.setCategoryId(CATEGORY_ID_1);
        inputTopicSearchRequestDTO.setSubcategoryId(SUBCATEGORY_ID_1);
        inputTopicSearchRequestDTO.setRequestOrOffer(OFFER);
        inputTopicSearchRequestDTO.setSearchValues(Collections.emptyList());

        Topic predefinedTopic = Topic.builder()
                .requestOrOffer(OFFER)
                .subCategory(SubCategory.builder()
                        .subCategoryId(SUBCATEGORY_ID_1)
                        .category(new Category())
                        .build())
                .topicValues(Collections.emptyList())
                .build();

        Example<Topic> exampleTopic = Example.of(predefinedTopic, ExampleMatcher.matchingAll());

        when(fieldRepository.findAll()).thenReturn(List.of(field));
        when(topicRepository.findAll(argThat(new CustomExampleTopicMatcher(exampleTopic))))
                .thenReturn(List.of(firstExpectedTopic, secondExpectedTopic));
        when(topicRepository.getById(TOPIC_ID_11)).thenReturn(firstExpectedTopic);
        when(topicRepository.getById(TOPIC_ID_12)).thenReturn(secondExpectedTopic);

        // when
        TopicSearchListResponseDTO result = topicService.searchTopic(inputTopicSearchRequestDTO);

        // then
        assertEquals(2, result.getTopics().size());
        verify(topicRepository).findAll(argThat(new CustomExampleTopicMatcher(exampleTopic)));
        verify(topicRepository).getById(TOPIC_ID_11);
        verify(topicRepository).getById(TOPIC_ID_12);
        verify(fieldRepository, times(2)).findAll();
        verifyNoMoreInteractions(topicRepository, fieldRepository);
        verifyNoInteractions(subCategoryRepository);

    }

    @Test
    public void searchTopic_BySubCategoryId_Test() {
        // given
        TopicSearchRequestDTO inputTopicSearchRequestDTO = new TopicSearchRequestDTO();

        inputTopicSearchRequestDTO.setCategoryId(CATEGORY_ID_1);
        inputTopicSearchRequestDTO.setSubcategoryId(SUBCATEGORY_ID_2);
        inputTopicSearchRequestDTO.setRequestOrOffer(OFFER);
        inputTopicSearchRequestDTO.setSearchValues(Collections.emptyList());

        Topic predefinedTopic = Topic.builder()
                .requestOrOffer(OFFER)
                .subCategory(SubCategory.builder()
                        .subCategoryId(SUBCATEGORY_ID_2)
                        .category(new Category())
                        .build())
                .topicValues(Collections.emptyList())
                .build();

        Example<Topic> exampleTopic = Example.of(predefinedTopic, ExampleMatcher.matchingAll());

        when(fieldRepository.findAll()).thenReturn(List.of(field));
        when(topicRepository.findAll(argThat(new CustomExampleTopicMatcher(exampleTopic))))
                .thenReturn(List.of(thirdExpectedTopic, fourthExpectedTopic));
        when(topicRepository.getById(TOPIC_ID_13)).thenReturn(thirdExpectedTopic);
        when(topicRepository.getById(TOPIC_ID_14)).thenReturn(fourthExpectedTopic);
        // when
        TopicSearchListResponseDTO result = topicService.searchTopic(inputTopicSearchRequestDTO);

        // then
        assertEquals(2, result.getTopics().size());
        TopicSearchResponseDTO resultTopic1 = result.getTopics().get(0);
        assertEquals(13, resultTopic1.getTopicId());
        assertEquals(2, resultTopic1.getSubcategoryId());
        TopicSearchResponseDTO resultTopic2 = result.getTopics().get(1);
        assertEquals(14, resultTopic2.getTopicId());
        assertEquals(2, resultTopic2.getSubcategoryId());
        verify(topicRepository).findAll(argThat(new CustomExampleTopicMatcher(exampleTopic)));
        verify(topicRepository).getById(TOPIC_ID_13);
        verify(topicRepository).getById(TOPIC_ID_14);
        verify(fieldRepository, times(2)).findAll();
        verifyNoMoreInteractions(topicRepository, fieldRepository);
        verifyNoInteractions(subCategoryRepository);
    }

    @Test
    public void searchTopic_AllWithRequests_Test() {
        // given
        TopicSearchRequestDTO inputTopicSearchRequestDTO = new TopicSearchRequestDTO();

        inputTopicSearchRequestDTO.setCategoryId(CATEGORY_ID_1);
        inputTopicSearchRequestDTO.setSubcategoryId(SUBCATEGORY_ID_2);
        inputTopicSearchRequestDTO.setRequestOrOffer(REQUEST);
        inputTopicSearchRequestDTO.setSearchValues(Collections.emptyList());

        Topic predefinedTopic = Topic.builder()
                .requestOrOffer(REQUEST)
                .subCategory(SubCategory.builder()
                        .subCategoryId(SUBCATEGORY_ID_2)
                        .category(new Category())
                        .build())
                .topicValues(Collections.emptyList())
                .build();

        Example<Topic> exampleTopic = Example.of(predefinedTopic, ExampleMatcher.matchingAll());

        when(fieldRepository.findAll()).thenReturn(List.of(field));
        when(topicRepository.findAll(argThat(new CustomExampleTopicMatcher(exampleTopic))))
                .thenReturn(List.of(thirdExpectedTopic));
        when(topicRepository.getById(TOPIC_ID_13)).thenReturn(thirdExpectedTopic);
        // when
        TopicSearchListResponseDTO result = topicService.searchTopic(inputTopicSearchRequestDTO);

        // then
        assertEquals(1, result.getTopics().size());
        TopicSearchResponseDTO resultTopic = result.getTopics().get(0);
        assertEquals(13, resultTopic.getTopicId());
        verify(topicRepository).findAll(argThat(new CustomExampleTopicMatcher(exampleTopic)));
        verify(topicRepository).getById(TOPIC_ID_13);
        verify(fieldRepository).findAll();
        verifyNoMoreInteractions(topicRepository, fieldRepository);
        verifyNoInteractions(subCategoryRepository);
    }

    @Test
    public void searchTopic_searchValuesSize_Test() {

        // given
        TopicSearchRequestDTO inputTopicSearchRequestDTO = new TopicSearchRequestDTO();

        inputTopicSearchRequestDTO.setCategoryId(CATEGORY_ID_1);
        inputTopicSearchRequestDTO.setSubcategoryId(SUBCATEGORY_ID_2);
        inputTopicSearchRequestDTO.setRequestOrOffer(OFFER);

        TopicSearchFieldValuesRequestDTO searchValue = new TopicSearchFieldValuesRequestDTO();

        searchValue.setFieldId(TOPIC_FIELD_ID_25);
        searchValue.setValue(FIELD_VALUE_150);
        inputTopicSearchRequestDTO.setSearchValues(List.of(searchValue));

        field.setFieldId(TOPIC_FIELD_ID_8);

        Topic predefinedTopic = Topic.builder()
                .requestOrOffer(OFFER)
                .subCategory(SubCategory.builder()
                        .subCategoryId(SUBCATEGORY_ID_2)
                        .category(new Category())
                        .build())
                .topicValues(Collections.emptyList())
                .build();

        Example<Topic> exampleTopic = Example.of(predefinedTopic, ExampleMatcher.matchingAll());


        when(fieldRepository.findAll()).thenReturn(List.of(field));
        when(topicRepository.findAll(argThat(new CustomExampleTopicMatcher(exampleTopic))))
                .thenReturn(List.of(fourthExpectedTopic));
        when(topicRepository.getById(TOPIC_ID_14)).thenReturn(fourthExpectedTopic);
        // when
        TopicSearchListResponseDTO result = topicService.searchTopic(inputTopicSearchRequestDTO);

        // then
        assertEquals(1, result.getTopics().size());
        TopicSearchResponseDTO resultTopic = result.getTopics().get(0);
        assertEquals(14, resultTopic.getTopicId());
        assertEquals(1, resultTopic.getTopicValues().size());
        assertEquals(200L, Long.parseLong(resultTopic.getTopicValues().get(0).getValue()));

        verify(topicRepository).findAll(argThat(new CustomExampleTopicMatcher(exampleTopic)));
        verify(topicRepository).getById(TOPIC_ID_14);
        verify(fieldRepository).findAll();
        verifyNoMoreInteractions(topicRepository, fieldRepository);
        verifyNoInteractions(subCategoryRepository);
    }

    @Test
    public void searchTopic_searchValuesPrice_Test() {

        // given
        TopicSearchRequestDTO inputTopicSearchRequestDTO = new TopicSearchRequestDTO();

        inputTopicSearchRequestDTO.setCategoryId(CATEGORY_ID_1);
        inputTopicSearchRequestDTO.setSubcategoryId(SUBCATEGORY_ID_1);
        inputTopicSearchRequestDTO.setRequestOrOffer(OFFER);

        TopicSearchFieldValuesRequestDTO searchValue = new TopicSearchFieldValuesRequestDTO();

        searchValue.setFieldId(TOPIC_FIELD_ID_24);
        searchValue.setValue(FIELD_VALUE_90);
        inputTopicSearchRequestDTO.setSearchValues(List.of(searchValue));
        field.setFieldId(TOPIC_FIELD_ID_6);

        Topic predefinedTopic = Topic.builder()
                .requestOrOffer(OFFER)
                .subCategory(SubCategory.builder()
                        .subCategoryId(SUBCATEGORY_ID_1)
                        .category(new Category())
                        .build())
                .topicValues(Collections.emptyList())
                .build();

        Example<Topic> exampleTopic = Example.of(predefinedTopic, ExampleMatcher.matchingAll());

        when(fieldRepository.findAll()).thenReturn(List.of(field));
        when(topicRepository.findAll(argThat(new CustomExampleTopicMatcher(exampleTopic))))
                .thenReturn(List.of(firstExpectedTopic, secondExpectedTopic));
        when(topicRepository.getById(TOPIC_ID_11)).thenReturn(firstExpectedTopic);
        when(topicRepository.getById(TOPIC_ID_12)).thenReturn(secondExpectedTopic);
        // when
        TopicSearchListResponseDTO result = topicService.searchTopic(inputTopicSearchRequestDTO);

        // then
        assertEquals(2, result.getTopics().size());

        verify(topicRepository).findAll(argThat(new CustomExampleTopicMatcher(exampleTopic)));
        verify(topicRepository).getById(TOPIC_ID_11);
        verify(topicRepository).getById(TOPIC_ID_12);
        verify(fieldRepository, times(2)).findAll();
        verifyNoMoreInteractions(topicRepository, fieldRepository);
        verifyNoInteractions(subCategoryRepository);
    }

    @Test
    public void convertTopicToTopicLoadResponseDTO() {
        Topic topic = firstExpectedTopic;
        TopicLoadResponseDTO dto = new TopicLoadResponseDTO();
        dto.setTopicId(topic.getTopicId());
        dto.setSubcategoryId(topic.getSubCategory().getSubCategoryId());
        dto.setRequestOrOffer(topic.getRequestOrOffer());
        dto.setTopicValues(getTopicValueLoadResponseDto(topic.getTopicValues()));

        assertEquals(topic.getTopicId(), dto.getTopicId());
        assertEquals(topic.getSubCategory().getSubCategoryId(), dto.getSubcategoryId());
        assertEquals(topic.getRequestOrOffer(), dto.getRequestOrOffer());
        assertEquals(topic.getTopicValues().get(0).getTopicValueId(), dto.getTopicValues().get(0).getTopicValueId());
    }

    private List<TopicValueLoadResponseDTO> getTopicValueLoadResponseDto(List<TopicValue> topicValues) {
        List<TopicValueLoadResponseDTO> dtoList = new ArrayList<>();
        for (TopicValue topicValue : topicValues) {
            TopicValueLoadResponseDTO dto = new TopicValueLoadResponseDTO();
            dto.setFieldId(topicValue.getField().getFieldId());
            dto.setValue(topicValue.getValue());
            dto.setTopicValueId(topicValue.getTopicValueId());
            dtoList.add(dto);
        }
        return dtoList;
    }

    private static class CustomExampleTopicMatcher implements ArgumentMatcher<Example<Topic>> {
        private final Example<Topic> left;

        public CustomExampleTopicMatcher(Example<Topic> left) {
            this.left = left;
        }

        @Override
        public boolean matches(Example<Topic> right) {

            return left.getProbe().getSubCategory().getSubCategoryId()
                            .equals(right.getProbe().getSubCategory().getSubCategoryId()) &&
                    left.getProbe().getRequestOrOffer()
                            .equals(right.getProbe().getRequestOrOffer());
        }
    }
}
