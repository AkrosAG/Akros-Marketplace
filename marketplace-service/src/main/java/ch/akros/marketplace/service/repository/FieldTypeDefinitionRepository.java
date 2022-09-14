
package ch.akros.marketplace.service.repository;

import ch.akros.marketplace.service.entity.FieldTypeDefinition;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FieldTypeDefinitionRepository extends JpaRepository<FieldTypeDefinition, Integer> {}
