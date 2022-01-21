
package ch.akros.marketplace.administration.dataservice.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "KANTON")
public class Kanton {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "KANTON_ID")
  private Long   kantonId;

  @Column(name = "NAME")
  private String name;

  @Column(name = "SHORT_NAME")
  private String shortName;
}
