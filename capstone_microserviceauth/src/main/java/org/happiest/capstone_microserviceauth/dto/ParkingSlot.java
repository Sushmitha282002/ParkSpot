package org.happiest.capstone_microserviceauth.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkingSlot {

    private int slotId;             // Unique identifier for the slot
    private ParkArea parkArea;             // ID of the parking area
    private boolean isVacant;       // Vacancy status
    private int slotNumber;         // Slot number
    private int availableSlots;     // Number of available slots in the area
    private BigDecimal price;       // Price for the slot
}

