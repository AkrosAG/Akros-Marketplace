package ch.akros.marketplace.service.repository;

import ch.akros.marketplace.service.entity.SubCategory;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long> {}
