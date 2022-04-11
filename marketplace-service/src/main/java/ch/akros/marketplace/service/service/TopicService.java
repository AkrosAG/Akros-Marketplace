
package ch.akros.marketplace.service.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import ch.akros.marketplace.api.model.*;
import org.springframework.beans.factory.annotation.Autowired;
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
                                  TopicValueSaveRequestDTO topicValueSaveResponseDTO)
  {
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

    // from FieldTypeDefinition
    result.setFieldTypeDefinitionId(topicValue.getField().getFieldTypeDefinition().getFieldTypeDefinitionId());
    result.setFieldTypeDefinitionDescription(topicValue.getField().getFieldTypeDefinition().getDescription());
    result.setFieldTypeOptions(topicValue.getField()
                                         .getFieldOptions()
                                         .stream()
                                         .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
                                         .map(this::toFieldOptionsResponseDTO)
                                         .collect(Collectors.toList()));

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
    MapSqlParameterSource namedParameters = new MapSqlParameterSource();
    namedParameters.addValue("categoryId", topicSearchRequestDTO.getCategoryId());

    StringBuilder sqlStringBuilder = null;

    if (topicSearchRequestDTO.getRequestOrOffer() != null) {
      sqlStringBuilder = new StringBuilder("select t.topic_id from topic t where t.category_id=:categoryId and t.request_or_offer=:requestOrOffer");
      namedParameters.addValue("requestOrOffer", topicSearchRequestDTO.getRequestOrOffer());
    }
    else {
      sqlStringBuilder = new StringBuilder("select t.topic_id from topic t where t.category_id=:categoryId");
    }

    if (Objects.nonNull(topicSearchRequestDTO.getSearchValues())) {
      for (int i = 0; i < topicSearchRequestDTO.getSearchValues().size(); i++) {
        addSqlSubselect(i, topicSearchRequestDTO.getSearchValues().get(i), sqlStringBuilder, namedParameters);
      }
    }

    NamedParameterJdbcTemplate namedParameterJdbcTemplate = new NamedParameterJdbcTemplate(jdbcTemplate);

    List<Long> topicIds = namedParameterJdbcTemplate.queryForList(sqlStringBuilder.toString(),
                                                                  namedParameters,
                                                                  Long.class);

    TopicSearchListResponseDTO result = new TopicSearchListResponseDTO();

    result.setColumnHeader(categoryService.listCategorySearchFieldTypes(topicSearchRequestDTO.getCategoryId())
                                          .stream()
                                          .map(this::toTopicSearchColumnHeaderResponseDTO)
                                          .collect(Collectors.toList()));

    result.setTopics(topicRepository.findAllById(topicIds)
                                    .stream()
                                    .map(this::toTopicSearchResponseDTO)
                                    .collect(Collectors.toList()));

    return result;
  }

  private void addSqlSubselect(int i,
                               TopicSearchFieldValuesRequestDTO topicSearchFieldValuesRequestDTO,
                               StringBuilder sqlStringBuilder,
                               MapSqlParameterSource namedParameters)
  {
    Integer fieldTypeDefinitionId = fieldRepository.getById(topicSearchFieldValuesRequestDTO.getFieldId())
                                                       .getFieldTypeDefinition()
                                                       .getFieldTypeDefinitionId();
    EFieldTypeDefinition eFieldTypeDefinition = EFieldTypeDefinition.values()[fieldTypeDefinitionId];

    switch (eFieldTypeDefinition) {
      case PRICE:
      case NUMBER: {
        if (topicSearchFieldValuesRequestDTO.getValueNumFrom() != null
            && topicSearchFieldValuesRequestDTO.getValueNumFrom() > 0)
        {
          if (topicSearchFieldValuesRequestDTO.getValueNumTo() != null
              && topicSearchFieldValuesRequestDTO.getValueNumTo() > 0)
          {
            sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_id=:fieldId%d and tv.value_num between :valueNumberFrom%d and :valueNumberTo%d)",
                                                  i,
                                                  i,
                                                  i));
            namedParameters.addValue(String.format("fieldId%d", i),
                    topicSearchFieldValuesRequestDTO.getFieldId());
            namedParameters.addValue(String.format("valueNumberFrom%d", i),
                    topicSearchFieldValuesRequestDTO.getValueNumFrom());
            namedParameters.addValue(String.format("valueNumberTo%d", i),
                    topicSearchFieldValuesRequestDTO.getValueNumTo());
          }
          else {
            sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_id=:fieldId%d and tv.value_num >= :valueNumberFrom%d)",
                                                  i,
                                                  i));
            namedParameters.addValue(String.format("fieldId%d", i),
                    topicSearchFieldValuesRequestDTO.getFieldId());
            namedParameters.addValue(String.format("valueNumberFrom%d", i),
                    topicSearchFieldValuesRequestDTO.getValueNumFrom());
          }
        }
        else if (topicSearchFieldValuesRequestDTO.getValueNumTo() != null
                 && topicSearchFieldValuesRequestDTO.getValueNumTo() > 0)
        {
          sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_id=:fieldId%d and tv.value_num <= :valueNumberTo%d)",
                                                i,
                                                i));
          namedParameters.addValue(String.format("fieldId%d", i),
                  topicSearchFieldValuesRequestDTO.getFieldId());
          namedParameters.addValue(String.format("valueNumberTo%d", i),
                  topicSearchFieldValuesRequestDTO.getValueNumTo());
        }

        break;
      }

      case BOOLEAN: {
        sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_id=:fieldId%d and tv.value_boolean=:valueBoolean%d)",
                                              i,
                                              i));
        namedParameters.addValue(String.format("fieldId%d", i),
                topicSearchFieldValuesRequestDTO.getFieldId());
        namedParameters.addValue(String.format("valueBoolean%d", i),
                topicSearchFieldValuesRequestDTO.getValue());
        break;
      }

      case EMAIL:
      case PHONE_NUMBER:
      case TEXT_MULTI_LINE:
      case TEXT_SINGLE_LINE: {
        sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_id=:fieldId%d and upper(tv.value_varchar) like upper('%%' || :valueVarchar%d || '%%'))",
                                              i,
                                              i));
        namedParameters.addValue(String.format("fieldId%d", i),
                topicSearchFieldValuesRequestDTO.getFieldId());
        namedParameters.addValue(String.format("valueVarchar%d", i),
                topicSearchFieldValuesRequestDTO.getValue());
        break;
      }

      default:
        break;
    }
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
    result.setFieldDefinitionDescription(topicValueLoadResponseDTO.getFieldTypeDefinitionDescription());
    result.setFieldDefinitionId(topicValueLoadResponseDTO.getFieldTypeDefinitionId());
    result.setFieldId(topicValueLoadResponseDTO.getFieldId());
    result.setTopicId(topicId);
    result.setValue(null);
    return result;
  }
}
