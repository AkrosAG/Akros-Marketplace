
package ch.akros.marketplace.service.repository;

import java.util.List;

import ch.akros.marketplace.service.entity.FieldOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.service.entity.Field;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
  @Query("select ft from field ft join ft.subCategories sc where sc.subCategoryId = :subCategoryId and ft.searchable=true order by ft.sortNumber")
  List<Field> listSubCategorySearchFields(Long subCategoryId);

  @Query("select ft from field ft join ft.subCategories sc where sc.subCategoryId = :subCategoryId and ft.creation = true order by ft.sortNumber")
  List<Field> listSubCategoryCreateFields(Long subCategoryId);

  @Query("select ft from field ft join ft.subCategories sc where sc.subCategoryId = :subCategoryId and (ft.request=:request or ft.offer!=:request) order by sortNumber")
  List<Field> listTopicSearchFields(Long subCategoryId, Boolean request);

  @Query("select op from fieldOption op where op.field.fieldId = :fieldId")
  List<FieldOption> listFieldOptions(Long fieldId);
}
