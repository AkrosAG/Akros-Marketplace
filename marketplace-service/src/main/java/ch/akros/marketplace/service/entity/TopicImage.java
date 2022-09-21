package ch.akros.marketplace.service.entity;

import lombok.*;
import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@Entity
@Getter
@Setter
@ToString
@Table(name = "TOPIC_IMAGE")
public class TopicImage {
    @Id
    @Column(name = "TOPIC_IMAGE_ID", unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long topicImageId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(referencedColumnName = "TOPIC_ID", name = "TOPIC_ID",
            foreignKey = @ForeignKey(name = "TOPIC_VALUE_TOPIC_FK"))
    @ToString.Exclude
    private Topic topic;

    @Column(name = "thumbnail")
    private boolean thumbnail = false;

    @Lob
    @Column(name = "value", columnDefinition = "BLOB")
    private byte[] value;
}
