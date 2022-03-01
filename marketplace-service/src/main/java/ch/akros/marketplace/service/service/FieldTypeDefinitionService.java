
package ch.akros.marketplace.service.service;

import java.util.List;
import java.util.stream.Collectors;

import ch.akros.marketplace.api.model.FieldTypeDefinitionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ch.akros.marketplace.api.model.FieldTypeDefinitionResponseDTO;
import ch.akros.marketplace.service.entity.FieldTypeDefinition;
import ch.akros.marketplace.service.repository.FieldTypeDefinitionRepository;

@Service
public class FieldTypeDefinitionService {
  @Autowired
  private FieldTypeDefinitionRepository fieldTypeDefinitionRepository;

  public List<FieldTypeDefinitionDTO> listFieldTypeDefinitions() {
    return fieldTypeDefinitionRepository.findAll(Sort.by(Sort.Direction.ASC, "fieldTypeDefinitionId"))
                                        .stream()
                                        .map(this::toFieldTypeDefinitionDTO)
                                        .collect(Collectors.toList());
  }

  private FieldTypeDefinitionDTO toFieldTypeDefinitionDTO(FieldTypeDefinition fieldTypeDefinition) {
    FieldTypeDefinitionDTO result = new FieldTypeDefinitionDTO();
    result.setFieldTypeDefinitionId(fieldTypeDefinition.getFieldTypeDefinitionId());
    result.setDescription(fieldTypeDefinition.getDescription());
    return result;
  }
}
