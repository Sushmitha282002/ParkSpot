package org.happiest.capstone_microserviceauth.model;

public class AuthResponse {

    private int id;
    private String token;

    private String refreshToken;
    private String role;
    private String firstname;
    private String lastname;

    public AuthResponse(int id,String token, String refreshToken, String role, String firstname, String lastname) {
        this.id = id;
        this.refreshToken=refreshToken;
        this.token = token;
        this.role = role;
        this.firstname = firstname;
        this.lastname = lastname;

    }
    public int getId(){
        return id;
    }

    public String getToken() {
        return token;
    }

    public String getRefreshToken(){return refreshToken;}

    public String getRole() {
        return role;
    }

    public String getFirstname() {
        return firstname;
    }

    public String getLastname() {
        return lastname;
    }

}
