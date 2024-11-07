package org.happiest.capstone_microserviceauth.controller;

import org.apache.logging.log4j.LogManager;

import org.apache.logging.log4j.Logger;


import org.happiest.capstone_microserviceauth.connect.CapstoneBookingMicroserviceInterface;
import org.happiest.capstone_microserviceauth.connect.ParkAreaInterface;
import org.happiest.capstone_microserviceauth.constant.MicroserviceConstant;

import org.happiest.capstone_microserviceauth.dto.*;
import org.happiest.capstone_microserviceauth.jwt.JWTService;

import org.happiest.capstone_microserviceauth.model.*;

import org.happiest.capstone_microserviceauth.repository.TokenRepository;

import org.happiest.capstone_microserviceauth.repository.UserRepo;

import org.happiest.capstone_microserviceauth.service.EmailService;

import org.happiest.capstone_microserviceauth.service.OtpService;
import org.happiest.capstone_microserviceauth.service.UserService;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@CrossOrigin
@RefreshScope

public class UserController {

    private static final Logger errorLogger = LogManager.getLogger("ErrorLogger");

    private static final Logger logger = LogManager.getLogger(UserController.class);

    @Autowired

    private UserService service;

    @Autowired
    private ParkAreaInterface parkAreaInterface;

    @Autowired
    private CapstoneBookingMicroserviceInterface capstoneBookingMicroserviceInterface;

    @Autowired

    private UserRepo repo;
    @Autowired
    private UserService userService;


    @Autowired

    private TokenRepository tokenRepository;

    @Autowired

    private EmailService emailService;

    @Autowired

    private PasswordEncoder passwordEncoder;

    @Autowired

    private JWTService jwtService;



    @Autowired
    private OtpService otpService;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(14);

    @PostMapping("/register")

