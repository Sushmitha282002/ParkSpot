export const RESET_LINK_SENT = "Reset link has been sent to your email.";

export const USER_NOT_FOUND = "User not found with the provided email.";

export const GENERIC_ERROR = "An error occurred. Please try again.";
 
// API URLs

export const FORGOT_PASSWORD_URL = "http://localhost:6776/forgotPassword";

export const LOGIN_URL = "http://localhost:6776/login";

export const GOOGLE_LOGIN_URL = "http://localhost:6777/oauth2/authorization/google";

export const RESET_PASSWORD_URL = "http://localhost:6776/resetPassword";

export const PENDING_COUNT_URL = "http://localhost:6776/a5";

export const USER_COUNT_URL = "http://localhost:6776/a7";

export const PROVIDER_COUNT_URL = "http://localhost:6776/a8";

export const WEEKLY_USERS_URL = "http://localhost:6776/weekly-registrations/users";

export const WEEKLY_PROVIDERS_URL = "http://localhost:6776/weekly-registrations/providers";

export const BOOKING_COUNTS_URL = "http://localhost:6776/a16";

export const PENDING_PARK_AREAS_URL = "http://localhost:6776/a4";

export const UPDATE_PARK_AREA_STATUS_URL = "http://localhost:6776/a6";

export const PAYMENT_DETAILS_URL = "http://localhost:6776/a15";
 
 
// Validation messages

export const EMAIL_VALIDATION_MESSAGE = "Email must be a valid address from gmail.com, yahoo.com, or outlook.com";

export const EMAIL_REQUIRED_MESSAGE = "Email is required";

export const PASSWORD_REQUIRED_MESSAGE = "Password is required";

export const PASSWORD_MIN_LENGTH_MESSAGE = "Password must be at least 8 characters";

export const PASSWORD_UPPERCASE_MESSAGE = "Password must contain at least one uppercase letter";

export const PASSWORD_LOWERCASE_MESSAGE = "Password must contain at least one lowercase letter";

export const PASSWORD_NUMBER_MESSAGE = "Password must contain at least one number";

export const PASSWORD_SPECIAL_CHAR_MESSAGE = "Password must contain at least one special character";
 
// Password strength messages

export const STRENGTH_COLORS = ["red", "orange", "yellow", "lightgreen", "green"];

export const STRENGTH_TEXT = ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"];
 
// Other constants

export const API_CALL_ERROR = "Something Went Wrong with Api Call ...";

export const LOGIN_HANDLELOGIN_SUCCESS = "Login Successfully";

export const LOGIN_HANDLELOGIN_FAILURE = "Invalid email or password";

export const LOGIN_HANDLELOGIN_ERROR = "An error occurred while trying to log in. Please try again.";

export const SIGNUP_HANDLESUBMIT_PASSWORD = "Password must be at least 8 characters long and include one special character.";

export const SIGNUP_HANDLESUBMIT_ACCOUNT_EXISTS = "Account already exists.";

export const SIGNUP_HANDLESUBMIT_ACCOUNT_SUCCESS = "Account registered successfully";

export const SIGNUP_HANDLESUBMIT_ACCOUNT_FAILURE = "There was an error!";

// Reset Password messages

export const RESET_PASSWORD_HEADER = "ParkSpot";

export const RESET_PASSWORD_TITLE = "YOUR PASSWORD RESET LINK IS READY";

export const RESET_PASSWORD_DESCRIPTION = "Just click the link to reset it - but be quick, it expires in 10 minutes.";

export const TOKEN_EXPIRED_OR_INVALID = "Token Expired or Invalid";

export const RESET_PASSWORD_PROMPT = "Reset Password";

export const STRONG_PASSWORD_ADVICE = "WANT TO MAKE YOUR NEW PASSWORD STRONG?";

export const STRONG_PASSWORD_DESCRIPTION = "The advice is to create a password using a combination of three memorable but random words. Your password should be unique to you and not related to your company, family, or any information easily found on social media. The form will accept only emails from @gmail.com, @yahoo.com,and @outlook.com, and require passwords that meet the specified criteria (minimum length, special characters, etc.).";

export const LOADING_MESSAGE = "Loading...";

export const INVALID_OR_EXPIRED_TOKEN_ALERT = "Reset token is invalid or has expired.";
 
// Header messages

export const LOGOUT_SUCCESS_MESSAGE = "Logout successful.";

export const NOTIFICATION_URL = "/notifications";

export const SIGNUP_URL = "/registration";

export const LOGIN_URL1 = "/login";

export const LOGOUT_BUTTON_TEXT = "Logout";

export const SIGNUP_BUTTON_TEXT = "Signup";

export const LOGIN_BUTTON_TEXT = "Login";

export const AVATAR_BACKGROUND_COLOR = "#522d74";

export const NOTIFICATION_ICON_COLOR = "#522d74";

export const NOTIFICATION_BADGE_COLOR = "red";

export const NOTIFICATION_BADGE_TEXT_COLOR = "white";

export const NOTIFICATION_BADGE_FONT_SIZE = "12px";

export const NOTIFICATION_BADGE_PADDING = "2px 6px";

