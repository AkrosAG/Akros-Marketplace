
package ch.akros.marketplace.administration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.administration.dataservice.entity.FieldType;
import ch.akros.marketplace.administration.dataservice.repository.CategoryRepository;
import ch.akros.marketplace.administration.dataservice.repository.FieldTypeDefinitionRepository;
import ch.akros.marketplace.administration.dataservice.repository.FieldTypeRepository;

@Service
@Transactional
public class FieldTypeService {
  private FieldTypeRepository           fieldTypeRepository;
  private FieldTypeDefinitionRepository fieldTypeDefinitionRepository;
  private CategoryRepository            categoryRepository;

  public FieldTypeService(@Autowired FieldTypeRepository fieldTypeRepository,
                          @Autowired FieldTypeDefinitionRepository fieldTypeDefinitionRepository,
                          @Autowired CategoryRepository categoryRepository)
  {
    this.fieldTypeRepository = fieldTypeRepository;
    this.fieldTypeDefinitionRepository = fieldTypeDefinitionRepository;
    this.categoryRepository = categoryRepository;
  }

  public FieldType findById(Long fieldTypeId) {
    return fieldTypeRepository.findById(fieldTypeId).orElse(null);
  }

  public List<FieldType> list(Long categoryId) {
    return fieldTypeRepository.listCategoryFieldTypes(categoryId);
  }

  public void save(Long categoryId,
                   Long fieldTypeId,
                   String description,
                   String shortDescription,
                   Integer minValue,
                   Integer maxValue,
                   Integer sortNumber,
                   boolean required,
                   boolean searchable,
                   boolean search,
                   boolean offer,
                   Integer fieldTypeDefinitionId)
  {
    if (fieldTypeId != null) {
      FieldType fieldType = findById(fieldTypeId);

      fieldType.setDescription(description);
      fieldType.setShortDescription(shortDescription);
      fieldType.setMinValue(minValue);
      fieldType.setMaxValue(maxValue);
      fieldType.setSortNumber(sortNumber);
      fieldType.setRequired(required);
      fieldType.setSearchable(searchable);
      fieldType.setSearch(search);
      fieldType.setOffer(offer);
      fieldType.setFieldTypeDefinition(fieldTypeDefinitionRepository.getById(fieldTypeDefinitionId));

      fieldTypeRepository.save(fieldType);
    }
    else {
      FieldType fieldType = new FieldType();

      fieldType.setCategory(categoryRepository.getById(categoryId));
      fieldType.setDescription(description);
      fieldType.setShortDescription(shortDescription);
      fieldType.setMinValue(minValue);
      fieldType.setMaxValue(maxValue);
      fieldType.setSortNumber(sortNumber);
      fieldType.setRequired(required);
      fieldType.setSearchable(searchable);
      fieldType.setSearch(search);
      fieldType.setOffer(offer);
      fieldType.setFieldTypeDefinition(fieldTypeDefinitionRepository.getById(fieldTypeDefinitionId));

      fieldTypeRepository.save(fieldType);
    }
  }

  public void delete(Long fieldTypeId) {
    fieldTypeRepository.deleteById(fieldTypeId);
  }
}
