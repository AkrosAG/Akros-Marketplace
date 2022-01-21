
package ch.akros.marketplace.repository;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.dataservice.AkrosMarketplaceDataServiceApplication;
import ch.akros.marketplace.dataservice.entity.Category;
import ch.akros.marketplace.dataservice.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@ContextConfiguration(classes = AkrosMarketplaceDataServiceApplication.class)
@Slf4j
@Transactional
public class FieldTypeRepositoryTest {
  @Autowired
  private CategoryRepository categoryRepository;

  @Test
  public void allEntriesExistsInFieldTypeDefinition() {
    Category category = categoryRepository.getById(1L);

    if (category != null) {
      log.error(String.format("category[id:%d/description:%s/shortDescription:%s/fieldTypeSize:%d]",
                              category.getCategoryId(),
                              category.getDescription(),
                              category.getShortDescription(),
                              category.getFieldTypes().size()));

      category.getFieldTypes()
              .forEach(e -> log.error(String.format("fieldType[id:%d/description:%s/shortDescription:%s/sortNumber:%d/minValue:%d/maxValue:%d/fieldTypeDefinitionId:%d/fieldTypeDefinitionDescription:%s]",
                                                    e.getFieldTypeId(),
                                                    e.getDescription(),
                                                    e.getShortDescription(),
                                                    e.getSortNumber(),
                                                    e.getMinValue(),
                                                    e.getMaxValue(),
                                                    e.getFieldTypeDefinition().getFieldTypeDefinitionId(),
                                                    e.getFieldTypeDefinition().getDescription())));
    }
  }
}
