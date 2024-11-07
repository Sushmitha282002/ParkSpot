package org.happiest.capstone_microserviceauth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingRequest {
    private int userId;             // User ID of the person making the booking
    private Vehicle vehicle;        // Full details of the vehicle
    private int areaId;             // ID of the area where the booking is made
    private LocalDate checkInDate;  // Date for check-in
    private LocalDateTime checkInTime;  // Time for check-in
}
