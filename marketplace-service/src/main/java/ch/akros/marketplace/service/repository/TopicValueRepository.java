package ch.akros.marketplace.service.repository;

import ch.akros.marketplace.service.entity.Topic;
import ch.akros.marketplace.service.entity.TopicValue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicValueRepository extends JpaRepository<TopicValue, Long> {
    void deleteTopicValuesByTopic(Topic topic);
}
