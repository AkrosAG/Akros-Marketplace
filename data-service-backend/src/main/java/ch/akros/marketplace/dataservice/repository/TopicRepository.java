
package ch.akros.marketplace.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.dataservice.entity.Topic;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {}
