package org.happiest.ProviderParkingSlot.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "parkingslot")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class ParkingSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "slotId") // Specify the exact column name in the DB
    private int slotId; // This will be the ID field

    @ManyToOne
    @JoinColumn(name = "areaid")
    private ParkArea parkArea;

    private Boolean isvacant = true;
    private BigDecimal price;

    private Integer slotnumber;

    private Integer availableslots;

}