package ch.akros.marketplace.service.service;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import ch.akros.marketplace.service.repository.*;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ch.akros.marketplace.api.model.FieldOptionResponseDTO;
import ch.akros.marketplace.api.model.FieldResponseDTO;
import ch.akros.marketplace.api.model.TopicImageDTO;
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
import ch.akros.marketplace.service.entity.TopicImage;
import ch.akros.marketplace.service.entity.TopicValue;
import ch.akros.marketplace.service.model.LatLon;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.EntityNotFoundException;

@Service
@Slf4j
public class TopicService {

  private static final String LAT_LON_API_SEARCH_URL = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=";
  private final FieldRepository fieldRepository;
  private final AdvertiserRepository advertiserRepository;
  private final TopicRepository topicRepository;
  private final TopicValueRepository topicValueRepository;

  private final TopicImageRepository topicImageRepository;
  private final SubCategoryRepository subCategoryRepository;

  private final int SIZE = 8;
  private final int PRICE = 6;
  private final int FROM_SIZE = 25;
  private final int TO_PRICE = 24;

  private final int DATE = 15;
  private final int FROM_DATE = 19;

  private final int FURNISHED = 14;

  public TopicService(
      FieldRepository fieldRepository,
      AdvertiserRepository advertiserRepository,
      TopicRepository topicRepository,
      SubCategoryRepository subCategoryRepository,
      TopicImageRepository topicImageRepository,
      TopicValueRepository topicValueRepository) {
    this.fieldRepository = fieldRepository;
    this.advertiserRepository = advertiserRepository;
    this.topicRepository = topicRepository;
    this.subCategoryRepository = subCategoryRepository;
    this.topicImageRepository = topicImageRepository;
    this.topicValueRepository = topicValueRepository;
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

    public void saveTopic(String json, MultipartFile[] files, MultipartFile thumbnail) throws IOException {
        TopicSaveRequestDTO topicSaveRequestDTO = deserializeStringToTopicSaveRequestDTO(json);
        Topic topic = new Topic();
        topic.setUserId(topicSaveRequestDTO.getUserId());
        topic.setTopicId(topicSaveRequestDTO.getTopicId());
        final SubCategory subCategory = subCategoryRepository.getById(topicSaveRequestDTO.getSubcategoryId());
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

        List<TopicImage> topicImages = new ArrayList<>();
        if (files != null) {
            topicImages.addAll(getTopicImages(topic, files));
        }
        if (thumbnail != null) {
            topicImages.add(createThumbnailFromMultipartFile(topic, thumbnail));
        }

        topic.setTopicImages(topicImages);
        topicRepository.save(topic);
    }

    private TopicImage createThumbnailFromMultipartFile(Topic topic, MultipartFile thumbnail) throws IOException {
        TopicImage topicImage = new TopicImage();
        topicImage.setTopic(topic);
        topicImage.setThumbnail(true);
        topicImage.setValue(thumbnail.getBytes());
        return topicImage;
    }

    private List<TopicImage> getTopicImages(Topic topic, MultipartFile[] files) throws IOException {
        List<TopicImage> topicImages = new ArrayList<>();
        for (MultipartFile file : files) {
            TopicImage topicImage = new TopicImage();
            topicImage.setTopic(topic);
            topicImage.setThumbnail(false);
            topicImage.setValue(file.getBytes());
            topicImages.add(topicImage);
        }
        return topicImages;
    }

    private TopicSaveRequestDTO deserializeStringToTopicSaveRequestDTO(String json) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(json, TopicSaveRequestDTO.class);
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
        String concatenated = address + "%20" + postalCode + "%20" + region;
        String formattedAddress = concatenated.replace(" ", "%20");
        URL url;
        HttpURLConnection con = null;
        try {
            url =  new URL(LAT_LON_API_SEARCH_URL + formattedAddress);
            con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("Content-Type", "application/json; charset=utf-8");
            int responseCode = con.getResponseCode();

            if (responseCode == HttpURLConnection.HTTP_OK) {
                InputStream responseStream = con.getInputStream();
                ObjectMapper mapper = new ObjectMapper();
                return mapper.readValue(responseStream, LatLon[].class);
            } else {
                return getDefaultLonLatValues();
            }
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

    @Transactional
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
        result.setTopicImages(getTopicImageDtosFromImages(topic.getTopicImages()));
        return result;
    }

    @Transactional
    public List<TopicLoadResponseDTO> loadTopicsForUser(String userId) {
        List<Topic> topics = topicRepository.findAllByUserId(userId);
        List<TopicLoadResponseDTO> result = new ArrayList<>();
        for (Topic topic : topics) {
            TopicLoadResponseDTO topicLoadResponseDTO = new TopicLoadResponseDTO();
            topicLoadResponseDTO.setRequestOrOffer(topic.getRequestOrOffer());
            topicLoadResponseDTO.setSubcategoryId(topic.getSubCategory().getSubCategoryId());
            topicLoadResponseDTO.setCategoryId(topic.getSubCategory().getCategory().getCategoryId());
            topicLoadResponseDTO.setTopicId(topic.getTopicId());

            topicLoadResponseDTO.setTopicValues(topic.getTopicValues()
                    .stream()
                    .map(this::toTopicValueLoadResponseDTO)
                    .collect(Collectors.toList()));
            if (topic.getTopicImages().size() != 0) {
                topicLoadResponseDTO.setTopicImages(getTopicImageDtosFromImages(topic.getTopicImages()));
            }

            result.add(topicLoadResponseDTO);
        }
        return result;
    }

    private List<TopicImageDTO> getTopicImageDtosFromImages(List<TopicImage> topicImages) {
        List<TopicImageDTO> topicImageDTOS = new ArrayList<>();
        for (TopicImage image : topicImages) {
            TopicImageDTO dto = new TopicImageDTO();
            dto.setThumbnail(image.isThumbnail());
            dto.setValue(image.getValue());
            dto.setTopicImageId(image.getTopicImageId());
            topicImageDTOS.add(dto);
        }
        return topicImageDTOS;
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

    @Transactional
    public void deleteTopic(Long topicId) {
      Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new EntityNotFoundException("No topic with ID: " + topicId));
      topicImageRepository.deleteTopicImagesByTopic(topic);
      topicValueRepository.deleteTopicValuesByTopic(topic);
      topicRepository.delete(topic);
    }

    /**
     * Searches through the topic repository and get all topics corresponding
     * to requested search parameters: subCategory and requestOrOffer.
     * Then the output list is filtered according to the given search values: from_size and to_price.
     * This implementation ignores radius, as search value parameter.
     *
     * @param topicSearchRequestDTO has multiple search parameters. One of them is topic_values,
     *                              which it is optional and contains search fields: from_size, to_price and radius.
     *
     * @return List of filtered
     */
    @Transactional
  public TopicSearchListResponseDTO searchTopic(TopicSearchRequestDTO topicSearchRequestDTO) {
        TopicSearchListResponseDTO result = new TopicSearchListResponseDTO();

        List<TopicValue> topicValues = Collections.emptyList();
        if (topicSearchRequestDTO.getSearchValues() != null) {
            topicValues = topicSearchRequestDTO.getSearchValues().stream()
                    .map(value -> TopicValue.builder()
                            .value(value.getValue())
                            .topicValueId(value.getFieldId())
                            .build())
                    .collect(Collectors.toList());
        }

        Topic topic = Topic.builder()
                .requestOrOffer(topicSearchRequestDTO.getRequestOrOffer())
                .subCategory(SubCategory.builder()
                        .subCategoryId(topicSearchRequestDTO.getSubcategoryId())
                        .build())
                .build();
   

        Example<Topic> exampleTopic = Example.of(topic, ExampleMatcher.matchingAll());
        List<TopicSearchResponseDTO> topicList = topicRepository.findAll(exampleTopic).stream()
                .map(this::toTopicSearchResponseDTO)
                .collect(Collectors.toList());

        for (TopicValue topicValue : topicValues) {

            if (topicValue.getTopicValueId() == FROM_SIZE) {
                topicList = filterTopicsByFromSize(topicValue.getValue(), topicList);
            }

            if (topicValue.getTopicValueId() == TO_PRICE) {
                topicList = filterTopicsByToPrice(topicValue.getValue(), topicList);
            }

            if (topicValue.getTopicValueId() == FROM_DATE) {
                topicList = filterTopicsByFromDate(topicValue.getValue(), topicList);
            }

            if (topicValue.getTopicValueId() == FURNISHED) {
                topicList = filterTopicsByFurnished (topicValue.getValue(), topicList);
            }
        }

        result.setTopics(topicList);
        return result;
    }

    private List<TopicSearchResponseDTO> filterTopicsByFromSize(String topicValueFromSize,
                                                                List<TopicSearchResponseDTO> topicList) {
        try {
            long fromSize = Long.parseLong(topicValueFromSize);

            return topicList
                    .stream()
                    .filter(topic -> topic.getTopicValues()
                            .stream()
                            .filter(topicValue -> topicValue.getFieldId() == SIZE)
                            .anyMatch(topicValue -> Long.parseLong(topicValue.getValue()) >= fromSize))
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(), e);
        }
        return topicList;
    }

