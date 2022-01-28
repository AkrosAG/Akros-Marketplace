
package ch.akros.marketplace.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.service.entity.VWCategory;

@Repository
public interface VWCategoryRepository extends JpaRepository<VWCategory, Long> {}
