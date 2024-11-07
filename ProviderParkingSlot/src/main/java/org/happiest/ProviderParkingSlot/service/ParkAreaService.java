package org.happiest.ProviderParkingSlot.service;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.happiest.ProviderParkingSlot.exception.UserNotFoundException;
import org.happiest.ProviderParkingSlot.model.ParkArea;
import org.happiest.ProviderParkingSlot.model.ParkingSlot;
import org.happiest.ProviderParkingSlot.model.Users;
import org.happiest.ProviderParkingSlot.dto.ParkAreaDetailsDTO;
import org.happiest.ProviderParkingSlot.repository.ParkRepo;
import org.happiest.ProviderParkingSlot.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

import static org.happiest.ProviderParkingSlot.constants.ProviderParkingAreaConstants.PARKAREA_NOTFOUND_WITHID;
import static org.happiest.ProviderParkingSlot.constants.ProviderParkingAreaConstants.USER_NOTFOUND_WITHID;

@Service
public class ParkAreaService {

    @Autowired
    private ParkRepo parkRepo;

    public ParkAreaService(ParkRepo parkRepo) {
        this.parkRepo = parkRepo;
    }


    @Autowired
    private UserRepo userRepo;

    @Autowired
    private ParkingSlotService parkingSlotService;



    public void createParkArea(ParkArea parkArea) {
        Users user = userRepo.findById(parkArea.getUser().getId())
                .orElseThrow(() -> new UserNotFoundException(USER_NOTFOUND_WITHID + parkArea.getUser().getId()));
        parkArea.setUser(user);
        parkArea.setStatus(0);
        parkRepo.save(parkArea);




    }
    public List<ParkArea> findAllPending()
    {
        return parkRepo.findAllByStatusNative(0); // 0 for pending status
    }

    public int countPendingParkAreas() {
        return parkRepo.countByStatus(0); // Assuming this method is defined in your repository
    }

    @Transactional
    public void updateParkAreaStatusNative(int areaid, int status) {
        // Call the repository method to update the status using native query
        parkRepo.updateParkAreaStatusNative(areaid, status);


        ParkArea parkArea = parkRepo.findById(areaid)
                .orElseThrow(() -> new EntityNotFoundException(PARKAREA_NOTFOUND_WITHID  + areaid));

        // Update the status
        parkArea.setStatus(status);
        parkRepo.save(parkArea);
        if (status == 1) {
            createParkingSlots(parkArea);
        }


    }

    public List<Users> findAllUsersWithRoleUser() {
        return userRepo.findAllByRole("user");
    }

    public List<Users> findAllUsersWithRoleProviders() {
        return userRepo.findByRole("provider");
    }

    public void createParkingSlots(ParkArea parkArea) {
        // Ensure that total slots is obtained as an integer from the ParkArea object
        int totalSlotsInt = Integer.parseInt(parkArea.getTotalslots()); // Assuming getTotalSlots() returns a String

        // Loop to create parking slots based on total slots
        for (int i = 1; i <= totalSlotsInt; i++) {
            ParkingSlot slot = new ParkingSlot();
            slot.setSlotnumber(i); // Assign the slot number
            slot.setIsvacant(true); // Initially, all slots are vacant
            slot.setAvailableslots(1); // Set available slots to total slots
            slot.setPrice(new BigDecimal("2.00")); // Default price, can be updated later
            slot.setParkArea(parkArea); // Link the slot to the created park area

            // Save the slot using the parking slot service
            parkingSlotService.saveParkingSlot(slot); // Ensure this method exists in your ParkingSlotService
        }
    }
    public List<ParkAreaDetailsDTO> getAvailableParkAreas() {
        return parkRepo.findAllAvailableParkAreasWithDetails();
    }

    public List<ParkAreaDetailsDTO> searchParkAreas(String areaname) {
        // Perform a partial case-insensitive search using the repository method
        return parkRepo.findByAreanameContainingIgnoreCase(areaname);
    }



}
