package org.happiest.capstone_microserviceauth.dto;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.happiest.capstone_microserviceauth.model.Users;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Booking {

    private int bookingId;                // Unique identifier for the booking
    private Users user;                // User ID associated with the booking

    private ParkingSlot parkingSlot;              // Slot number associated with the booking
    private int areaId;                   // Area ID associated with the booking
    private Vehicle vehicle;          // Vehicle number associated with the booking
    private LocalDate checkInDate;       // Check-in date
    private LocalDateTime checkInTime;   // Check-in time
    private LocalDateTime checkOutTime;  // Check-out time (nullable)
    private BigDecimal totalPrice;        // Total price for the booking
    private String status;                // Booking status (e.g., BOOKED, CANCELLED)
    private int paymentId;                // Placeholder for payment information (nullable)
}

