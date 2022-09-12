package ch.akros.marketplace.service.entity;

import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Getter
@Setter
@ToString
@Table(name = "SUBCATEGORY")
public class SubCategory {
  @Id
  @Column(name = "SUBCATEGORY_ID", unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long subCategoryId;

  @Column(name = "KEY", nullable = false)
  private String key;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "CATEGORY_ID", name = "CATEGORY_ID",
      foreignKey = @ForeignKey(name = "SUBCATEGORY_CATEGORY_FK"))
  @ToString.Exclude
  private Category category;

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
      name = "SUBCATEGORY_FIELD",
      joinColumns = @JoinColumn(name = "SUBCATEGORY_ID"),
      inverseJoinColumns = @JoinColumn(name = "FIELD_ID"))
  @ToString.Exclude
  private List<Field> fields;
}
