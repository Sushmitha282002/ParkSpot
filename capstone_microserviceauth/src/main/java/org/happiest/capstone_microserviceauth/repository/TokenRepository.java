package org.happiest.capstone_microserviceauth.repository;





import org.happiest.capstone_microserviceauth.model.PasswordResetToken;
import org.happiest.capstone_microserviceauth.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    PasswordResetToken findByUser(Users user);
}

