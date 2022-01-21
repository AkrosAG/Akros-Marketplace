
package ch.akros.marketplace.dataservice.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.ListCategorySearchFieldTypesApi;
import ch.akros.marketplace.api.model.FieldTypeResponseDTO;
import ch.akros.marketplace.dataservice.service.CategoryService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ListCategorySearchFieldTypesController implements ListCategorySearchFieldTypesApi {
  @Autowired
  private CategoryService categoryService;

  @Override
  public ResponseEntity<List<FieldTypeResponseDTO>> listCategorySearchFieldTypesCategoryIdGet(Long categoryId) {
    try {
      log.debug("ListCategorySearchFieldTypesController.listCategorySearchFieldTypesCategoryIdGet() called");

      List<FieldTypeResponseDTO> fieldTypeResponseList = categoryService.listCategorySearchFieldTypes(categoryId);
      return ResponseEntity.status(HttpStatus.OK).body(fieldTypeResponseList);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }
}
