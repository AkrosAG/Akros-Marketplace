
package ch.akros.marketplace.repository;

import ch.akros.marketplace.service.MarketplaceServiceApplication;
import ch.akros.marketplace.service.entity.Category;
import ch.akros.marketplace.service.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static org.springframework.test.util.AssertionErrors.assertNotNull;
import static org.springframework.test.util.AssertionErrors.assertTrue;

@SpringBootTest
@ContextConfiguration(classes = MarketplaceServiceApplication.class)
@Slf4j
@Transactional
public class FieldTypeRepositoryTest {
  @Autowired
  private CategoryRepository categoryRepository;

  @Test
  public void allEntriesExistsInFieldTypeDefinition() {
    Category category = categoryRepository.getById(1L);
    assertNotNull("No Categories found", category);
    log.info(String.format("category[id:%d/description:%s/fieldTypeSize:%d]",
                            category.getCategoryId(),
                            category.getKey(),
                            category.getSubCategories().size()));
    List<String> categoriesResult = Arrays.asList("room", "apartment", "house", "parking");
    category.getSubCategories()
            .forEach(e -> assertTrue("Unexpected category: " + e.getKey(), categoriesResult.contains(e.getKey())));
    }
}
