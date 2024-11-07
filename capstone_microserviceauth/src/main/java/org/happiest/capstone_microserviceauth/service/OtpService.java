package org.happiest.capstone_microserviceauth.service;

import org.happiest.capstone_microserviceauth.constant.MicroserviceConstant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class OtpService {

    @Autowired
    private JavaMailSender mailSender;

    private Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    // Store OTP with expiration
    public String generateOtp(String username) {
        Random random = new Random();
        String otp = String.format("%06d", random.nextInt(999999));

        otpStorage.put(username, otp);

        // Schedule removal of OTP after 10 minutes
        scheduler.schedule(() -> otpStorage.remove(username), 10, TimeUnit.MINUTES);

        sendOtpEmail(username, otp);
        return otp;
    }

    // Send OTP to the user's email
    public void sendOtpEmail(String username, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(username); // Assuming username is the email address in your system
        message.setSubject(MicroserviceConstant.OTP_VERIFY);
        message.setText("Your OTP is: " + otp + ". It is valid for 10 minutes.");

        mailSender.send(message);
    }

    // Verify the OTP
    public boolean verifyOtp(String username, String otp) {
        String storedOtp = otpStorage.get(username);
        return storedOtp != null && storedOtp.equals(otp);
    }
}
