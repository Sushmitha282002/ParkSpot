package org.happiest.capstone_microserviceauth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkAreaDetailsDTO {
    private int areaid;
    private String areaname;
    private String arealocation;
    private String image;
    private long availableSlots; // Use long for counts
    private BigDecimal price;
}
