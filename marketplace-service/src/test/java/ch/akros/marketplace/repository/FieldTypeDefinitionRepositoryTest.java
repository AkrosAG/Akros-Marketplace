
package ch.akros.marketplace.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.service.MarketplaceServiceApplication;
import ch.akros.marketplace.service.repository.FieldTypeDefinitionRepository;

@SpringBootTest
@ContextConfiguration(classes = MarketplaceServiceApplication.class)
@Transactional
public class FieldTypeDefinitionRepositoryTest {
  @Autowired
  private FieldTypeDefinitionRepository fieldTypeDefinitionRepository;

  @Test
  public void allEntriesExistsInFieldTypeDefinition() {
    assertEquals(12, fieldTypeDefinitionRepository.count());
  }
}
