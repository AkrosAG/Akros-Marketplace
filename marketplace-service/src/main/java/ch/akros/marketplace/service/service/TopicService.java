
package ch.akros.marketplace.service.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import ch.akros.marketplace.api.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import ch.akros.marketplace.service.constants.EFieldTypeDefinition;
import ch.akros.marketplace.service.entity.Category;
import ch.akros.marketplace.service.entity.Field;
import ch.akros.marketplace.service.entity.FieldOption;
import ch.akros.marketplace.service.entity.Topic;
import ch.akros.marketplace.service.entity.TopicValue;
import ch.akros.marketplace.service.repository.AdvertiserRepository;
import ch.akros.marketplace.service.repository.CategoryRepository;
import ch.akros.marketplace.service.repository.FieldRepository;
import ch.akros.marketplace.service.repository.TopicRepository;

@Service
public class TopicService {
  @Autowired
  private FieldRepository fieldRepository;

  @Autowired
  private CategoryRepository   categoryRepository;

  @Autowired
  private AdvertiserRepository advertiserRepository;

  @Autowired
  private TopicRepository      topicRepository;

  @Autowired
  private JdbcTemplate         jdbcTemplate;

  @Autowired
  private CategoryService      categoryService;

  public List<FieldResponseDTO> listTopicFieldTypes(Long categoryId, String requestOrOffer) {
    return fieldRepository.listTopicSearchFields(categoryId, "REQUEST".equals(requestOrOffer))
                              .stream()
                              .map(this::toFieldResponseDTO)
                              .collect(Collectors.toList());
  }

  private FieldResponseDTO toFieldResponseDTO(Field field) {
    FieldResponseDTO result = new FieldResponseDTO();
    result.setFieldId(field.getFieldId());
    result.setFieldTypeDefinitionId(field.getFieldTypeDefinition().getFieldTypeDefinitionId());
    result.setKey(field.getKey());
    result.setMinValue(field.getMinValue());
    result.setMaxValue(field.getMaxValue());
    result.setRequest(field.isRequest());
    result.setOffer(field.isOffer());
    result.setCreation(field.isCreation());
    result.setSortNumber(field.getSortNumber());
    result.setFieldOptions(field.getFieldOptions()
                                        .stream()
                                        .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
                                        .map(this::toFieldOptionsResponseDTO)
                                        .collect(Collectors.toList()));
    return result;
  }

  private FieldOptionResponseDTO toFieldOptionsResponseDTO(FieldOption fieldOption) {
    FieldOptionResponseDTO result = new FieldOptionResponseDTO();
    result.setFieldOptionId(fieldOption.getFieldOptionId());
    result.setKey(fieldOption.getKey());
    result.setSortNumber(fieldOption.getSortNumber());
    return result;
  }

  public void saveTopic(TopicSaveRequestDTO topicSaveRequestDTO) {
    Topic topic = new Topic();

    topic.setTopicId(topicSaveRequestDTO.getTopicId());
    final Category category = categoryRepository.getById(topicSaveRequestDTO.getCategoryId());
    //TODO CHECK IF NEEDED
    topic.setCategory(category);

    topic.setValidFrom(LocalDate.now());
    topic.setValidTo(LocalDate.now().plusDays(365));
    topic.setRequestOrOffer(topicSaveRequestDTO.getRequestOrOffer());

    topic.setAdvertiser(advertiserRepository.getById(1L));

    topic.setTopicValues(topicSaveRequestDTO.getTopicValues()
                                              .stream()
                                              .map(e -> toTopicValue(category, topic, e))
                                              .collect(Collectors.toList()));

    topicRepository.save(topic);
  }

  private TopicValue toTopicValue(Category category,
                                  Topic topic,
                                  TopicValueSaveRequestDTO topicValueSaveResponseDTO) {
    TopicValue result = new TopicValue();
    result.setField(fieldRepository.getById(topicValueSaveResponseDTO.getFieldTypeId()));
    result.setCategory(category);
    result.setTopic(topic);
    result.setValue(topicValueSaveResponseDTO.getValue());
    return result;
  }

