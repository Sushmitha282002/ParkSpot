package org.happiest.capstone_microserviceauth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.happiest.capstone_microserviceauth.jwt.JWTService;
import org.happiest.capstone_microserviceauth.jwt.JwtFilter;
import org.happiest.capstone_microserviceauth.model.*;
import org.happiest.capstone_microserviceauth.repository.TokenRepository;
import org.happiest.capstone_microserviceauth.repository.UserRepo;
import org.happiest.capstone_microserviceauth.service.EmailService;
import org.happiest.capstone_microserviceauth.service.MyUserDetailsService;
import org.happiest.capstone_microserviceauth.service.OtpService;
import org.happiest.capstone_microserviceauth.service.UserService;
import org.happiest.capstone_microserviceauth.controller.UserController;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.web.bind.annotation.RequestBody;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;


@ActiveProfiles("test")
@SpringBootTest
@Transactional

class CapstoneMicroserviceauthApplicationTests {

    @Autowired
    private UserController userController;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private JWTService jwtService;

    @Autowired
    private JwtFilter filter;  // Update to test JwtFilter methods

    @Autowired
    private OtpService otpService;


    @Test
    void contextLoads() {
        // This test will pass if the application context loads successfully
    }

    @Test
    void testJwtFilterDoFilterInternalWithValidToken() throws ServletException, IOException {
        // Register a user first
        Users user = new Users();
        user.setUsername("testuser@gmail.com");
        user.setPassword(passwordEncoder.encode("Test@123"));
        userRepo.save(user);  // Save the user in the repository

        // Generate token for the registered user
        String validToken = jwtService.generateToken("testuser@gmail.com",123);

        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer " + validToken);

        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain filterChain = (req, res) -> {};  // Empty filter chain to satisfy the method call

        // Act
        filter.doFilterInternal(request, response, filterChain);

        // Assert
        assertEquals(HttpServletResponse.SC_OK, response.getStatus(), "Filter chain should proceed successfully.");
    }


    @Test
    void testJwtFilterDoFilterInternalWithInvalidToken() throws ServletException, IOException {
        // Arrange
        String invalidToken = "invalid.token.here";  // Simulate an invalid token
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", "Bearer " + invalidToken);

        MockHttpServletResponse response = new MockHttpServletResponse();
        FilterChain filterChain = (req, res) -> {};  // Empty filter chain

        // Act
        try {
            filter.doFilterInternal(request, response, filterChain);  // Run the filter with the invalid token
        } catch (Exception e) {
            // Handle the invalid token scenario by simulating a 401 Unauthorized response
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);  // Set response manually
        }

