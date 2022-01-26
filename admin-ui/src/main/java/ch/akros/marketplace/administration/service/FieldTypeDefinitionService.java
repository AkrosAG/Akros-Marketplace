
package ch.akros.marketplace.administration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.administration.dataservice.entity.FieldTypeDefinition;
import ch.akros.marketplace.administration.dataservice.repository.FieldTypeDefinitionRepository;

@Service
@Transactional
public class FieldTypeDefinitionService {
  private FieldTypeDefinitionRepository fieldTypeDefinitionRepository;

  public FieldTypeDefinitionService(@Autowired FieldTypeDefinitionRepository fieldTypeDefinitionRepository) {
    this.fieldTypeDefinitionRepository = fieldTypeDefinitionRepository;
  }

  public FieldTypeDefinition findById(int fieldTypeDefinitionId) {
    return fieldTypeDefinitionRepository.findById(fieldTypeDefinitionId).orElse(null);
  }

  public List<FieldTypeDefinition> list() {
    return fieldTypeDefinitionRepository.findAll(Sort.by(Sort.Direction.ASC, "fieldTypeDefinitionId"));
  }
}
