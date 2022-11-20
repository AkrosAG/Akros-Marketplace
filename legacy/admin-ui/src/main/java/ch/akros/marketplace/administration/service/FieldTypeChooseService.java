
package ch.akros.marketplace.administration.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import ch.akros.marketplace.administration.dataservice.entity.FieldTypeChoose;
import ch.akros.marketplace.administration.dataservice.repository.FieldTypeChooseRepository;
import ch.akros.marketplace.administration.dataservice.repository.FieldTypeRepository;

@Service
@Transactional
public class FieldTypeChooseService {
  private FieldTypeChooseRepository fieldTypeChooseRepository;
  private FieldTypeRepository       fieldTypeRepository;

  public FieldTypeChooseService(@Autowired FieldTypeChooseRepository fieldTypeChooseRepository,
                                @Autowired FieldTypeRepository fieldTypeRepository)
  {
    this.fieldTypeChooseRepository = fieldTypeChooseRepository;
    this.fieldTypeRepository = fieldTypeRepository;
  }

  public FieldTypeChoose findById(Long fieldTypeChooseId) {
    return fieldTypeChooseRepository.findById(fieldTypeChooseId).orElse(null);
  }

  public List<FieldTypeChoose> list(Long fieldTypeId) {
    return fieldTypeChooseRepository.listFromFieldType(fieldTypeId);
  }

  public void save(Long fieldTypeId, Long fieldTypeChooseId, String description, Integer sortNumber) {
    if (fieldTypeChooseId != null) {
      FieldTypeChoose fieldTypeChoose = findById(fieldTypeChooseId);

      fieldTypeChoose.setDescription(description);
      fieldTypeChoose.setSortNumber(sortNumber);

      fieldTypeChooseRepository.save(fieldTypeChoose);
    }
    else {
      FieldTypeChoose fieldTypeChoose = new FieldTypeChoose();

      fieldTypeChoose.setFieldType(fieldTypeRepository.getById(fieldTypeId));
      fieldTypeChoose.setDescription(description);
      fieldTypeChoose.setSortNumber(sortNumber);

      fieldTypeChooseRepository.save(fieldTypeChoose);
    }
  }

  public void delete(Long fieldTypeChooseId) {
    fieldTypeChooseRepository.deleteById(fieldTypeChooseId);
  }
}
