<<<<<<< Updated upstream
package ch.akros.marketplace.service.service;

import ch.akros.marketplace.api.model.FieldOptionResponseDTO;
import ch.akros.marketplace.api.model.FieldResponseDTO;
import ch.akros.marketplace.api.model.TopicLoadResponseDTO;
import ch.akros.marketplace.api.model.TopicSaveRequestDTO;
import ch.akros.marketplace.api.model.TopicSearchListResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchRequestDTO;
import ch.akros.marketplace.api.model.TopicSearchResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchValueResponseDTO;
import ch.akros.marketplace.api.model.TopicValueLoadResponseDTO;
import ch.akros.marketplace.api.model.TopicValueSaveRequestDTO;
import ch.akros.marketplace.service.entity.Field;
import ch.akros.marketplace.service.entity.FieldOption;
import ch.akros.marketplace.service.entity.SubCategory;
import ch.akros.marketplace.service.entity.Topic;
import ch.akros.marketplace.service.entity.TopicValue;
import ch.akros.marketplace.service.model.LatLon;
import ch.akros.marketplace.service.repository.AdvertiserRepository;
import ch.akros.marketplace.service.repository.FieldRepository;
import ch.akros.marketplace.service.repository.SubCategoryRepository;
import ch.akros.marketplace.service.repository.TopicRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
public class TopicService {

    private static final String LAT_LON_API_SEARCH_URL = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=";
    private final FieldRepository fieldRepository;
    private final AdvertiserRepository advertiserRepository;
    private final TopicRepository topicRepository;
    private final SubCategoryRepository subCategoryRepository;

    public TopicService(
            FieldRepository fieldRepository,
            AdvertiserRepository advertiserRepository,
            TopicRepository topicRepository,
            SubCategoryRepository subCategoryRepository) {
        this.fieldRepository = fieldRepository;
        this.advertiserRepository = advertiserRepository;
        this.topicRepository = topicRepository;
        this.subCategoryRepository = subCategoryRepository;
    }

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
        final SubCategory subCategory = subCategoryRepository.getById(topicSaveRequestDTO.getSubcategoryId());
        //TODO CHECK IF NEEDED
        topic.setSubCategory(subCategory);

        topic.setValidFrom(LocalDate.now());
        topic.setValidTo(LocalDate.now().plusDays(365));
        topic.setRequestOrOffer(topicSaveRequestDTO.getRequestOrOffer());

        topic.setAdvertiser(advertiserRepository.getById(1L));
        List<TopicValue> topicValues = topicSaveRequestDTO.getTopicValues()
                .stream()
                .map(e -> toTopicValue(topic, e))
                .collect(Collectors.toList());
        List<TopicValue> finalTopicValues = getFinalTopicValuesList(topicValues);
        topic.setTopicValues(finalTopicValues);

