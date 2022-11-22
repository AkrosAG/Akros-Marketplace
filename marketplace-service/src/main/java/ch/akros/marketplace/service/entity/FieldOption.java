package ch.akros.marketplace.service.entity;

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

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Table(name = "FIELD_OPTION")
@Entity(name = "fieldOption")
public class FieldOption {
  @Id
  @Column(name = "FIELD_OPTION_ID", nullable = false, unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long fieldOptionId;

  @Column(name = "KEY")
  private String key;

  @Column(name = "SORT_NUMBER")
  private int sortNumber;

  @ManyToOne
  @ToString.Exclude
  @JoinColumn(referencedColumnName = "FIELD_ID", name = "FIELD_ID",
      foreignKey = @ForeignKey(name = "FIELD_OPTION_FIELD_FK"))
  private Field field;
}
