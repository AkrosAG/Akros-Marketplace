
package ch.akros.marketplace.service.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.service.entity.FieldType;

@Repository
public interface FieldTypeRepository extends JpaRepository<FieldType, Long> {
  @Query("select ft from fieldType ft where ft.category.categoryId = :categoryId and ft.searchable=true order by sortNumber")
  List<FieldType> listCategorySearchFieldTypes(Long categoryId);

  @Query("select ft from fieldType ft where ft.category.categoryId = :categoryId and (ft.search=:search or ft.offer!=:search) order by sortNumber")
  List<FieldType> listTopicSearchFieldTypes(Long categoryId, Boolean search);
}
