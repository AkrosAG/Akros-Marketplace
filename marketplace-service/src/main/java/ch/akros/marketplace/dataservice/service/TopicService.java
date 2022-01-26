
package ch.akros.marketplace.dataservice.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.namedparam.MapSqlParameterSource;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Service;

import ch.akros.marketplace.api.model.FieldTypeChooseResponseDTO;
import ch.akros.marketplace.api.model.FieldTypeResponseDTO;
import ch.akros.marketplace.api.model.TopicLoadResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchColumnHeaderResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchFieldTypeValuesRequestDTO;
import ch.akros.marketplace.api.model.TopicSearchListResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchRequestDTO;
import ch.akros.marketplace.api.model.TopicSearchResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchValueResponseDTO;
import ch.akros.marketplace.api.model.TopicStoreRequestDTO;
import ch.akros.marketplace.api.model.TopicValueLoadResponseDTO;
import ch.akros.marketplace.api.model.TopicValueStoreRequestDTO;
import ch.akros.marketplace.dataservice.constants.EFieldTypeDefinition;
import ch.akros.marketplace.dataservice.entity.Category;
import ch.akros.marketplace.dataservice.entity.FieldType;
import ch.akros.marketplace.dataservice.entity.FieldTypeChoose;
import ch.akros.marketplace.dataservice.entity.Topic;
import ch.akros.marketplace.dataservice.entity.TopicValue;
import ch.akros.marketplace.dataservice.repository.AdvertiserRepository;
import ch.akros.marketplace.dataservice.repository.CategoryRepository;
import ch.akros.marketplace.dataservice.repository.FieldTypeRepository;
import ch.akros.marketplace.dataservice.repository.TopicRepository;

@Service
public class TopicService {
  @Autowired
  private FieldTypeRepository  fieldTypeRepository;

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

  public List<FieldTypeResponseDTO> listTopicFieldTypes(Long categoryId, String searchOrOffer) {
    return fieldTypeRepository.listTopicSearchFieldTypes(categoryId, "SEARCH".equals(searchOrOffer))
                              .stream()
                              .map(this::toFieldTypeResponseDTO)
                              .collect(Collectors.toList());
  }

  private FieldTypeResponseDTO toFieldTypeResponseDTO(FieldType fieldType) {
    FieldTypeResponseDTO result = new FieldTypeResponseDTO();
    result.setCategoryId(fieldType.getCategory().getCategoryId());
    result.setFieldTypeId(fieldType.getFieldTypeId());
    result.setFieldTypeDefinitionId(fieldType.getFieldTypeDefinition().getFieldTypeDefinitionId());
    result.setFieldTypeDefinitionDescription(fieldType.getFieldTypeDefinition().getDescription());
    result.setDescription(fieldType.getDescription());
    result.setShortDescription(fieldType.getShortDescription());
    result.setMinValue(fieldType.getMinValue());
    result.setMaxValue(fieldType.getMaxValue());
    result.setSearch(fieldType.isSearch());
    result.setOffer(fieldType.isOffer());
    result.setFieldTypeChooses(fieldType.getFieldTypeChooses()
                                        .stream()
                                        .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
                                        .map(this::toFieldTypeChoosesResponseDTO)
                                        .collect(Collectors.toList()));
    return result;
  }

  private FieldTypeChooseResponseDTO toFieldTypeChoosesResponseDTO(FieldTypeChoose fieldTypeChoose) {
    FieldTypeChooseResponseDTO result = new FieldTypeChooseResponseDTO();
    result.setFieldTypeChooseId(fieldTypeChoose.getFieldTypeChooseId());
    result.setDescription(fieldTypeChoose.getDescription());
    result.setSortNumber(fieldTypeChoose.getSortNumber());
    return result;
  }

  public void storeTopic(TopicStoreRequestDTO topicStoreResponseDTO) {
    Topic topic = new Topic();

    topic.setTopicId(topicStoreResponseDTO.getTopicId());
    final Category category = categoryRepository.getById(topicStoreResponseDTO.getCategoryId());
    topic.setCategory(category);

    topic.setValidFrom(LocalDate.now());
    topic.setValidTo(LocalDate.now().plusDays(365));
    topic.setSearchOrOffer(topicStoreResponseDTO.getSearchOrOffer());

    topic.setAdvertiser(advertiserRepository.getById(1L));

    topic.setTopicValues(topicStoreResponseDTO.getTopicValueStores()
                                              .stream()
                                              .map(e -> toTopicValue(category, topic, e))
                                              .collect(Collectors.toList()));

    topicRepository.save(topic);
  }

