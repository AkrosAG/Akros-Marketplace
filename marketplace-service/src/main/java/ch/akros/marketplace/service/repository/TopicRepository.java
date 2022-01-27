
package ch.akros.marketplace.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.service.entity.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {}
