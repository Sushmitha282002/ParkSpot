package org.happiest.ProviderParkingSlot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.happiest.ProviderParkingSlot.service.ParkingSlotService;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "parkarea")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParkArea {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int areaid;

    private String areaname;

    private String arealocation;

    private String totalslots;

    private String image;

    @Column(nullable = false, columnDefinition = "int default 0")
    private int status;

    @ManyToOne
    @JoinColumn(name = "providerid", nullable = false) // foreign key reference
    @JsonIgnoreProperties({"firstname", "lastname", "username", "password", "mobile", "role", "parkAreas"})
    private Users user;

    @OneToMany(mappedBy = "parkArea", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ParkingSlot> parkingSlots = new ArrayList<>();

    public ParkArea(String areaname, String arealocation, String totalslots, String image, Users user) {
        this.areaname = areaname;
        this.arealocation = arealocation;
        this.totalslots = totalslots;
        this.image = image;
        this.user = user;
        this.status = 0; // Default status
    }
    // Method to create parking slots automatically
    public void createParkingSlots(ParkingSlotService parkingSlotService) {
        // Convert totalSlots from String to int
        int totalSlotsInt = Integer.parseInt(totalslots); // Assuming totalSlots is a valid integer string

        for (int i = 1; i <= totalSlotsInt; i++) {
            ParkingSlot slot = new ParkingSlot();
            slot.setSlotnumber(i);
            slot.setIsvacant(true);
            slot.setPrice(new BigDecimal("2.00")); // Set a default price for each slot
            slot.setAvailableslots(1); // Set available slots
            slot.setParkArea(this); // Link to this parking area
            parkingSlots.add(slot); // Add to list
            parkingSlotService.saveParkingSlot(slot); // Save the parking slot
        }
    }

}
