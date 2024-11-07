package org.happiest.capstone_microserviceauth.service;

import org.happiest.capstone_microserviceauth.constant.MicroserviceConstant;
import org.happiest.capstone_microserviceauth.jwt.JWTService;
import org.happiest.capstone_microserviceauth.model.AuthResponse;
import org.happiest.capstone_microserviceauth.model.Users;
import org.happiest.capstone_microserviceauth.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo; // Renamed for clarity

    @Autowired
    private JWTService jwtService;

    @Autowired
    private AuthenticationManager authManager;

    public Users register(Users user){
        return userRepo.save(user); // Save the new user
    }

    public AuthResponse verify(Users user) {
        // Authenticate the user
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword())
        );

        // Check if the authentication was successful
        if (authentication.isAuthenticated()) {
            // Fetch the user from the database
            Users authenticatedUser = userRepo.findByUsername(user.getUsername());

            // Check if user was found
            if (authenticatedUser == null) {
                throw new UsernameNotFoundException(MicroserviceConstant.USER_NOTFOUND);
            }

            // Generate the JWT token and refresh token
            String token = jwtService.generateToken(authenticatedUser.getUsername(), authenticatedUser.getId());
            String refreshToken = jwtService.generateRefreshToken(authenticatedUser.getUsername());
            // Get user details for the AuthResponse
            String role = authenticatedUser.getRole();
            String firstname = authenticatedUser.getFirstname();
            String lastname = authenticatedUser.getLastname();
            int id = authenticatedUser.getId();

            // Return the AuthResponse object
            return new AuthResponse(id,refreshToken,token,role, firstname, lastname);
        } else {
            throw new BadCredentialsException(MicroserviceConstant.AUTHENTICATION_FAILED);
        }
    }

    public List<Map<String, Object>> getWeeklyUserRegistrations() {
        return userRepo.getWeeklyRegistrationsByRole("user");
    }

    public List<Map<String, Object>> getWeeklyProviderRegistrations() {
        return userRepo.getWeeklyRegistrationsByRole("provider");
    }

}
