
package ch.akros.marketplace.service.controller;

import java.util.List;

import ch.akros.marketplace.api.CategoriesApi;
import ch.akros.marketplace.api.model.CategoryDTO;
import ch.akros.marketplace.api.model.CategoryResponseDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import ch.akros.marketplace.service.service.CategoryService;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
public class CategoryController implements CategoriesApi {
    @Autowired
    private CategoryService categoryService;

    @Override
    public ResponseEntity<CategoryResponseDTO> categoriesGet() {
        try {
            log.debug("CategoryController.categoriesGet() called");

            List<CategoryDTO> categoryDTOList = categoryService.listCategories();
            CategoryResponseDTO response = new CategoryResponseDTO();
            response.setCategories(categoryDTOList);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }
        catch (Exception ex) {
            log.error(ex.getMessage(), ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
