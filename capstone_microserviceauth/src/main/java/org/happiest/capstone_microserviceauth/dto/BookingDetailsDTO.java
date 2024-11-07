package org.happiest.capstone_microserviceauth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BookingDetailsDTO {
    private int bookingId;
    private String vehicleNumber;
    private int slotNumber;
    private int areaId;
    private String status;
    private LocalDate checkInDate;
    private BigDecimal totalPrice;
}
