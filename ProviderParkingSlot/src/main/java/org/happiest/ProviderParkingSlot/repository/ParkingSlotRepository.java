package org.happiest.ProviderParkingSlot.repository;

import org.happiest.ProviderParkingSlot.model.ParkArea;
import org.happiest.ProviderParkingSlot.model.ParkingSlot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Integer> {

}
