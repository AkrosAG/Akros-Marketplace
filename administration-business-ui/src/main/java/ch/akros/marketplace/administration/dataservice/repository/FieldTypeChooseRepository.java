
package ch.akros.marketplace.administration.dataservice.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.administration.dataservice.entity.FieldTypeChoose;

@Repository
public interface FieldTypeChooseRepository extends JpaRepository<FieldTypeChoose, Long> {
  @Query("select ftc from FieldTypeChoose ftc where ftc.fieldType.fieldTypeId = :fieldTypeId order by sortNumber")
  List<FieldTypeChoose> listFromFieldType(Long fieldTypeId);
}
