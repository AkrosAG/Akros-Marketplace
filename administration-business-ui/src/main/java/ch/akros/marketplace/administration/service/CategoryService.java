
package ch.akros.marketplace.administration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.administration.dataservice.entity.Category;
import ch.akros.marketplace.administration.dataservice.repository.CategoryRepository;

@Service
@Transactional
public class CategoryService {
  private CategoryRepository categoryRepository;

  public CategoryService(@Autowired CategoryRepository categoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  public Category findById(Long categoryId) {
    return categoryRepository.findById(categoryId).orElse(null);
  }

  public List<Category> list() {
    return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "categoryId"));
  }

  public void save(Long categoryId, String description, String shortDescription) {
    if (categoryId != null && categoryId > 0) {
      Category category = categoryRepository.getById(categoryId);
      category.setDescription(description);
      category.setShortDescription(shortDescription);
      categoryRepository.save(category);
    }
    else {
      Category category = new Category();
      category.setDescription(description);
      category.setShortDescription(shortDescription);
      categoryRepository.save(category);
    }
  }

  public void delete(Long categoryId) {
    categoryRepository.deleteById(categoryId);
  }
}