    private List<TopicSearchResponseDTO> filterTopicsByToPrice(String topicValueToPrice,
                                                               List<TopicSearchResponseDTO> topicList) {
        try {
            long toPrice = Long.parseLong(topicValueToPrice);

            return topicList
                    .stream()
                    .filter(topic -> topic.getTopicValues()
                            .stream()
                            .filter(topicValue -> topicValue.getFieldId() == PRICE)
                            .anyMatch(topicValue -> Long.parseLong(topicValue.getValue()) <= toPrice))
                    .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
            log.error(e.getMessage(), e);
        }
        return topicList;
    }

    private List<TopicSearchResponseDTO> filterTopicsByFromDate(String topicValueFromDate, 
                   List<TopicSearchResponseDTO> topicList) {
        
        LocalDate fromDate = LocalDate.parse(topicValueFromDate);
        try {

        return topicList
        .stream()
        .filter(topic -> topic.getTopicValues()
        .stream()
        .filter(topicValue -> topicValue.getFieldId() == DATE)
        .anyMatch(topicValue -> LocalDate.parse(topicValue.getValue()).compareTo(fromDate) >= 0))
        .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
        log.error(e.getMessage(), e);
        }
        return topicList;
    }

    private List<TopicSearchResponseDTO> filterTopicsByFurnished(String topicValueIsFurnished,
                       List<TopicSearchResponseDTO> topicList) {
        try {
        
        boolean isFurnished = Boolean.parseBoolean(topicValueIsFurnished);
        return topicList
        .stream()
        .filter(topic -> topic.getTopicValues()
        .stream()
        .filter(topicValue -> topicValue.getFieldId() == FURNISHED)
        .anyMatch(topicValue -> Boolean.parseBoolean(topicValue.getValue()) == isFurnished))
        .collect(Collectors.toList());
        } catch (IllegalArgumentException e) {
        log.error(e.getMessage(), e);
        }
        return topicList;
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

        result.setTopicImages(generateTopicImages(topic.getTopicImages()));
        return result;
    }

