
package ch.akros.marketplace.dataservice.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.ForeignKey;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
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
@Table(name = "TOPIC_VALUE")
public class TopicValue {
  @Id
  @Column(name = "TOPIC_VALUE_ID", unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long      topicValueId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "TOPIC_ID", name = "TOPIC_ID",
      foreignKey = @ForeignKey(name = "TOPIC_VALUE_TOPIC_FK"))
  @ToString.Exclude
  private Topic     topic;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "CATEGORY_ID", name = "CATEGORY_ID",
      foreignKey = @ForeignKey(name = "TOPIC_VALUE_CATEGORY_FK"))
  @ToString.Exclude
  private Category  category;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "FIELD_TYPE_ID", name = "FIELD_TYPE_ID",
      foreignKey = @ForeignKey(name = "TOPIC_VALUE_FIELD_TYPE_FK"))
  @ToString.Exclude
  private FieldType fieldType;

  @Column(name = "VALUE_NUM")
  private Double    valueNum;

  @Column(name = "VALUE_VARCHAR")
  private String    valueVarchar;

  @Column(name = "VALUE_DATE")
  private LocalDate valueDate;

  @Column(name = "VALUE_BOOLEAN")
  private Boolean   valueBoolean;
}
