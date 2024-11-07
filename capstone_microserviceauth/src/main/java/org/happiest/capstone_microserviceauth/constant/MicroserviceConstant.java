package org.happiest.capstone_microserviceauth.constant;

public class MicroserviceConstant {




    // Error messages
    public static final String EMAIL_ALREADY_IN_USE = "Email is already in use with another account";
    public static final String MOBILE_ALREADY_IN_USE = "Mobile number is already in use with another account";
    public static final String USER_NOT_FOUND = "User not found with the provided username.";
    public static final String RESET_LINK_SENT = "Reset password link has been sent to your email.";
    public static final String INVALID_OR_EXPIRED_TOKEN = "Invalid or expired token";
    public static final String PASSWORD_RESET_SUCCESS = "Password reset successfully. Please login with your new password.";
    public static final String INVALID_RESET_REQUEST = "Invalid request. User not found.";
    public static final String  PASSWORD_RESET_REQUEST="Password Reset Request";
    public static final String RESET_PASSWORDLINK_TOMAIL="To reset your password, click the link below:";
    public static final String  RESETLINK_SENTTO="Reset link sent to: ";
    public static final String USER_NOTFOUND="User not found";
    public static final String AUTHENTICATION_FAILED="Authentication failed";
    public static final String OTP_SENT_MESSAGE = "OTP has been sent to your email: ";
    public static final String OTP_VERIFIED_SUCCESS_MESSAGE = "OTP verified successfully!";
    public static final String OTP_INVALID_MESSAGE = "Invalid OTP or expired.";
    public static final String OTP_VERIFY = "Your OTP for Verification";





    // Log messages
    public static final String LOG_REGISTERING_USER = "Registering user with email: {}";
    public static final String LOG_USER_REGISTERED = "User registered successfully with email: {}";
    public static final String LOG_LOGIN_ATTEMPT = "Login attempt for user with email: {}";
    public static final String LOG_LOGIN_SUCCESS = "Login successful for user with email: {}";
    public static final String LOG_FORGOT_PASSWORD_REQUEST = "Forgot password request for user with email: {}";
    public static final String LOG_RESET_TOKEN_CREATED = "Created new reset token for user with email: {}";
    public static final String LOG_RESET_TOKEN_UPDATED = "Updated reset token for user with email: {}";
    public static final String LOG_RESET_LINK_SENT = "Reset password link sent to email: {}";
    public static final String LOG_TOKEN_VALIDATED = "Reset token validated successfully for user: {}";
    public static final String LOG_PASSWORD_RESET = "Password reset successfully for user with email: {}";
    public static final String LOG_INVALID_RESET_REQUEST = "Invalid reset password request for email: {}";
    public static final String REGISTER_EXISTING_EMAIL="Attempt to register with an existing email: {}";
    public static final String REGISTER_EXISTING_MOBILE = "Attempt to register with an existing mobile number: {}";
    public static final String USER_NOT_FOUND_EMAIL = "User not found with email: {}";
    public static final String VALIDATING_RESET_TOKEN = "Validating reset token: {}";
    public static final String RESETTING_PASSWORD_EMAIL = "Resetting password for user with email: {}";
    public static final String LOG_RECEIVED_OTP_REQUEST = "Received OTP request for username: {}";
    public static final String LOG_GENERATED_OTP = "Generated OTP for username: {}";
    public static final String LOG_RECEIVED_OTP_VERIFICATION = "Received OTP verification request for username: {}";
    public static final String LOG_OTP_VERIFIED_SUCCESS = "OTP verified successfully for username: {}";
    public static final String LOG_OTP_INVALID = "Invalid or expired OTP for username: {}";
}



