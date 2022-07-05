package ch.akros.marketplace.service.repository;

import ch.akros.marketplace.service.entity.SubCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {
  @Query("from SubCategory sc where sc.subCategoryId = :categoryId")
  List<SubCategory> findByCategoryId(Long categoryId);
}
