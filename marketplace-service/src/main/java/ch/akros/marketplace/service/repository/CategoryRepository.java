
package ch.akros.marketplace.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.service.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {}
