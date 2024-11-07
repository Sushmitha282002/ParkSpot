package org.happiest.capstone_microserviceauth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CancelBookingRequest {

    private int bookingId;  // Include the booking ID to identify the booking
    private int userId;

}
