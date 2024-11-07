package org.happiest.capstone_microserviceauth.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor

public class PaymentDetailsDTO {
    private String paymentId;
    private int bookingId;
    private BigDecimal totalPrice;
}
