
package ch.akros.marketplace.service.repository;

import ch.akros.marketplace.service.entity.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {

    List<Topic> findAllByUserId(String userId);
}
