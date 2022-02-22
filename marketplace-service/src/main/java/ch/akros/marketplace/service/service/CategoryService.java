
package ch.akros.marketplace.service.service;

import java.util.List;
import java.util.stream.Collectors;

import ch.akros.marketplace.api.model.CategoryResponseDTO;
import ch.akros.marketplace.service.entity.Category;
import ch.akros.marketplace.service.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ch.akros.marketplace.api.model.FieldTypeOptionResponseDTO;
import ch.akros.marketplace.api.model.FieldTypeResponseDTO;
import ch.akros.marketplace.service.entity.Field;
import ch.akros.marketplace.service.entity.FieldOption;
import ch.akros.marketplace.service.repository.FieldRepository;

@Service
public class CategoryService {
  @Autowired
  private CategoryRepository categoryRepository;

  @Autowired
  private FieldRepository fieldRepository;

  public List<CategoryResponseDTO> listCategories() {
    List<CategoryResponseDTO> list = categoryRepository.findAll(Sort.by(Sort.Direction.ASC, "key"))
                               .stream()
                               .map(this::toCategoryResponseDTO)
                               .collect(Collectors.toList());
    for (CategoryResponseDTO element : list) {
      List<FieldTypeResponseDTO> fields = listCategorySearchFieldTypes(element.getCategoryId());
      element.setFields(fields);
    }
    return list;
  }

  private CategoryResponseDTO toCategoryResponseDTO(Category category) {
    CategoryResponseDTO result = new CategoryResponseDTO();
    result.setCategoryId(category.getCategoryId());
    result.setKey(category.getKey());


    result.setFields(category.getFields()
            .stream()
            .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
            .map(this::toFieldTypeResponseDTO)
            .collect(Collectors.toList()));


    return result;
  }

    public List<FieldTypeResponseDTO> listCategorySearchFieldTypes(Long categoryId) {
      return fieldRepository.listCategorySearchFieldTypes(categoryId)
                                .stream()
                                .map(this::toFieldTypeResponseDTO)
                                .collect(Collectors.toList());
    }


    private FieldTypeResponseDTO toFieldTypeResponseDTO(Field field) {
      FieldTypeResponseDTO result = new FieldTypeResponseDTO();
      result.setFieldTypeId(field.getFieldId());
      result.setKey(field.getKey());
      result.setMinValue(field.getMinValue());
      result.setMaxValue(field.getMaxValue());
      result.setRequest(field.isRequest());
      result.setOffer(field.isOffer());
      result.setCreate(field.isCreation());
      result.setSortNumber(field.getSortNumber());
      result.setFieldTypeDefinitionId(field.getFieldTypeDefinition().getFieldTypeDefinitionId());
      result.setFieldTypeOptions(field.getFieldOptions()
              .stream()
              .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
              .map(this::toFieldTypeOptionsDTO)
              .collect(Collectors.toList()));
      return result;
    }

  private FieldTypeOptionResponseDTO toFieldTypeOptionsDTO(FieldOption fieldOption) {
    FieldTypeOptionResponseDTO result = new FieldTypeOptionResponseDTO();
    result.setFieldTypeOptionId(fieldOption.getFieldTypeOptionId());
    result.setKey(fieldOption.getKey());
    result.setSortNumber(fieldOption.getSortNumber());
    return result;
  }
}