  private TopicValue toTopicValue(Category category,
                                  Topic topic,
                                  TopicValueStoreRequestDTO topicValueStoreResponseDTO)
  {
    TopicValue result = new TopicValue();
    result.setFieldType(fieldTypeRepository.getById(topicValueStoreResponseDTO.getFieldTypeId()));
    result.setCategory(category);
    result.setTopic(topic);
    result.setValueNum(topicValueStoreResponseDTO.getValueNum());
    result.setValueVarchar(topicValueStoreResponseDTO.getValueVarchar());
    result.setValueDate(topicValueStoreResponseDTO.getValueDate());
    return result;
  }

  public TopicLoadResponseDTO loadTopic(Long topicId) {
    Topic topic = topicRepository.getById(topicId);

    TopicLoadResponseDTO result = new TopicLoadResponseDTO();
    result.setSearchOrOffer(topic.getSearchOrOffer());
    result.setCategoryId(topic.getCategory().getCategoryId());
    result.setTopicId(topicId);

    result.setTopicValues(topic.getTopicValues()
                               .stream()
                               .sorted((e1, e2) -> e1.getFieldType().getSortNumber()
                                                   - e2.getFieldType().getSortNumber())
                               .map(this::toTopicValueLoadResponseDTO)
                               .collect(Collectors.toList()));

    return result;
  }

  private TopicValueLoadResponseDTO toTopicValueLoadResponseDTO(TopicValue topicValue) {
    TopicValueLoadResponseDTO result = new TopicValueLoadResponseDTO();

    result.setTopicValueId(topicValue.getTopicValueId());

    // from FieldTypeDefinition
    result.setFieldTypeDefinitionId(topicValue.getFieldType().getFieldTypeDefinition().getFieldTypeDefinitionId());
    result.setFieldTypeDefinitionDescription(topicValue.getFieldType().getFieldTypeDefinition().getDescription());
    result.setFieldTypeChooses(topicValue.getFieldType()
                                         .getFieldTypeChooses()
                                         .stream()
                                         .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
                                         .map(this::toFieldTypeChoosesResponseDTO)
                                         .collect(Collectors.toList()));

    // from FieldType
    result.setFieldTypeId(topicValue.getFieldType().getFieldTypeId());
    result.setFieldTypeDescription(topicValue.getFieldType().getDescription());
    result.setFieldTypeShortDescription(topicValue.getFieldType().getShortDescription());
    result.setMaxValue(topicValue.getFieldType().getMaxValue());
    result.setMinValue(topicValue.getFieldType().getMinValue());

    // from TopicValue
    result.setValueBoolean(topicValue.getValueBoolean());
    result.setValueDate(topicValue.getValueDate());
    result.setValueNum(topicValue.getValueNum());
    result.setValueVarchar(topicValue.getValueVarchar());

    return result;
  }

  public void deleteTopic(Long topicId) {
    topicRepository.deleteById(topicId);
  }

