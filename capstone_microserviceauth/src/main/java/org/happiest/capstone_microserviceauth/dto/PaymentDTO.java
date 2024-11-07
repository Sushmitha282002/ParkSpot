package org.happiest.capstone_microserviceauth.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDTO {

    private String paymentId;

    private int bookingId;

    private int userId;
}
