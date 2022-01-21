
package ch.akros.marketplace.dataservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ch.akros.marketplace.api.model.FieldTypeDefinitionResponseDTO;
import ch.akros.marketplace.dataservice.entity.FieldTypeDefinition;
import ch.akros.marketplace.dataservice.repository.FieldTypeDefinitionRepository;

@Service
public class FieldTypeDefinitionService {
  @Autowired
  private FieldTypeDefinitionRepository fieldTypeDefinitionRepository;

  public List<FieldTypeDefinitionResponseDTO> listFieldTypeDefinitions() {
    return fieldTypeDefinitionRepository.findAll(Sort.by(Sort.Direction.ASC, "fieldTypeDefinitionId"))
                                        .stream()
                                        .map(this::toFieldTypeDefinitionResponseDTO)
                                        .collect(Collectors.toList());
  }

  private FieldTypeDefinitionResponseDTO toFieldTypeDefinitionResponseDTO(FieldTypeDefinition fieldTypeDefinition) {
    FieldTypeDefinitionResponseDTO result = new FieldTypeDefinitionResponseDTO();
    result.setFieldTypeDefinitionId(fieldTypeDefinition.getFieldTypeDefinitionId());
    result.setDescription(fieldTypeDefinition.getDescription());
    return result;
  }
}
