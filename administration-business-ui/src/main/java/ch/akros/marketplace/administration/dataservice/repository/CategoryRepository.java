
package ch.akros.marketplace.administration.dataservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ch.akros.marketplace.administration.dataservice.entity.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {}
