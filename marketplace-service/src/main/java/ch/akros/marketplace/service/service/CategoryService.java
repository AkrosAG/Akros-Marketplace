
package ch.akros.marketplace.service.service;

import ch.akros.marketplace.api.model.CategoryDTO;
import ch.akros.marketplace.api.model.FieldOptionResponseDTO;
import ch.akros.marketplace.api.model.FieldResponseDTO;
import ch.akros.marketplace.api.model.SubCategoryDTO;
import ch.akros.marketplace.service.entity.Category;
import ch.akros.marketplace.service.entity.Field;
import ch.akros.marketplace.service.entity.FieldOption;
import ch.akros.marketplace.service.entity.SubCategory;
import ch.akros.marketplace.service.repository.CategoryRepository;
import ch.akros.marketplace.service.repository.FieldRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
  private final CategoryRepository categoryRepository;
  private final FieldRepository fieldRepository;

  public CategoryService(
      CategoryRepository categoryRepository,
      FieldRepository fieldRepository) {
    this.categoryRepository = categoryRepository;
    this.fieldRepository = fieldRepository;
  }

  public List<CategoryDTO> listCategories(Boolean create) {
    return categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "key"))
      .stream()
      .map(category -> {
        List<SubCategory> subCategories = category.getSubCategories();
        for (SubCategory subCategory : subCategories) {
          if (Boolean.TRUE.equals(create)) {
            subCategory.setFields(fieldRepository.listSubCategoryCreateFields(subCategory.getSubCategoryId()));
          } else {
            subCategory.setFields(fieldRepository.listSubCategorySearchFields(subCategory.getSubCategoryId()));
          }
        }

        return category;
      })
      .map(this::toCategoryDTO)
      .collect(Collectors.toList());
  }

  private CategoryDTO toCategoryDTO(Category category) {
    CategoryDTO result = new CategoryDTO();
    result.setCategoryId(category.getCategoryId());
    result.setKey(category.getKey());
    result.setSubCategories(category.getSubCategories()
            .stream()
            .map(this::toSubCategoryDTO)
            .collect(Collectors.toList())
    );

    return result;
  }

  private SubCategoryDTO toSubCategoryDTO(SubCategory subCategory) {
    SubCategoryDTO result = new SubCategoryDTO();
    result.setSubcategoryId(subCategory.getSubCategoryId());
    result.setKey(subCategory.getKey());
    result.setFields(subCategory.getFields()
            .stream()
            .map(this::toFieldResponseDTO)
            .collect(Collectors.toList()));

    return result;
  }

  private FieldResponseDTO toFieldResponseDTO(Field field) {
    FieldResponseDTO result = new FieldResponseDTO();
    result.setFieldId(field.getFieldId());
    result.setKey(field.getKey());
    result.setMinValue(field.getMinValue());
    result.setMaxValue(field.getMaxValue());
    result.setSearchable(field.isSearchable());
    result.setRequest(field.isRequest());
    result.setOffer(field.isOffer());
    result.setCreation(field.isCreation());
    result.setSortNumber(field.getSortNumber());
    result.setRequired(field.isRequired());
    result.setFieldTypeDefinitionId(field.getFieldTypeDefinition().getFieldTypeDefinitionId());
    result.setFieldOptions(field.getFieldOptions()
            .stream()
            .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
            .map(this::toFieldOptionsDTO)
            .collect(Collectors.toList()));
    return result;
  }

  public List<FieldOptionResponseDTO> listFieldOptions(Long fieldId) {
    return fieldRepository.listFieldOptions(fieldId)
            .stream()
            .map(this::toFieldOptionsDTO)
            .collect(Collectors.toList());
  }

  private FieldOptionResponseDTO toFieldOptionsDTO(FieldOption fieldOption) {
    FieldOptionResponseDTO result = new FieldOptionResponseDTO();
    result.setFieldOptionId(fieldOption.getFieldOptionId());
    result.setKey(fieldOption.getKey());
    result.setSortNumber(fieldOption.getSortNumber());
    return result;
  }
}
