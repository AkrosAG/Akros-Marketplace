package ch.akros.am.authservice.repo;

import ch.akros.am.authservice.model.Userdata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Userdata, Long> {

    Userdata findByEmail(String email);

    boolean existsByEmail(String email);

}
