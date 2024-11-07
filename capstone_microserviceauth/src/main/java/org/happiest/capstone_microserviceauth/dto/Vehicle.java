package org.happiest.capstone_microserviceauth.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.happiest.capstone_microserviceauth.model.Users;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vehicle {

    private String vehicleNumber; // Vehicle number (primary key)
    private String vehicleType;    // Type of the vehicle (e.g., Car, Bike)
    private String vehicleModel;   // Model of the vehicle
    private Users user;        // User ID associated with the vehicle
}

