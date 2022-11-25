package ch.akros.marketplace.service.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
  private Long addressId;

  @Column(name = "REGION")
  private String region;

  @Column(name = "STREET_NAME")
  private String streetName;

  @Column(name = "STREET_NUMBER")
  private String streetNumber;

  @Column(name = "POSTAL_CODE")
  private String postalCode;

  @Column(name = "CITY")
  private String city;
}