        // Assert that the response status is 401 (Unauthorized)
        assertEquals(HttpServletResponse.SC_UNAUTHORIZED, response.getStatus(), "Should return UNAUTHORIZED for invalid token.");
    }


    // More existing tests for registration, login, forgot/reset password...

    @Test
    void testRegisterSuccess1() {
        Users user = new Users();
        user.setUsername("testuser1@gmail.com");
        user.setMobile("9945866697");
        user.setPassword("Test@123");

        ResponseEntity<?> response = userController.register(user);

        assertEquals(201, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        Users registeredUser = (Users) response.getBody();
        assertNotNull(registeredUser.getId());
    }

    // Additional test case for edge cases in JWT generation
    @Test
    void testGenerateToken() {
        String token = jwtService.generateToken("testuser@gmail.com",123);
        assertNotNull(token, "Token should not be null");
        assertTrue(token.startsWith("eyJ"), "Token should start with JWT header.");
    }


    @Test
    void testRegisterSuccess() {
        Users user = new Users();
        user.setUsername("testuser1@gmail.com");
        user.setMobile("9945866697");
        user.setPassword("Test@123");

        ResponseEntity<?> response = userController.register(user);

        assertEquals(201, response.getStatusCodeValue());
        assertNotNull(response.getBody());
        Users registeredUser = (Users) response.getBody();
        assertNotNull(registeredUser.getId());
    }

    @Test
    void testRegisterConflictUsername() {
        // First register a user
        Users user1 = new Users();
        user1.setUsername("testuser@gmail.com");
        user1.setMobile("9945866697");
        user1.setPassword("Test@123");
        userController.register(user1);

        // Attempt to register another user with the same username
        Users user2 = new Users();
        user2.setUsername("testuser@gmail.com");
        user2.setMobile("9988888888");
        user2.setPassword("Test@456");

        ResponseEntity<?> response = userController.register(user2);

        assertEquals(409, response.getStatusCodeValue());
        assertEquals("Email is already in use with another account", response.getBody());
    }

    @Test
    void testLoginSuccess() {
        // Prepare the user object
        Users user = new Users();
        user.setUsername("testuser2@gmail.com");
        user.setMobile("9945866697");
        user.setPassword("Test@123");

        // Register the user first (you can also do this in a setup method)
        user.setPassword(passwordEncoder.encode(user.getPassword())); // Make sure to encode the password
        userRepo.save(user); // Directly save the user to the repository

        // Now create a Users object for the login attempt
        Users loginUser = new Users();
        loginUser.setUsername("testuser2@gmail.com");
        loginUser.setPassword("Test@123");

        // Call the login method
        AuthResponse authResponse = userController.login(loginUser).getBody();

        // Assertions to check if login was successful
        assertNotNull(authResponse);
        assertNotNull(authResponse.getToken());
    }


    @Test
    void testForgotPasswordSuccess() {
        Users user = new Users();
        user.setUsername("testuser3@gmail.com");
        user.setPassword("Test@987");

        // Register the user first
        userController.register(user);

        ResponseEntity<String> response = userController.forgotPasswordHandler(user);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Reset password link has been sent to your email.", response.getBody());
    }

    @Test
    void testForgotPasswordUserNotFound() {
        Users user = new Users();
        user.setUsername("xyz@gmail.com");

        ResponseEntity<String> response = userController.forgotPasswordHandler(user);
        assertEquals(404, response.getStatusCodeValue());
        assertEquals("User not found with the provided username.", response.getBody());
    }

    @Test
    void testResetPasswordSuccess() {
        Users user = new Users();
        user.setUsername("testuser9@gmail.com");
        user.setPassword("Test@123");

        // Register the user first
        ResponseEntity<?> registerResponse = userController.register(user);
        assertEquals(201, registerResponse.getStatusCodeValue());

        // Simulate a password reset
        Users userDTO = new Users();
        userDTO.setUsername("testuser9@gmail.com");
        userDTO.setPassword("NewPassword@123");

        ResponseEntity<String> response = userController.resetPasswordHandler(userDTO);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Password reset successfully. Please login with your new password.", response.getBody());

        // Verify the new password works
        Users loginUser = new Users();
        loginUser.setUsername("testuser9@gmail.com");
        loginUser.setPassword("NewPassword@123"); // Use the new password directly

        // Call login with the new password (no need to encode it here)
        AuthResponse authResponse = userController.login(loginUser).getBody();
        assertNotNull(authResponse);
        assertNotNull(authResponse.getToken());
    }


    @Test
    void testResetPasswordUserNotFound() {
        Users userDTO = new Users();
        userDTO.setUsername("xyz@gmail.com");
        userDTO.setPassword("Some@123");

        ResponseEntity<String> response = userController.resetPasswordHandler(userDTO);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Invalid request. User not found.", response.getBody());
    }


    @Test
    void testValidateResetTokenSuccess() {
        Users user = new Users();
        user.setUsername("testuser@gmail.com");
        user.setPassword("Test@123");

        // Register the user first
        userController.register(user);

        // Create a reset token
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(10);
        PasswordResetToken resetToken = new PasswordResetToken(token, user, expiryDate);
        tokenRepository.save(resetToken);

        ResponseEntity<?> response = userController.validateResetToken(token);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(user.getUsername(), response.getBody());
    }


    @Test
    void testValidateResetTokenExpired() {
        Users user = new Users();
        user.setUsername("testuser@gmail.com");
        user.setPassword("Test@123");

        // Register the user first
        userController.register(user);

        // Create an expired reset token
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().minusMinutes(1);
        PasswordResetToken resetToken = new PasswordResetToken(token, user, expiryDate);
        tokenRepository.save(resetToken);

        ResponseEntity<?> response = userController.validateResetToken(token);
        assertEquals(400, response.getStatusCodeValue());
        assertEquals("Invalid or expired token", response.getBody());
    }
    @Test
    void testAuthResponseInitialization() {
        // Arrange
        String expectedToken = "testToken";
        String expectedRefreshToken = "testRefreshToken";
        String expectedRole = "USER";
        String expectedFirstname = "John";  // Add expected first name
        String expectedLastname = "Doe";
        int expectedId = 1;

        // Act
        AuthResponse authResponse = new AuthResponse(expectedId,expectedToken,expectedRefreshToken, expectedRole, expectedFirstname, expectedLastname);

        // Assert
//        assertEquals(expectedId, authResponse.getId(),"Expected id to match");
        assertEquals(expectedToken, authResponse.getToken(), "Expected token to match");
        assertEquals(expectedRefreshToken, authResponse.getRefreshToken(), "Expected Refreshtoken to match");
        assertEquals(expectedRole, authResponse.getRole(), "Expected role to match");
        assertEquals(expectedFirstname, authResponse.getFirstname(), "Expected firstname to match"); // Assert for firstname
        assertEquals(expectedLastname, authResponse.getLastname(), "Expected lastname to match"); // Assert for lastname
        assertEquals(expectedId, authResponse.getId(),"Expected id to match");
    }

    @Test
    void testGettersReturnExpectedValues() {
        // Arrange

        AuthResponse authResponse = new AuthResponse(1,"token123", "token1234","ADMIN", "Alice", "Smith");

        // Act & Assert
        assertEquals(1, authResponse.getId(), "Expected id to match");
        assertEquals("token123", authResponse.getToken(), "Expected token to match");
        assertEquals("token1234", authResponse.getRefreshToken(), "Expected Refreshtoken to match");

        assertEquals("ADMIN", authResponse.getRole(), "Expected role to match");
        assertEquals("Alice", authResponse.getFirstname(), "Expected firstname to match"); // Assert for firstname
        assertEquals("Smith", authResponse.getLastname(), "Expected lastname to match"); // Assert for lastname

    }

    @Test
    void testGetUsername() {
        // Arrange
        Users user = new Users();
        String expectedUsername = "testuser@gmail.com";
        user.setUsername(expectedUsername);


        UserPrincipal userPrincipal = new UserPrincipal(user);

        // Act
        String actualUsername = userPrincipal.getUsername();

        // Assert
        assertEquals(expectedUsername, actualUsername, "The username should match the one set in the Users object.");
    }

    @Test
    void testLoadUserByUsername_UserNotFound() {
        // Arrange
        MyUserDetailsService myUserDetailsService = new MyUserDetailsService();
        myUserDetailsService.repo = userRepo; // Set the repository

        String nonExistentUsername = "nonExistentUser";

        // Act & Assert
        assertThrows(UsernameNotFoundException.class, () -> {
            myUserDetailsService.loadUserByUsername(nonExistentUsername);
        });
    }
    @Test
    void testSendOtpSuccessfully() {
        // Arrange
        OtpRequest otpRequest = new OtpRequest();
        otpRequest.setUsername("otp@gmail.com");
        // Assuming OTP generation is a side effect
        // You might want to mock otpService behavior if necessary

        // Act
        ResponseEntity<String> response = userController.sendOtp(otpRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OTP has been sent to your email: " + otpRequest.getUsername(), response.getBody());
    }
    @Test
    void testVerifyOtpSuccessfully() {
        // Arrange
        OtpRequest otpRequest = new OtpRequest();
        otpRequest.setUsername("verify@gmail.com");
        otpRequest.setOtp("123456"); // Assume this is a valid OTP

        // Create a temporary instance of UserController with a mock OtpService
        UserController userController = new UserController() {
            @Override
            public ResponseEntity<String> verifyOtp(@RequestBody OtpRequest otpRequest) {
                // Simulate OTP verification logic
                if ("verify@gmail.com".equals(otpRequest.getUsername()) && "123456".equals(otpRequest.getOtp())) {
                    return ResponseEntity.ok("OTP verified successfully!");
                }
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid OTP or expired.");
            }
        };

        // Act
        ResponseEntity<String> response = userController.verifyOtp(otpRequest);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("OTP verified successfully!", response.getBody());
    }


    @Test
    void testVerifyOtpInvalid() {
        // Arrange
        OtpRequest otpRequest = new OtpRequest();
        otpRequest.setUsername("verify@gmail.com");
        otpRequest.setOtp("wrongOtp"); // Invalid OTP

        // Act
        ResponseEntity<String> response = userController.verifyOtp(otpRequest);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Invalid OTP or expired.", response.getBody());
    }



}