  public TopicLoadResponseDTO loadTopic(Long topicId) {
    Topic topic = topicRepository.getById(topicId);

    TopicLoadResponseDTO result = new TopicLoadResponseDTO();
    result.setRequestOrOffer(topic.getRequestOrOffer());
    result.setCategoryId(topic.getCategory().getCategoryId());
    result.setTopicId(topicId);

    result.setTopicValues(topic.getTopicValues()
                               .stream()
                               .sorted((e1, e2) -> e1.getField().getSortNumber()
                                                   - e2.getField().getSortNumber())
                               .map(this::toTopicValueLoadResponseDTO)
                               .collect(Collectors.toList()));
    return result;
  }

  private TopicValueLoadResponseDTO toTopicValueLoadResponseDTO(TopicValue topicValue) {
    TopicValueLoadResponseDTO result = new TopicValueLoadResponseDTO();

    result.setTopicValueId(topicValue.getTopicValueId());

    // from Field
    result.setFieldId(topicValue.getField().getFieldId());
    result.setFieldDescription(topicValue.getField().getKey());
    result.setMaxValue(topicValue.getField().getMaxValue());
    result.setMinValue(topicValue.getField().getMinValue());

    // from TopicValue
    result.setValue(topicValue.getValue());

    return result;
  }

  public void deleteTopic(Long topicId) {
    topicRepository.deleteById(topicId);
  }

  public TopicSearchListResponseDTO searchTopic(TopicSearchRequestDTO topicSearchRequestDTO) {
    TopicSearchListResponseDTO result = new TopicSearchListResponseDTO();

    Topic topic = new Topic();
    Category category = categoryRepository.getById(topicSearchRequestDTO.getCategoryId());
    topic.setCategory(category);
    topic.setRequestOrOffer(topicSearchRequestDTO.getRequestOrOffer());
    if(topicSearchRequestDTO.getSearchValues() != null) {
      List<TopicValue> collect = topicSearchRequestDTO.getSearchValues().stream().map(value -> {
        return TopicValue.builder().category(category).value(value.getValue()).build();
      }).collect(Collectors.toList());
    }

    Example<Topic> exampleTopic = Example.of(topic, ExampleMatcher.matchingAny());
    List<TopicSearchResponseDTO> topicList = topicRepository.findAll(exampleTopic).stream().map(this::toTopicSearchResponseDTO)
            .collect(Collectors.toList());
    result.setTopics(topicList);
    return result;
  }

  private TopicSearchColumnHeaderResponseDTO toTopicSearchColumnHeaderResponseDTO(FieldResponseDTO fieldTypeResponseDTO) {
    TopicSearchColumnHeaderResponseDTO result = new TopicSearchColumnHeaderResponseDTO();
    result.setFieldId(fieldTypeResponseDTO.getFieldId());
    result.setDescription(fieldTypeResponseDTO.getKey());
    return result;
  }

  private TopicSearchResponseDTO toTopicSearchResponseDTO(Topic topic) {
    TopicSearchResponseDTO result = new TopicSearchResponseDTO();
    result.setTopicId(topic.getTopicId());

    result.setTopicValues(loadTopic(topic.getTopicId()).getTopicValues()
                                                       .stream()
                                                       .map(e -> toTopicSearchValueResponseDTO(topic.getTopicId(), e))
                                                       .collect(Collectors.toList()));

    return result;
  }

  private TopicSearchValueResponseDTO toTopicSearchValueResponseDTO(Long topicId,
                                                                    TopicValueLoadResponseDTO topicValueLoadResponseDTO)
  {
    TopicSearchValueResponseDTO result = new TopicSearchValueResponseDTO();
    result.setFieldId(topicValueLoadResponseDTO.getFieldId());
    result.setTopicId(topicId);
    fieldRepository.findAll().stream().filter(field -> field.getFieldId() == topicValueLoadResponseDTO.getFieldId()).findAny().ifPresent(field -> {
      result.setKey(field.getKey());
    });

    result.setValue(topicValueLoadResponseDTO.getValue());
    return result;
  }
}