        topicRepository.save(topic);
    }

    private List<TopicValue> getFinalTopicValuesList(List<TopicValue> topicValues) {

        String address = topicValues.stream().filter(topicValue -> topicValue.getField().getKey().equals("address")).findFirst().orElseThrow().getValue();
        String postalCode = topicValues.stream().filter(topicValue -> topicValue.getField().getKey().equals("postalCode")).findFirst().orElseThrow().getValue();
        String region = topicValues.stream().filter(topicValue -> topicValue.getField().getKey().equals("region")).findFirst().orElseThrow().getValue();

        LatLon[] latLon = getLonLatValues(address, postalCode, region);
        if (latLon.length != 0) {
            topicValues.stream().filter(topicValue -> topicValue.getField().getKey().equals("lon")).findFirst().orElseThrow().setValue(latLon[0].getLon());
            topicValues.stream().filter(topicValue -> topicValue.getField().getKey().equals("lat")).findFirst().orElseThrow().setValue(latLon[0].getLat());
        }
        return topicValues;
    }

    private LatLon[] getLonLatValues(String address, String postalCode, String region) {
        String formattedAddress = address.replace(" ", "%20");
        String concatenated = formattedAddress + "%20" + postalCode + "%20+" + region;
        URL url;
        HttpURLConnection con = null;
        try {
            url =  new URL(LAT_LON_API_SEARCH_URL + concatenated);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("accept", "application/json");
            if (con.getResponseCode() != 200) {
                return getDefaultLonLatValues();
            }
            InputStream responseStream = con.getInputStream();
            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(responseStream, LatLon[].class);
        } catch (IOException uhe) {
            return getDefaultLonLatValues();
        } finally {
            if (con != null) {
                con.disconnect();
            }
        }
    }

    private LatLon[] getDefaultLonLatValues() {
        LatLon latLon = new LatLon("0", "0");
        return new LatLon[]{latLon};
    }

    private TopicValue toTopicValue(
            Topic topic,
            TopicValueSaveRequestDTO topicValueSaveResponseDTO) {
        TopicValue result = new TopicValue();
        result.setField(fieldRepository.getById(topicValueSaveResponseDTO.getFieldTypeId()));
        result.setTopic(topic);
        result.setValue(topicValueSaveResponseDTO.getValue());
        return result;
    }

    public TopicLoadResponseDTO loadTopic(Long topicId) {
        Topic topic = topicRepository.getById(topicId);

        TopicLoadResponseDTO result = new TopicLoadResponseDTO();
        result.setRequestOrOffer(topic.getRequestOrOffer());
        result.setSubcategoryId(topic.getSubCategory().getSubCategoryId());
        result.setCategoryId(topic.getSubCategory().getCategory().getCategoryId());
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
        topic.setRequestOrOffer(topicSearchRequestDTO.getRequestOrOffer());
        if (topicSearchRequestDTO.getSearchValues() != null) {
            List<TopicValue> collect = topicSearchRequestDTO.getSearchValues().stream().map(value -> {
                return TopicValue.builder().value(value.getValue()).build();
            }).collect(Collectors.toList());
        }

        Example<Topic> exampleTopic = Example.of(topic, ExampleMatcher.matchingAll());
        List<TopicSearchResponseDTO> topicList = topicRepository.findAll(exampleTopic).stream().map(this::toTopicSearchResponseDTO)
                .collect(Collectors.toList());
        result.setTopics(topicList);
        return result;
    }

    private TopicSearchResponseDTO toTopicSearchResponseDTO(Topic topic) {
        TopicSearchResponseDTO result = new TopicSearchResponseDTO();
        result.setTopicId(topic.getTopicId());
        result.setSubcategoryId(topic.getSubCategory().getSubCategoryId());
        result.setSubcategoryKey(topic.getSubCategory().getKey());

        result.setTopicValues(loadTopic(topic.getTopicId()).getTopicValues()
                .stream()
                .map(e -> toTopicSearchValueResponseDTO(topic.getTopicId(), e))
                .collect(Collectors.toList()));

        return result;
    }

    private TopicSearchValueResponseDTO toTopicSearchValueResponseDTO(
            Long topicId,
            TopicValueLoadResponseDTO topicValueLoadResponseDTO) {
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
=======
package ch.akros.marketplace.service.service;

import ch.akros.marketplace.api.model.FieldOptionResponseDTO;
import ch.akros.marketplace.api.model.FieldResponseDTO;
import ch.akros.marketplace.api.model.TopicLoadResponseDTO;
import ch.akros.marketplace.api.model.TopicSaveRequestDTO;
import ch.akros.marketplace.api.model.TopicSearchListResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchRequestDTO;
import ch.akros.marketplace.api.model.TopicSearchResponseDTO;
import ch.akros.marketplace.api.model.TopicSearchValueResponseDTO;
import ch.akros.marketplace.api.model.TopicValueLoadResponseDTO;
import ch.akros.marketplace.api.model.TopicValueSaveRequestDTO;
import ch.akros.marketplace.service.entity.Field;
import ch.akros.marketplace.service.entity.FieldOption;
import ch.akros.marketplace.service.entity.SubCategory;
import ch.akros.marketplace.service.entity.Topic;
import ch.akros.marketplace.service.entity.TopicValue;
import ch.akros.marketplace.service.repository.AdvertiserRepository;
import ch.akros.marketplace.service.repository.FieldRepository;
import ch.akros.marketplace.service.repository.SubCategoryRepository;
import ch.akros.marketplace.service.repository.TopicRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

@Service
public class TopicService {
  private final FieldRepository fieldRepository;
  private final AdvertiserRepository advertiserRepository;
  private final TopicRepository topicRepository;
  private final SubCategoryRepository subCategoryRepository;

  public TopicService(
          FieldRepository fieldRepository,
          AdvertiserRepository advertiserRepository,
          TopicRepository topicRepository,
          SubCategoryRepository subCategoryRepository) {
    this.fieldRepository = fieldRepository;
    this.advertiserRepository = advertiserRepository;
    this.topicRepository = topicRepository;
    this.subCategoryRepository = subCategoryRepository;
  }

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
    final SubCategory subCategory = subCategoryRepository.getById(topicSaveRequestDTO.getSubcategoryId());
    //TODO CHECK IF NEEDED
    topic.setSubCategory(subCategory);

    topic.setValidFrom(LocalDate.now());
    topic.setValidTo(LocalDate.now().plusDays(365));
    topic.setRequestOrOffer(topicSaveRequestDTO.getRequestOrOffer());

    topic.setAdvertiser(advertiserRepository.getById(1L));

    topic.setTopicValues(topicSaveRequestDTO.getTopicValues()
                                              .stream()
                                              .map(e -> toTopicValue(topic, e))
                                              .collect(Collectors.toList()));

    topicRepository.save(topic);
  }

  private TopicValue toTopicValue(
          Topic topic,
          TopicValueSaveRequestDTO topicValueSaveResponseDTO) {
    TopicValue result = new TopicValue();
    result.setField(fieldRepository.getById(topicValueSaveResponseDTO.getFieldTypeId()));
    result.setTopic(topic);
    result.setValue(topicValueSaveResponseDTO.getValue());
    return result;
  }

  public TopicLoadResponseDTO loadTopic(Long topicId) {
    Topic topic = topicRepository.getById(topicId);

    TopicLoadResponseDTO result = new TopicLoadResponseDTO();
    result.setRequestOrOffer(topic.getRequestOrOffer());
    result.setSubcategoryId(topic.getSubCategory().getSubCategoryId());
    result.setCategoryId(topic.getSubCategory().getCategory().getCategoryId());
    result.setTopicId(topicId);

    result.setTopicValues(topic.getTopicValues()
                               .stream()
                               .sorted((e1, e2) -> e1.getField().getSortNumber() -
                                                   e2.getField().getSortNumber())
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
    topic.setRequestOrOffer(topicSearchRequestDTO.getRequestOrOffer());
    if (topicSearchRequestDTO.getSearchValues() != null) {
      List<TopicValue> collect = topicSearchRequestDTO.getSearchValues().stream().map(value -> {
        return TopicValue.builder().value(value.getValue()).build();
      }).collect(Collectors.toList());
    }

    Example<Topic> exampleTopic = Example.of(topic, ExampleMatcher.matchingAll());
    List<TopicSearchResponseDTO> topicList = topicRepository.findAll(exampleTopic).stream()
        .map(this::toTopicSearchResponseDTO).collect(Collectors.toList());
    result.setTopics(topicList);
    return result;
  }

  private TopicSearchResponseDTO toTopicSearchResponseDTO(Topic topic) {
    TopicSearchResponseDTO result = new TopicSearchResponseDTO();
    result.setTopicId(topic.getTopicId());
    result.setSubcategoryId(topic.getSubCategory().getSubCategoryId());
    result.setSubcategoryKey(topic.getSubCategory().getKey());

    result.setTopicValues(loadTopic(topic.getTopicId()).getTopicValues()
                                                       .stream()
                                                       .map(e -> toTopicSearchValueResponseDTO(topic.getTopicId(), e))
                                                       .collect(Collectors.toList()));

    return result;
  }

  private TopicSearchValueResponseDTO toTopicSearchValueResponseDTO(
          Long topicId,
          TopicValueLoadResponseDTO topicValueLoadResponseDTO) {
    TopicSearchValueResponseDTO result = new TopicSearchValueResponseDTO();
    result.setFieldId(topicValueLoadResponseDTO.getFieldId());
    result.setTopicId(topicId);
    fieldRepository.findAll().stream().filter(field -> field.getFieldId() == topicValueLoadResponseDTO.getFieldId())
        .findAny().ifPresent(field -> {
          result.setKey(field.getKey());
        });

    result.setValue(topicValueLoadResponseDTO.getValue());
    return result;
  }
}
>>>>>>> Stashed changes
