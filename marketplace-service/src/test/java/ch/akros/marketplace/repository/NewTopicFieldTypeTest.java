
package ch.akros.marketplace.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.api.model.FieldResponseDTO;
import ch.akros.marketplace.service.MarketplaceServiceApplication;
import ch.akros.marketplace.service.entity.Category;
import ch.akros.marketplace.service.repository.CategoryRepository;
import ch.akros.marketplace.service.service.TopicService;

@SpringBootTest
@ContextConfiguration(classes = MarketplaceServiceApplication.class)
@Transactional
public class NewTopicFieldTypeTest {
  @Autowired
  private TopicService       topicService;

  @Autowired
  private CategoryRepository categoryRepository;
//
//  @Test
//  public void listSearchRequestTypeFieldTest() {
//    Category category = categoryRepository.findAll()
//                                          .stream()
//                                          .filter(e -> e.getFields().size() > 0)
//                                          .findFirst()
//                                          .orElse(null);
//    List<FieldTypeResponseDTO> responseDTOList = topicService.listTopicFieldTypes(category.getCategoryId(), "SEARCH");
//
//    assertTrue(responseDTOList.size() > 0);
//  }
//
//  @Test
//  public void listOfferTypeFieldTest() {
//    Category category = categoryRepository.findAll()
//                                          .stream()
//                                          .filter(e -> e.getFields().size() > 0)
//                                          .findFirst()
//                                          .orElse(null);
//    List<FieldTypeResponseDTO> responseDTOList = topicService.listTopicFieldTypes(category.getCategoryId(), "OFFER");
//
//    assertTrue(responseDTOList.size() > 0);
//  }
}