
package ch.akros.marketplace.administration.dataservice.entity;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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
@Setter
@Getter
@ToString
@Table(name = "ADVERTISER")
public class Advertiser {
  @Id
  @Column(name = "ADVERTISER_ID", nullable = false, unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long        advertiserId;

  @Column(name = "FIRST_NAME")
  private String      firstName;

  @Column(name = "SURENAME")
  private String      sureName;

  @Column(name = "EMAIL")
  private String      email;

  @Column(name = "PHONE_NUMBER")
  private String      phoneNumber;

  @OneToMany(mappedBy = "topicId", cascade = CascadeType.ALL)
  private List<Topic> topics;
}
