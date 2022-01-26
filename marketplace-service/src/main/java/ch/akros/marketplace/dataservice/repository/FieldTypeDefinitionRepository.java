
package ch.akros.marketplace.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.dataservice.entity.FieldTypeDefinition;

@Repository
public interface FieldTypeDefinitionRepository extends JpaRepository<FieldTypeDefinition, Integer> {}
