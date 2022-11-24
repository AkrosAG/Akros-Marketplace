package ch.akros.marketplace.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import ch.akros.marketplace.service.repository.*;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.service.MarketplaceServiceApplication;

@SpringBootTest
@ContextConfiguration(classes = MarketplaceServiceApplication.class)
@Transactional
public class RepositoryTest {

  @Autowired
  private TopicRepository topicRepository;

  @Autowired
  private AdvertiserRepository advertiserRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private FieldRepository fieldRepository;

  @Autowired
  private SubCategoryRepository subCategoryRepository;

  @Test
  public void topicRepositoryTest() {
    assertEquals(0, topicRepository.count());
  }

  @Test
  public void advertiserRepositoryTest() {
    assertEquals(1, advertiserRepository.count());
  }

  @Test
  public void categoryRepositoryTest() {
    assertEquals(2, categoryRepository.count());
  }

  @Test
  public void fieldRepositoryTest() {
    assertEquals(37, fieldRepository.count());
  }

  @Test
  public void subCategoryRepositoryTest() {
    assertEquals(5, subCategoryRepository.count());
  }
}
