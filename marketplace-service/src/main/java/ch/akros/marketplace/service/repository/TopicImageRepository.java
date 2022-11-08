package ch.akros.marketplace.service.repository;

import ch.akros.marketplace.service.entity.Topic;
import ch.akros.marketplace.service.entity.TopicImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicImageRepository extends JpaRepository<TopicImage, Long> {
    void deleteTopicImagesByTopic(Topic topic);
}
