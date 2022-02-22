
package ch.akros.marketplace.service.entity;

import java.time.LocalDate;
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
import javax.persistence.ManyToOne;
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
@Getter
@Setter
@ToString
@Table(name = "TOPIC")
public class Topic {
  @Id
  @Column(name = "TOPIC_ID", unique = true)
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long             topicId;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "ADVERTISER_ID", name = "ADVERTISER_ID",
      foreignKey = @ForeignKey(name = "TOPIC_ADVERTISER_FK"))
  @ToString.Exclude
  private Advertiser       advertiser;


//  TODO CHECK IF ENTIRE CATEGORY IS NEEDED
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(referencedColumnName = "CATEGORY_ID", name = "CATEGORY_ID",
      foreignKey = @ForeignKey(name = "TOPIC_CATEGORY_FK"))
  @ToString.Exclude
  private Category         category;

  @Column(name = "VALID_FROM")
  private LocalDate        validFrom;

  @Column(name = "VALID_TO")
  private LocalDate        validTo;

  @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL)
  private List<TopicValue> topicValues;

  @Column(name = "REQUEST_OR_OFFER")
  private Boolean           requestOrOffer;
}
