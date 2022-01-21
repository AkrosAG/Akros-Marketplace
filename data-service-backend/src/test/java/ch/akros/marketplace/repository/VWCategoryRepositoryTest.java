
package ch.akros.marketplace.repository;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.dataservice.AkrosMarketplaceDataServiceApplication;
import ch.akros.marketplace.dataservice.entity.VWCategory;
import ch.akros.marketplace.dataservice.repository.VWCategoryRepository;

@SpringBootTest
@ContextConfiguration(classes = AkrosMarketplaceDataServiceApplication.class)
@Transactional
public class VWCategoryRepositoryTest {
  @Autowired
  private VWCategoryRepository vwCategoryRepository;

  @Test
  public void allEntriesExistsInFieldTypeDefinition() {
    List<VWCategory> vwCategoryList = vwCategoryRepository.findAll();
    assertTrue(vwCategoryList.size() > 0);
  }
}