export const NOTIFICATION_BADGE_POSITION_TOP = "-5px";

export const NOTIFICATION_BADGE_POSITION_RIGHT = "-10px";

export const FORM_BACKGROUND_COLOR = "white";

export const FORM_PADDING = "15px";

export const FORM_BORDER_RADIUS = "8px";

export const FORM_BOX_SHADOW = "0 4px 12px rgba(0,0,0,0.2)";

export const FORM_Z_INDEX = "1000";

export const FORM_MIN_WIDTH = "200px";

export const FORM_BUTTON_BACKGROUND_COLOR = "red";

export const FORM_BUTTON_TEXT_COLOR = "white";

export const FORM_BUTTON_PADDING = "10px";

export const FORM_BUTTON_BORDER_RADIUS = "4px";

export const FORM_BUTTON_BORDER = "none";

export const FORM_BUTTON_CURSOR = "pointer";
 
// Home messages

export const DASHBOARD_TITLE = "DASHBOARD";

export const USERS_TITLE = "USERS";

export const PROVIDERS_TITLE = "PROVIDERS";

export const ALERTS_TITLE = "ALERTS";

export const REGISTRATIONS_CHART_TITLE = "Registrations Over the Last Week";

export const BOOKINGS_CHART_TITLE = "Bookings Over the Last Week";

export const USERS_BAR_COLOR = "#8884d8";

export const PROVIDERS_BAR_COLOR = "#82ca9d";

export const BOOKINGS_LINE_COLOR = "#8884d8";
 
// Notification messages

export const PENDING_PARK_AREAS_TITLE = "Pending Park Areas";

export const AREA_ID_TITLE = "Area ID";

export const AREA_NAME_TITLE = "Area Name";

export const LOCATION_TITLE = "Location";

export const STATUS_TITLE = "Status";

export const TOTAL_SLOTS_TITLE = "Total Slots";

export const PROVIDER_ID_TITLE = "Provider ID";

export const IMAGE_TITLE = "Image";

export const ACTIONS_TITLE = "Actions";

export const PENDING_STATUS = "Pending";

export const ACCEPTED_STATUS = "Accepted";

export const NO_PENDING_PARK_AREAS_MESSAGE = "No pending park areas found.";

export const ACCEPT_BUTTON_TEXT = "Accept";

export const REJECT_BUTTON_TEXT = "Reject";

export const ERROR_FETCHING_PENDING_PARK_AREAS = "Error fetching pending park areas:";

export const ERROR_ACCEPTING_PARK_AREA = "Error accepting park area:";

export const ERROR_REJECTING_PARK_AREA = "Error rejecting park area:";
 
// Provider details messages

export const PROVIDERS_INFORMATION_TITLE = "Providers Information";

export const ID_TITLE = "Id";

export const FIRST_NAME_TITLE = "First Name";

export const LAST_NAME_TITLE = "Last Name";

export const USERNAME_TITLE = "Username";

export const MOBILE_TITLE = "Mobile";

export const ROLE_TITLE = "Role";

export const NO_PROVIDERS_FOUND_MESSAGE = "No providers found";

export const PREVIOUS_BUTTON_TEXT = "Previous";

export const NEXT_BUTTON_TEXT = "Next";

export const BREAK_LABEL_TEXT = "...";

export const PAGINATION_CLASS_NAME = "pagination justify-content-center";

export const PAGE_ITEM_CLASS_NAME = "page-item";

export const PAGE_LINK_CLASS_NAME = "page-link";

export const ACTIVE_CLASS_NAME = "active";
 
 
// User details messages

export const USERS_INFORMATION_TITLE = "Users Information";

export const NO_USERS_FOUND_MESSAGE = "No users found";
 
// Weekly data table messages

export const WEEKLY_REGISTERED_USERS_PROVIDERS_TITLE = "Weekly Registered Users and Providers";

export const BOOKINGS_OVER_LAST_WEEK_TITLE = "Bookings Over the Last Week";

export const DAY_TITLE = "Day";

export const REGISTERED_USERS_TITLE = "Registered Users";

export const REGISTERED_PROVIDERS_TITLE = "Registered Providers";

export const BOOKING_COUNT_TITLE = "Booking Count";
 
// Park area card messages

export const LOCATION_LABEL = "Location:";

export const AVAILABLE_SLOTS_LABEL = "Available Slots:";

export const PRICE_LABEL = "Price:";

export const AREA_ID_LABEL = "Area id:";

export const BOOK_NOW_BUTTON_TEXT = "Book Now";
 
// Payment details messages

export const PAYMENT_ID_TITLE = "Payment ID";

export const BOOKING_ID_TITLE = "Booking ID";

export const TOTAL_PRICE_TITLE = "Total Price";

export const NO_PAYMENT_DETAILS_MESSAGE = "No payment details available";
 
export const THEME_COLORS = {

  logo_color: "#F1F1F1",

  background_color: "#26d2b0",

  text_color: "#F1F1F1",

  hover_background_color: "#D3C5E5",

  login_background_color: "#0c0d4d",

  login_text_color: "#aacbf9",

  nav_background_color: "#522d74"

};

 