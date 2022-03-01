
package ch.akros.marketplace.service.controller;

import java.util.List;

import ch.akros.marketplace.api.ListFieldTypeDefinitionsApi;
import ch.akros.marketplace.api.model.FieldTypeDefinitionDTO;
import ch.akros.marketplace.api.model.FieldTypeDefinitionResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.service.service.FieldTypeDefinitionService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ListFieldTypeDefinitionsController implements ListFieldTypeDefinitionsApi {
  @Autowired
  private FieldTypeDefinitionService fieldTypeDefinitionService;

  @Override
  public ResponseEntity<FieldTypeDefinitionResponseDTO> listFieldTypeDefinitionsGet() {
    try {
      log.debug("ListFieldTypeDefinitionsController.listFieldTypeDefinitionGet() called");

      List<FieldTypeDefinitionDTO> fieldTypeResponseList = fieldTypeDefinitionService.
              listFieldTypeDefinitions();
      FieldTypeDefinitionResponseDTO response = new FieldTypeDefinitionResponseDTO();
      response.setFieldTypes(fieldTypeResponseList);
      return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
