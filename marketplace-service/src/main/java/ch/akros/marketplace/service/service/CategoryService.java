
package ch.akros.marketplace.service.service;

import java.util.List;
import java.util.stream.Collectors;

import ch.akros.marketplace.api.model.CategoryDTO;
import ch.akros.marketplace.api.model.CategoryResponseDTO;
import ch.akros.marketplace.service.entity.Category;
import ch.akros.marketplace.service.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ch.akros.marketplace.api.model.FieldOptionResponseDTO;
import ch.akros.marketplace.api.model.FieldResponseDTO;
import ch.akros.marketplace.service.entity.Field;
import ch.akros.marketplace.service.entity.FieldOption;
import ch.akros.marketplace.service.repository.FieldRepository;

@Service
public class CategoryService {
  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private FieldRepository fieldRepository;

  public List<CategoryDTO> listCategories(Boolean create) {
    List<CategoryDTO> list = categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "key"))
                               .stream()
                               .map(this::toCategoryDTO)
                               .collect(Collectors.toList());
    for (CategoryDTO element : list) {
      List<FieldResponseDTO> categoryFields = null;
      if (create) {
        categoryFields = listCategoryCreateFieldTypes(element.getCategoryId());
      } else {
        categoryFields = listCategorySearchFieldTypes(element.getCategoryId());
      }
      for (FieldResponseDTO field : categoryFields) {
        System.out.println(field.getFieldId());
        List<FieldOptionResponseDTO> options = listFieldOptions(field.getFieldId());
        field.setFieldOptions(options);
      }
      element.setFields(categoryFields);
    }
    return list;
  }

  private CategoryDTO toCategoryDTO(Category category) {
    CategoryDTO result = new CategoryDTO();
    result.setCategoryId(category.getCategoryId());
    result.setKey(category.getKey());


    result.setFields(category.getFields()
            .stream()
            .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
            .map(this::toFieldResponseDTO)
            .collect(Collectors.toList()));


    return result;
  }

  public List<FieldResponseDTO> listCategorySearchFieldTypes(Long categoryId) {
    return fieldRepository.listCategorySearchFields(categoryId)
            .stream()
            .map(this::toFieldResponseDTO)
            .collect(Collectors.toList());
  }

  public List<FieldResponseDTO> listCategoryCreateFieldTypes(Long categoryId) {
    return fieldRepository.listCategoryCreateFields(categoryId)
            .stream()
            .map(this::toFieldResponseDTO)
            .collect(Collectors.toList());
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
