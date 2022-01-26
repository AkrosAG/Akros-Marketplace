
package ch.akros.marketplace.dataservice.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import ch.akros.marketplace.api.model.FieldTypeChooseResponseDTO;
import ch.akros.marketplace.api.model.FieldTypeResponseDTO;
import ch.akros.marketplace.api.model.VWCategoryResponseDTO;
import ch.akros.marketplace.dataservice.entity.FieldType;
import ch.akros.marketplace.dataservice.entity.FieldTypeChoose;
import ch.akros.marketplace.dataservice.entity.VWCategory;
import ch.akros.marketplace.dataservice.repository.FieldTypeRepository;
import ch.akros.marketplace.dataservice.repository.VWCategoryRepository;

@Service
public class CategoryService {
  @Autowired
  private VWCategoryRepository vwCategoryRepository;

  @Autowired
  private FieldTypeRepository  fieldTypeRepository;

  public List<VWCategoryResponseDTO> listCategories() {
    return vwCategoryRepository.findAll(Sort.by(Sort.Direction.ASC, "description"))
                               .stream()
                               .map(this::toVWCategoryResponseDTO)
                               .collect(Collectors.toList());
  }

  private VWCategoryResponseDTO toVWCategoryResponseDTO(VWCategory vwCategory) {
    VWCategoryResponseDTO result = new VWCategoryResponseDTO();
    result.setCategoryId(vwCategory.getCategoryId());
    result.setDescription(vwCategory.getDescription());
    result.setOfferCount(vwCategory.getOfferCount());
    result.setSearchCount(vwCategory.getSearchCount());
    return result;
  }

  public List<FieldTypeResponseDTO> listCategorySearchFieldTypes(Long categoryId) {
    return fieldTypeRepository.listCategorySearchFieldTypes(categoryId)
                              .stream()
                              .map(this::toFieldTypeResponseDTO)
                              .collect(Collectors.toList());
  }

  private FieldTypeResponseDTO toFieldTypeResponseDTO(FieldType fieldType) {
    FieldTypeResponseDTO result = new FieldTypeResponseDTO();

    // field type
    result.setCategoryId(fieldType.getCategory().getCategoryId());
    result.setFieldTypeId(fieldType.getFieldTypeId());
    result.setDescription(fieldType.getDescription());
    result.setShortDescription(fieldType.getShortDescription());
    result.setMinValue(fieldType.getMinValue());
    result.setMaxValue(fieldType.getMaxValue());
    result.setSearch(fieldType.isSearch());
    result.setOffer(fieldType.isOffer());

    // field type definition
    result.setFieldTypeDefinitionId(fieldType.getFieldTypeDefinition().getFieldTypeDefinitionId());
    result.setFieldTypeDefinitionDescription(fieldType.getFieldTypeDefinition().getDescription());

    // field type chooses
    result.setFieldTypeChooses(fieldType.getFieldTypeChooses()
                                        .stream()
                                        .sorted((e1, e2) -> e1.getSortNumber() - e2.getSortNumber())
                                        .map(this::toFieldTypeChoosesDTO)
                                        .collect(Collectors.toList()));

    return result;
  }

  private FieldTypeChooseResponseDTO toFieldTypeChoosesDTO(FieldTypeChoose fieldTypeChoose) {
    FieldTypeChooseResponseDTO result = new FieldTypeChooseResponseDTO();
    result.setFieldTypeChooseId(fieldTypeChoose.getFieldTypeChooseId());
    result.setDescription(fieldTypeChoose.getDescription());
    result.setSortNumber(fieldTypeChoose.getSortNumber());
    return result;
  }
}
