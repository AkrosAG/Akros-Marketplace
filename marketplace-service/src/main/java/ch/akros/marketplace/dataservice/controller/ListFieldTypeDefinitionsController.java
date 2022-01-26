
package ch.akros.marketplace.dataservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.ListFieldTypeDefinitionApi;
import ch.akros.marketplace.api.model.FieldTypeDefinitionResponseDTO;
import ch.akros.marketplace.dataservice.service.FieldTypeDefinitionService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ListFieldTypeDefinitionsController implements ListFieldTypeDefinitionApi {
  @Autowired
  private FieldTypeDefinitionService fieldTypeDefinitionService;

  @Override
  public ResponseEntity<List<FieldTypeDefinitionResponseDTO>> listFieldTypeDefinitionGet() {
    try {
      log.debug("ListFieldTypeDefinitionsController.listFieldTypeDefinitionGet() called");

      List<FieldTypeDefinitionResponseDTO> fieldTypeResponseList = fieldTypeDefinitionService.listFieldTypeDefinitions();
      return ResponseEntity.status(HttpStatus.OK).body(fieldTypeResponseList);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