    private TopicSearchValueResponseDTO toTopicSearchValueResponseDTO(
            Long topicId,
            TopicValueLoadResponseDTO topicValueLoadResponseDTO) {
        TopicSearchValueResponseDTO result = new TopicSearchValueResponseDTO();
        result.setFieldId(topicValueLoadResponseDTO.getFieldId());
        result.setTopicId(topicId);
        fieldRepository.findAll().stream().filter(field -> Objects.equals(field.getFieldId(),
                        topicValueLoadResponseDTO
                                .getFieldId()))
                .findAny()
                .ifPresent(field -> result.setKey(field.getKey()));

        result.setValue(topicValueLoadResponseDTO.getValue());
        return result;
    }

    @Transactional
    public TopicSearchListResponseDTO findAllTopics() {
        TopicSearchListResponseDTO topicSearchListResponseDTO = new TopicSearchListResponseDTO();
        List<Topic> topics = topicRepository.findAll();
        for (Topic topic : topics) {
            TopicSearchResponseDTO result = new TopicSearchResponseDTO();
            result.setTopicId(topic.getTopicId());
            result.setSubcategoryId(topic.getSubCategory().getSubCategoryId());
            result.setSubcategoryKey(topic.getSubCategory().getKey());
            result.setTopicValues(generateTopicValues(topic.getTopicValues()));
            result.setTopicImages(generateTopicImages(topic.getTopicImages()));
            topicSearchListResponseDTO.addTopicsItem(result);
        }
        return topicSearchListResponseDTO;
    }

    private List<TopicImageDTO> generateTopicImages(List<TopicImage> topicImages) {
        List<TopicImageDTO> topicImageList = new ArrayList<>();
        if (topicImages.size() == 0) {
            return topicImageList;
        }
        for (TopicImage image : topicImages) {
            TopicImageDTO dto = new TopicImageDTO();
            dto.setTopicImageId(image.getTopicImageId());
            dto.setTopicId(image.getTopic().getTopicId());
            dto.setThumbnail(image.isThumbnail());
            dto.setValue(image.getValue());
            topicImageList.add(dto);
        }
        return topicImageList;
    }

    private List<TopicSearchValueResponseDTO> generateTopicValues(List<TopicValue> topicValues) {
        List<TopicSearchValueResponseDTO> topicSearchValueResponseDTOList = new ArrayList<>();
        for (TopicValue value : topicValues) {
            TopicSearchValueResponseDTO topicSearchValueResponseDTO = new TopicSearchValueResponseDTO();
            topicSearchValueResponseDTO.setTopicId(value.getTopic().getTopicId());
            topicSearchValueResponseDTO.setFieldId(value.getField().getFieldId());
            topicSearchValueResponseDTO.setKey(value.getField().getKey());
            topicSearchValueResponseDTO.setValue(value.getValue());
            topicSearchValueResponseDTOList.add(topicSearchValueResponseDTO);
        }
        return topicSearchValueResponseDTOList;
    }
}
