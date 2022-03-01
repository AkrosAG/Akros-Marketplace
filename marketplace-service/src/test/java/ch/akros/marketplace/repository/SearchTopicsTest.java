
package ch.akros.marketplace.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.service.MarketplaceServiceApplication;
import ch.akros.marketplace.service.repository.FieldRepository;
import ch.akros.marketplace.service.repository.TopicRepository;
import ch.akros.marketplace.service.repository.CategoryRepository;
import ch.akros.marketplace.service.service.TopicService;

@SpringBootTest
@ContextConfiguration(classes = MarketplaceServiceApplication.class)
@Transactional
public class SearchTopicsTest {
  @Autowired
  private TopicService         topicService;

  @Autowired
  private TopicRepository      topicRepository;

  @Autowired
  private CategoryRepository CategoryRepository;

  @Autowired
  private FieldRepository fieldRepository;
//
//  @Test
//  public void searchAllTopicsTest() throws IOException {
//    for (VWCategory vwCategory : vwCategoryRepository.findAll()) {
//      TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//      topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//
//      TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//      assertEquals(vwCategory.getOfferCount() + vwCategory.getSearchCount(), responseDTO.getTopics().size());
//    }
//  }
//
//  @Test
//  public void searchAllOfferTopicsTest() throws IOException {
//    for (VWCategory vwCategory : vwCategoryRepository.findAll()) {
//      TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//      topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//      topicSearchRequestDTO.setSearchOrOffer("OFFER");
//
//      TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//      assertEquals(vwCategory.getOfferCount(), responseDTO.getTopics().size());
//    }
//  }
//
//  @Test
//  public void searchAllSearchRequestTopicsTest() throws IOException {
//    for (VWCategory vwCategory : vwCategoryRepository.findAll()) {
//      TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//      topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//      topicSearchRequestDTO.setSearchOrOffer("SEARCH");
//
//      TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//      assertEquals(vwCategory.getSearchCount(), responseDTO.getTopics().size());
//    }
//  }
//
//  @Test
//  public void searchOfferOneArgumentTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          false);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "OFFER".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    for (Topic topic : topicList) {
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .collect(Collectors.toList()))
//      {
//        List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//
//        searchList.add(searchValue);
//
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("OFFER");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertTrue(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  @Test
//  public void searchOfferAllArgumentsTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          false);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "OFFER".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    for (Topic topic : topicList) {
//      List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .collect(Collectors.toList()))
//      {
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//        searchList.add(searchValue);
//      }
//
//      if (searchList.size() > 0) {
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("OFFER");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertTrue(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  @Test
//  public void searchOfferTextFieldEmptyResultTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          false);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "OFFER".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    List<Integer> textFieldDefinitionIds = Arrays.asList(2, 3, 8, 9);
//
//    for (Topic topic : topicList) {
//      List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .filter(e -> textFieldDefinitionIds.contains(e.getFieldType()
//                                                                                             .getFieldTypeDefinition()
//                                                                                             .getFieldTypeDefinitionId()))
//                                               .collect(Collectors.toList()))
//      {
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//        searchValue.setValueVarchar("===" + searchValue.getValueVarchar() + "===");
//        searchList.add(searchValue);
//      }
//
//      if (searchList.size() > 0) {
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("OFFER");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertFalse(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  @Test
//  public void searchOfferNumberFieldEmptyResultTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          false);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "OFFER".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    List<Integer> numberFieldDefinitionIds = Arrays.asList(1, 12);
//
//    for (Topic topic : topicList) {
//      List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .filter(e -> numberFieldDefinitionIds.contains(e.getFieldType()
//                                                                                               .getFieldTypeDefinition()
//                                                                                               .getFieldTypeDefinitionId()))
//                                               .collect(Collectors.toList()))
//      {
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//        searchValue.setValueNumFrom(1000d);
//        searchValue.setValueNumTo(-1000d);
//        searchList.add(searchValue);
//      }
//
//      if (searchList.size() > 0) {
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("OFFER");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertFalse(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  @Test
//  public void searchSearchRequestOneArgumentTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          true);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "SEARCH".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    for (Topic topic : topicList) {
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .collect(Collectors.toList()))
//      {
//        List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//
//        searchList.add(searchValue);
//
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("SEARCH");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertTrue(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  @Test
//  public void searchSearchRequestAllArgumentsTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          true);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "SEARCH".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    for (Topic topic : topicList) {
//      List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .collect(Collectors.toList()))
//      {
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//
//        searchList.add(searchValue);
//      }
//
//      if (searchList.size() > 0) {
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("SEARCH");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertTrue(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  @Test
//  public void searchSearchRequestTextFieldEmptyResultTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          true);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "SEARCH".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    List<Integer> textFieldDefinitionIds = Arrays.asList(2, 3, 8, 9);
//
//    for (Topic topic : topicList) {
//      List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .filter(e -> textFieldDefinitionIds.contains(e.getFieldType()
//                                                                                             .getFieldTypeDefinition()
//                                                                                             .getFieldTypeDefinitionId()))
//                                               .collect(Collectors.toList()))
//      {
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//        searchValue.setValueVarchar("===" + searchValue.getValueVarchar() + "===");
//        searchList.add(searchValue);
//      }
//
//      if (searchList.size() > 0) {
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("SEARCH");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertFalse(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  @Test
//  public void searchSearchRequestNumberFieldEmptyResultTest() throws IOException {
//    VWCategory vwCategory = vwCategoryRepository.findAll()
//                                                .stream()
//                                                .filter(e -> e.getOfferCount() > 0)
//                                                .findFirst()
//                                                .orElse(null);
//
//    List<FieldType> offerSearchFieldTypes = fieldTypeRepository.listTopicSearchFieldTypes(vwCategory.getCategoryId(),
//                                                                                          true);
//    List<Long> offerFieldTypeIds = offerSearchFieldTypes.stream()
//                                                        .map(e -> e.getFieldTypeId())
//                                                        .collect(Collectors.toList());
//
//    List<Topic> topicList = topicRepository.findAll()
//                                           .stream()
//                                           .filter(e -> e.getCategory().getCategoryId() == vwCategory.getCategoryId())
//                                           .filter(e -> "SEARCH".equals(e.getSearchOrOffer()))
//                                           .collect(Collectors.toList());
//
//    List<Integer> numberFieldDefinitionIds = Arrays.asList(1, 12);
//
//    for (Topic topic : topicList) {
//      List<TopicSearchFieldTypeValuesRequestDTO> searchList = new ArrayList<>();
//
//      for (TopicValue search4TopicValue : topic.getTopicValues()
//                                               .stream()
//                                               .filter(e -> offerFieldTypeIds.contains(e.getFieldType()
//                                                                                        .getFieldTypeId()))
//                                               .filter(e -> numberFieldDefinitionIds.contains(e.getFieldType()
//                                                                                               .getFieldTypeDefinition()
//                                                                                               .getFieldTypeDefinitionId()))
//                                               .collect(Collectors.toList()))
//      {
//        TopicSearchFieldTypeValuesRequestDTO searchValue = getTopicSearchFieldTypeValue(search4TopicValue);
//        searchValue.setValueNumFrom(1000d);
//        searchValue.setValueNumTo(-1000d);
//        searchList.add(searchValue);
//      }
//
//      if (searchList.size() > 0) {
//        TopicSearchRequestDTO topicSearchRequestDTO = new TopicSearchRequestDTO();
//        topicSearchRequestDTO.setSearchValues(searchList);
//        topicSearchRequestDTO.setCategoryId(vwCategory.getCategoryId());
//        topicSearchRequestDTO.setSearchOrOffer("SEARCH");
//        TopicSearchListResponseDTO responseDTO = topicService.searchTopic(topicSearchRequestDTO);
//
//        List<Long> foundTopcis = responseDTO.getTopics().stream().map(e -> e.getTopicId()).collect(Collectors.toList());
//
//        assertFalse(foundTopcis.contains(topic.getTopicId()));
//      }
//    }
//  }
//
//  private TopicSearchFieldTypeValuesRequestDTO getTopicSearchFieldTypeValue(TopicValue search4TopicValue) {
//    TopicSearchFieldTypeValuesRequestDTO searchValue = new TopicSearchFieldTypeValuesRequestDTO();
//
//    searchValue.setFieldTypeId(search4TopicValue.getFieldType().getFieldTypeId());
//
//    switch (EFieldTypeDefinition.values()[fieldTypeRepository.getById(search4TopicValue.getFieldType().getFieldTypeId())
//                                                             .getFieldTypeDefinition()
//                                                             .getFieldTypeDefinitionId()]) {
//      case BOOLEAN: {
//        searchValue.setValueBoolean(search4TopicValue.getValueBoolean());
//        break;
//      }
//
//      case CHOOSE_MULTI_OPTION: {
//        searchValue.setValueNumFrom(search4TopicValue.getValueNum());
//        searchValue.setValueNumTo(search4TopicValue.getValueNum());
//        break;
//      }
//
//      case CHOOSE_SINGLE_OPTION: {
//        searchValue.setValueNumFrom(search4TopicValue.getValueNum());
//        searchValue.setValueNumTo(search4TopicValue.getValueNum());
//        break;
//      }
//
//      case DATE: {
//        searchValue.setValueDate(search4TopicValue.getValueDate());
//        break;
//      }
//
//      case EMAIL: {
//        searchValue.setValueVarchar(search4TopicValue.getValueVarchar());
//        break;
//      }
//
//      case NUMBER: {
//        searchValue.setValueNumFrom(search4TopicValue.getValueNum());
//        searchValue.setValueNumTo(search4TopicValue.getValueNum());
//        break;
//      }
//
//      case PHONE_NUMBER: {
//        searchValue.setValueVarchar(search4TopicValue.getValueVarchar());
//        break;
//      }
//
//      case PICTURE: {
//        break;
//      }
//
//      case PRICE: {
//        searchValue.setValueNumFrom(search4TopicValue.getValueNum());
//        searchValue.setValueNumTo(search4TopicValue.getValueNum());
//        break;
//      }
//
//      case TEXT_MULTI_LINE: {
//        searchValue.setValueVarchar(search4TopicValue.getValueVarchar());
//        break;
//      }
//
//      case TEXT_SINGLE_LINE: {
//        searchValue.setValueVarchar(search4TopicValue.getValueVarchar());
//        break;
//      }
//
//      default:
//        break;
//    }
//
//    return searchValue;
//  }
}