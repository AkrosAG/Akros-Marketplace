
package ch.akros.marketplace.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.ListTopicFieldTypesApi;
import ch.akros.marketplace.api.model.FieldTypeResponseDTO;
import ch.akros.marketplace.service.service.TopicService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ListTopicFieldTypesController implements ListTopicFieldTypesApi {
  @Autowired
  private TopicService topicService;

  @Override
  public ResponseEntity<List<FieldTypeResponseDTO>> listTopicFieldTypesCategoryIdSearchGet(Long categorieId,
                                                                                           String search)
  {
    try {
      log.debug("ListTopicFieldTypesController.listTopicFieldTypesCategoryIdSearchGet() called");

      List<FieldTypeResponseDTO> fieldTypeResponseList = topicService.listTopicFieldTypes(categorieId, search);
      return ResponseEntity.status(HttpStatus.OK).body(fieldTypeResponseList);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
