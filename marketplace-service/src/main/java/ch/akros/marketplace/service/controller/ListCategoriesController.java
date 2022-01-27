
package ch.akros.marketplace.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.api.ListCategoriesApi;
import ch.akros.marketplace.api.model.VWCategoryResponseDTO;
import ch.akros.marketplace.service.service.CategoryService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class ListCategoriesController implements ListCategoriesApi {
  @Autowired
  private CategoryService categorieService;

  @Override
  public ResponseEntity<List<VWCategoryResponseDTO>> listCategoriesGet() {
    try {
      log.debug("ListCategorieController.listCategoriesGet() called");

      List<VWCategoryResponseDTO> vwCategoryResponseDTOList = categorieService.listCategories();
      return ResponseEntity.status(HttpStatus.OK).body(vwCategoryResponseDTOList);
    }
    catch (Exception ex) {
      log.error(ex.getMessage(), ex);
      return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
  }
}