  public TopicSearchListResponseDTO searchTopic(TopicSearchRequestDTO topicSearchRequestDTO) {
    MapSqlParameterSource namedParameters = new MapSqlParameterSource();
    namedParameters.addValue("categoryId", topicSearchRequestDTO.getCategoryId());

    StringBuilder sqlStringBuilder = null;

    if (topicSearchRequestDTO.getSearchOrOffer() != null && topicSearchRequestDTO.getSearchOrOffer().length() >= 0) {
      sqlStringBuilder = new StringBuilder("select t.topic_id from topic t where t.category_id=:categoryId and t.search_or_offer=:searchOrOffer");
      namedParameters.addValue("searchOrOffer", topicSearchRequestDTO.getSearchOrOffer());
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
                               TopicSearchFieldTypeValuesRequestDTO topicSearchFieldTypeValuesRequestDTO,
                               StringBuilder sqlStringBuilder,
                               MapSqlParameterSource namedParameters)
  {
    Integer fieldTypeDefinitionId = fieldTypeRepository.getById(topicSearchFieldTypeValuesRequestDTO.getFieldTypeId())
                                                       .getFieldTypeDefinition()
                                                       .getFieldTypeDefinitionId();
    EFieldTypeDefinition eFieldTypeDefinition = EFieldTypeDefinition.values()[fieldTypeDefinitionId];

    switch (eFieldTypeDefinition) {
      case PRICE:
      case NUMBER: {
        if (topicSearchFieldTypeValuesRequestDTO.getValueNumFrom() != null
            && topicSearchFieldTypeValuesRequestDTO.getValueNumFrom() > 0)
        {
          if (topicSearchFieldTypeValuesRequestDTO.getValueNumTo() != null
              && topicSearchFieldTypeValuesRequestDTO.getValueNumTo() > 0)
          {
            sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_type_id=:fieldTypeId%d and tv.value_num between :valueNumberFrom%d and :valueNumberTo%d)",
                                                  i,
                                                  i,
                                                  i));
            namedParameters.addValue(String.format("fieldTypeId%d", i),
                                     topicSearchFieldTypeValuesRequestDTO.getFieldTypeId());
            namedParameters.addValue(String.format("valueNumberFrom%d", i),
                                     topicSearchFieldTypeValuesRequestDTO.getValueNumFrom());
            namedParameters.addValue(String.format("valueNumberTo%d", i),
                                     topicSearchFieldTypeValuesRequestDTO.getValueNumTo());
          }
          else {
            sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_type_id=:fieldTypeId%d and tv.value_num >= :valueNumberFrom%d)",
                                                  i,
                                                  i));
            namedParameters.addValue(String.format("fieldTypeId%d", i),
                                     topicSearchFieldTypeValuesRequestDTO.getFieldTypeId());
            namedParameters.addValue(String.format("valueNumberFrom%d", i),
                                     topicSearchFieldTypeValuesRequestDTO.getValueNumFrom());
          }
        }
        else if (topicSearchFieldTypeValuesRequestDTO.getValueNumTo() != null
                 && topicSearchFieldTypeValuesRequestDTO.getValueNumTo() > 0)
        {
          sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_type_id=:fieldTypeId%d and tv.value_num <= :valueNumberTo%d)",
                                                i,
                                                i));
          namedParameters.addValue(String.format("fieldTypeId%d", i),
                                   topicSearchFieldTypeValuesRequestDTO.getFieldTypeId());
          namedParameters.addValue(String.format("valueNumberTo%d", i),
                                   topicSearchFieldTypeValuesRequestDTO.getValueNumTo());
        }

        break;
      }

      case BOOLEAN: {
        sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_type_id=:fieldTypeId%d and tv.value_boolean=:valueBoolean%d)",
                                              i,
                                              i));
        namedParameters.addValue(String.format("fieldTypeId%d", i),
                                 topicSearchFieldTypeValuesRequestDTO.getFieldTypeId());
        namedParameters.addValue(String.format("valueBoolean%d", i),
                                 topicSearchFieldTypeValuesRequestDTO.getValueBoolean());
        break;
      }

      case EMAIL:
      case PHONE_NUMBER:
      case TEXT_MULTI_LINE:
      case TEXT_SINGLE_LINE: {
        sqlStringBuilder.append(String.format(" and t.topic_id in (select tv.topic_id from topic_value tv where tv.category_id=:categoryId and tv.field_type_id=:fieldTypeId%d and upper(tv.value_varchar) like upper('%%' || :valueVarchar%d || '%%'))",
                                              i,
                                              i));
        namedParameters.addValue(String.format("fieldTypeId%d", i),
                                 topicSearchFieldTypeValuesRequestDTO.getFieldTypeId());
        namedParameters.addValue(String.format("valueVarchar%d", i),
                                 topicSearchFieldTypeValuesRequestDTO.getValueVarchar());
        break;
      }

      default:
        break;
    }
  }

  private TopicSearchColumnHeaderResponseDTO toTopicSearchColumnHeaderResponseDTO(FieldTypeResponseDTO fieldTypeResponseDTO) {
    TopicSearchColumnHeaderResponseDTO result = new TopicSearchColumnHeaderResponseDTO();
    result.setFieldTypeId(fieldTypeResponseDTO.getFieldTypeId());
    result.setDescription(fieldTypeResponseDTO.getDescription());
    result.setShortDescription(fieldTypeResponseDTO.getShortDescription());
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
    result.setFieldTypeDefinitionDescription(topicValueLoadResponseDTO.getFieldTypeDefinitionDescription());
    result.setFieldTypeDefinitionId(topicValueLoadResponseDTO.getFieldTypeDefinitionId());
    result.setFieldTypeId(topicValueLoadResponseDTO.getFieldTypeId());
    result.setTopicId(topicId);
    result.setValueBoolean(null);
    result.setValueDate(null);
    result.setValueNum(null);
    result.setValueVarchar(null);
    return result;
  }
}
