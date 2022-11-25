package ch.akros.marketplace.service.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Entity
@Getter
@Setter
@ToString
@Table(name = "FIELD_TYPE_DEFINITION")
public class FieldTypeDefinition {
  @Id
  @Column(name = "FIELD_TYPE_DEFINITION_ID", unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Integer fieldTypeDefinitionId;

  @Column(name = "DESCRIPTION")
  private String  description;
}
