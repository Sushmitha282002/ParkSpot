package org.happiest.ProviderParkingSlot.service;

import org.happiest.ProviderParkingSlot.model.ParkingSlot;
import org.happiest.ProviderParkingSlot.repository.ParkingSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ParkingSlotService {

    @Autowired
    private ParkingSlotRepository parkingSlotRepository;

    public void saveParkingSlot(ParkingSlot slot) {
        parkingSlotRepository.save(slot);  // Ensure this method is saving the slot to the repository
    }
}

