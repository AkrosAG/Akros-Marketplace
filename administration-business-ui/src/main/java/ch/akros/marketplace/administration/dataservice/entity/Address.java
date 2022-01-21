
package ch.akros.marketplace.administration.dataservice.entity;

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
@Table(name = "ADDRESS")
public class Address {
  @Id
  @Column(name = "ADDRESS_ID", nullable = false, unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long   addressId;

  @ManyToOne
  @ToString.Exclude
  @JoinColumn(referencedColumnName = "KANTON_ID", name = "KANTON_ID",
      foreignKey = @ForeignKey(name = "ADDRESS_KANTON_FK"))
  private Kanton kanton;

  @Column(name = "STREET_NAME")
  private String streetName;

  @Column(name = "STREET_NUMBER")
  private String streetNumber;

  @Column(name = "POSTAL_CODE")
  private String postalCode;

  @Column(name = "CITY")
  private String city;
}