    public ResponseEntity<?> register(@RequestBody Users user) {

        logger.info(MicroserviceConstant.LOG_REGISTERING_USER, user.getUsername());

        if (repo.findByUsername(user.getUsername()) != null) {

            errorLogger.error(MicroserviceConstant.REGISTER_EXISTING_EMAIL, user.getUsername());

            return ResponseEntity.status(HttpStatus.CONFLICT)

                    .body(MicroserviceConstant.EMAIL_ALREADY_IN_USE);

        }

        if (repo.findByMobile(user.getMobile()) != null) {

            errorLogger.error(MicroserviceConstant.REGISTER_EXISTING_MOBILE, user.getMobile());

            return ResponseEntity.status(HttpStatus.CONFLICT)

                    .body(MicroserviceConstant.MOBILE_ALREADY_IN_USE);

        }

        user.setPassword(encoder.encode(user.getPassword()));

        Users registeredUser = repo.save(user);

        logger.info(MicroserviceConstant.LOG_USER_REGISTERED, user.getUsername());

        return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);

    }

    @PostMapping("/login")

    public ResponseEntity<AuthResponse> login(@RequestBody Users user) {

        logger.info(MicroserviceConstant.LOG_LOGIN_ATTEMPT, user.getUsername());

        AuthResponse authResponse = service.verify(user);

        logger.info(MicroserviceConstant.LOG_LOGIN_SUCCESS, user.getUsername());

        return ResponseEntity.ok(authResponse);

    }

    @PostMapping("/forgotPassword")

    public ResponseEntity<String> forgotPasswordHandler(@RequestBody Users user) {

        logger.info(MicroserviceConstant.LOG_FORGOT_PASSWORD_REQUEST, user.getUsername());

        Users existingUser = repo.findByUsername(user.getUsername());

        if (existingUser != null) {

            String token = UUID.randomUUID().toString();

            LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(10);

            PasswordResetToken resetToken = tokenRepository.findByUser(existingUser);

            if (resetToken == null) {

                resetToken = new PasswordResetToken(token, existingUser, expiryDate);

                logger.info(MicroserviceConstant.LOG_RESET_TOKEN_CREATED, user.getUsername());

            } else {

                resetToken.setToken(token);

                resetToken.setExpiryDateTime(expiryDate);

                logger.info(MicroserviceConstant.LOG_RESET_TOKEN_UPDATED, user.getUsername());

            }

            tokenRepository.save(resetToken);

            emailService.sendResetEmail(existingUser.getUsername(), existingUser);

            logger.info(MicroserviceConstant.LOG_RESET_LINK_SENT, existingUser.getUsername());

            return ResponseEntity.ok(MicroserviceConstant.RESET_LINK_SENT);

        }

        logger.warn(MicroserviceConstant.USER_NOT_FOUND_EMAIL, user.getUsername());

        return new ResponseEntity<>(MicroserviceConstant.USER_NOT_FOUND, HttpStatus.NOT_FOUND);

    }

    @GetMapping("/resetPassword/{token}")

    public ResponseEntity<?> validateResetToken(@PathVariable String token) {

        logger.info(MicroserviceConstant.VALIDATING_RESET_TOKEN, token);

        PasswordResetToken passwordResetToken = tokenRepository.findByToken(token).orElse(null);

        if (passwordResetToken == null || passwordResetToken.isExpired()) {

            logger.warn(MicroserviceConstant.INVALID_OR_EXPIRED_TOKEN, token);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(MicroserviceConstant.INVALID_OR_EXPIRED_TOKEN);

        }

        logger.info(MicroserviceConstant.LOG_TOKEN_VALIDATED, passwordResetToken.getUser().getUsername());
        return ResponseEntity.ok(passwordResetToken.getUser().getUsername());

    }

    @PostMapping("/resetPassword")

    public ResponseEntity<String> resetPasswordHandler(@RequestBody Users userDTO) {

        logger.info(MicroserviceConstant.RESETTING_PASSWORD_EMAIL, userDTO.getUsername());

        Users user = repo.findByUsername(userDTO.getUsername());

        if (user != null) {

            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));

            repo.save(user);

            logger.info(MicroserviceConstant.LOG_PASSWORD_RESET, userDTO.getUsername());

            return ResponseEntity.ok(MicroserviceConstant.PASSWORD_RESET_SUCCESS);

        }

        logger.warn(MicroserviceConstant.LOG_INVALID_RESET_REQUEST, userDTO.getUsername());

        return new ResponseEntity<>(MicroserviceConstant.INVALID_RESET_REQUEST, HttpStatus.BAD_REQUEST);

    }

    @PostMapping("/send")
    public ResponseEntity<String> sendOtp(@RequestBody OtpRequest otpRequest) {
        String username = otpRequest.getUsername();
        logger.info(MicroserviceConstant.LOG_RECEIVED_OTP_REQUEST, username);

        String otp = otpService.generateOtp(username);
        logger.info(MicroserviceConstant.LOG_GENERATED_OTP, username);

        return ResponseEntity.ok(MicroserviceConstant.OTP_SENT_MESSAGE + username);
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpRequest otpRequest) {
        String username = otpRequest.getUsername();
        String otp = otpRequest.getOtp();
        logger.info(MicroserviceConstant.LOG_RECEIVED_OTP_VERIFICATION, username);

        boolean isValid = otpService.verifyOtp(username, otp);
        if (isValid) {
            logger.info(MicroserviceConstant.LOG_OTP_VERIFIED_SUCCESS, username);
            return ResponseEntity.ok(MicroserviceConstant.OTP_VERIFIED_SUCCESS_MESSAGE);
        } else {
            logger.warn(MicroserviceConstant.LOG_OTP_INVALID, username);
            return ResponseEntity.status(400).body(MicroserviceConstant.OTP_INVALID_MESSAGE);
        }
    }
    @PostMapping("/a3")
    public ResponseEntity<?> createParkArea(@RequestParam("areaname") String areaName,
                                            @RequestParam("arealocation") String areaLocation,
                                            @RequestParam("totalslots") String totalSlots,
                                            @RequestParam("image") MultipartFile image,
                                            @RequestParam("providerid") int providerid){
        return parkAreaInterface.createParkArea(areaName,areaLocation,totalSlots,image,providerid);
    }

    @GetMapping("/a4")
    ResponseEntity<List<ParkArea>> f10(){
        return parkAreaInterface.getPendingParkAreas();
    }

    @GetMapping("/a5")
    public ResponseEntity<Integer> f11(){
        return parkAreaInterface.getPendingCount();
    }

    @PostMapping("/a6")
    public ResponseEntity<String> updateParkAreaStatus(@RequestBody ParkArea request){
        return parkAreaInterface.updateParkAreaStatus(request);
    }

    @GetMapping("/a7")
    public ResponseEntity<List<Users>> getAllUsersWithRoleUser(){
        return parkAreaInterface.getAllUsersWithRoleUser();
    }

    @GetMapping("/a8")
    public ResponseEntity<List<Users>> getAllProviders(){
        return parkAreaInterface.getAllProviders();
    }

    @GetMapping("/a9")
    public List<ParkAreaDetailsDTO> getAvailableParkAreas(){
        return parkAreaInterface.getAvailableParkAreas();
    }


    @PostMapping("/a10")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest bookingRequest){
        return capstoneBookingMicroserviceInterface.createBooking(bookingRequest);
    }

    @PostMapping("/a11")
    public ResponseEntity<Booking> checkoutBooking(@RequestBody CheckoutRequest checkoutRequest){
        return capstoneBookingMicroserviceInterface.checkoutBooking(checkoutRequest);
    }

    @PostMapping("/a12")
    public ResponseEntity<String> cancelBooking(@RequestBody CancelBookingRequest cancelrequest){
        return capstoneBookingMicroserviceInterface.cancelBooking(cancelrequest);
    }

    @GetMapping("/{userId}/a13")
    public ResponseEntity<List<BookingDetailsDTO>> getBookingDetails(@PathVariable int userId) {
        return capstoneBookingMicroserviceInterface.getBookingDetails(userId);  // Feign handles path variable passing
    }

    @PostMapping("/a14")
    public ResponseEntity<String> processPayment(@RequestBody PaymentDTO paymentDTO){
        return capstoneBookingMicroserviceInterface.processPayment(paymentDTO);

    }

    @GetMapping("/a15/{userId}")
    public ResponseEntity<List<PaymentDetailsDTO>> getPaymentDetailsByUserId(@PathVariable int userId){
        return capstoneBookingMicroserviceInterface.getPaymentDetailsByUserId(userId);
    }

    @GetMapping("/weekly-registrations/users")
    public List<Map<String, Object>> getWeeklyUserRegistrations() {
        return userService.getWeeklyUserRegistrations();
    }

    @GetMapping("/weekly-registrations/providers")
    public List<Map<String, Object>> getWeeklyProviderRegistrations() {
        return userService.getWeeklyProviderRegistrations();
    }

    @GetMapping("/a16")
    public Map<LocalDate, Long> getBookingCountForLast7Days(){
        return capstoneBookingMicroserviceInterface.getBookingCountForLast7Days();
    }

    @PostMapping("/a17")
    public List<ParkAreaDetailsDTO> searchParkAreas(@RequestBody Map<String, String> request){
        return parkAreaInterface.searchParkAreas(request);
    }

}