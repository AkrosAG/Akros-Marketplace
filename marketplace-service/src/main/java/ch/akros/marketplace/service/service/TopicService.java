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
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
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

        getLonLatValues(address, postalCode, region);

        return topicValues;
    }


    private void getLonLatValues(String address, String postalCode, String region) {
        String concatenated = address + " " + postalCode + region;


        // create a client
        var client = HttpClient.newHttpClient();

        // create a request
        var request = HttpRequest.newBuilder(
                        URI.create("https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + concatenated))
                        .header("accept", "application/json")
                        .build();

        // use the client to send the request
        var response = client.send(request, new JsonBodyHandler<>(APOD.class));

        // the response:
        System.out.println(response.body().get().title);


        //var url = `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${concatenated}`;

//        xmlhttp.onreadystatechange = function () {
//            if (this.readyState == 4 && this.status == 200) {
//                var myArr = JSON.parse(this.responseText);
//                lonLats.push({"topic_id": result.topic_id, "lon": myArr[0].lon, "lat": myArr[0].lat});
//            }
//        };
//
//
//
//
//
//
//
//        xmlhttp.open("GET", url, true);
//        xmlhttp.send();
//
//  });

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
    if(topicSearchRequestDTO.getSearchValues() != null) {
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
