package org.happiest.capstone_microserviceauth.service;




import org.happiest.capstone_microserviceauth.constant.MicroserviceConstant;
import org.happiest.capstone_microserviceauth.model.PasswordResetToken;
import org.happiest.capstone_microserviceauth.model.Users;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private PasswordResetTokenService passwordResetTokenService;

    public void sendResetEmail(String username, Users user) {
        // Create or update the token
        PasswordResetToken resetToken = passwordResetTokenService.createOrUpdateToken(user);

        String resetLink = "http://localhost:3000/resetPassword/" + resetToken.getToken();

        // Create a SimpleMailMessage object
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(username);
        message.setSubject(MicroserviceConstant.PASSWORD_RESET_REQUEST);
        message.setText(MicroserviceConstant.RESET_PASSWORDLINK_TOMAIL + resetLink);

        // Send the email
        mailSender.send(message);

        System.out.println(MicroserviceConstant.RESETLINK_SENTTO+ username);
    }
}

