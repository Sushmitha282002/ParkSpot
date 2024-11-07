package org.happiest.capstone_microserviceauth.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.happiest.capstone_microserviceauth.model.PasswordResetToken;
import org.happiest.capstone_microserviceauth.model.Users;
import org.springframework.web.bind.annotation.CrossOrigin;

@Data
@AllArgsConstructor
@NoArgsConstructor
@CrossOrigin
public class ParkArea {

    private int areaid;
    private String areaname;
    private String arealocation;
    private String totalslots;
    private String image;
    private int status;
    private Users user;



}

