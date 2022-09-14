
package ch.akros.marketplace.service.entity;

import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Table(name = "FIELD")
@Entity(name = "field")
public class Field {
  @Id
  @Column(name = "FIELD_ID", unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long fieldId;

  @ManyToMany(mappedBy = "fields")
  @ToString.Exclude
  private List<SubCategory> subCategories;

  @Column(name = "KEY")
  private String key;

  @Column(name = "MIN_VALUE")
  private Integer minValue;

  @Column(name = "MAX_VALUE")
  private Integer maxValue;

  @Column(name = "SORT_NUMBER")
  private int sortNumber;

  @Column(name = "REQUIRED")
  private boolean required;

  @Column(name = "SEARCHABLE")
  private boolean searchable;

  @Column(name = "REQUEST")
  private boolean request;

  @Column(name = "OFFER")
  private boolean offer;

  @Column(name = "CREATION")
  private boolean creation;

  @OneToMany(mappedBy = "field", cascade = CascadeType.ALL)
  @ToString.Exclude
  private List<FieldOption> fieldOptions;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "FIELD_TYPE_DEFINITION_ID",
      name = "FIELD_TYPE_DEFINITION_ID",
      foreignKey = @ForeignKey(name = "FIELD_FIELD_TYPE_DEFINITION_FK"))
  @ToString.Exclude
  private FieldTypeDefinition fieldTypeDefinition;
}
