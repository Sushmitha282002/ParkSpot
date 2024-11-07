package org.happiest.capstone_microserviceauth.service;




import org.happiest.capstone_microserviceauth.model.PasswordResetToken;
import org.happiest.capstone_microserviceauth.model.Users;
import org.happiest.capstone_microserviceauth.repository.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    @Autowired
    private TokenRepository passwordResetTokenRepository;

    public PasswordResetToken createOrUpdateToken(Users user) {
        PasswordResetToken token = passwordResetTokenRepository.findByUser(user);
        if (token == null) {
            token = new PasswordResetToken();
            token.setUser(user);
        }
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDateTime(LocalDateTime.now().plusMinutes(10)); // Set expiry time as needed
        return passwordResetTokenRepository.save(token);
    }
    
}

