
package ch.akros.marketplace.administration.dataservice.entity;

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

@Entity
@NoArgsConstructor
@Getter
@Setter
@ToString
@Table(name = "VW_CATEGORY")
public class VWCategory {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "CATEGORY_ID")
  private Long   categoryId;

  @Column(name = "DESCRIPTION")
  private String description;

  @Column(name = "SEARCH_COUNT")
  private int    searchCount;

  @Column(name = "OFFER_COUNT")
  private int    offerCount;
}
