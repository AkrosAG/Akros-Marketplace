
package ch.akros.marketplace.dataservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "FIELD_TYPE_CHOOSE")
public class FieldTypeChoose {
  @Id
  @Column(name = "FIELD_TYPE_CHOOSE_ID", nullable = false, unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long      fieldTypeChooseId;

  @Column(name = "DESCRIPTION")
  private String    description;

  @Column(name = "SORT_NUMBER")
  private int       sortNumber;

  @ManyToOne
  @ToString.Exclude
  @JoinColumn(referencedColumnName = "FIELD_TYPE_ID", name = "FIELD_TYPE_ID",
      foreignKey = @ForeignKey(name = "FIELD_TYPE_CHOOSE_FIELD_TYPE_FK"))
  private FieldType fieldType;
}
