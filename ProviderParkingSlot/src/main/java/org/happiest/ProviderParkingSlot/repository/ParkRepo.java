package org.happiest.ProviderParkingSlot.repository;


import jakarta.transaction.Transactional;
import org.happiest.ProviderParkingSlot.model.ParkArea;
import org.happiest.ProviderParkingSlot.dto.ParkAreaDetailsDTO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ParkRepo extends CrudRepository<ParkArea, Integer> {


    @Query(value = "SELECT * FROM parkarea WHERE status = :status", nativeQuery = true)
    List<ParkArea> findAllByStatusNative(int status);

    int countByStatus(int status);

    @Modifying
    @Transactional
    @Query(value = "UPDATE parkarea SET status = :status WHERE areaid = :areaid", nativeQuery = true)
    void updateParkAreaStatusNative(int areaid, int status);


    @Query("SELECT new org.happiest.ProviderParkingSlot.dto.ParkAreaDetailsDTO(" +
            "pa.areaid, pa.areaname, pa.arealocation, pa.image, " +
            "COUNT(CASE WHEN ps.isvacant = true THEN 1 END), " +
            "MIN(ps.price)) " +  // Using MIN to get the price of the available slots
            "FROM ParkArea pa " +
            "JOIN pa.parkingSlots ps " +
            "WHERE pa.status = 1 " +
            "GROUP BY pa.areaid, pa.areaname, pa.arealocation, pa.image")


    List<ParkAreaDetailsDTO> findAllAvailableParkAreasWithDetails();


    @Query("SELECT new org.happiest.ProviderParkingSlot.dto.ParkAreaDetailsDTO(" +
            "pa.areaid, pa.areaname, pa.arealocation, pa.image, " +
            "COUNT(CASE WHEN ps.isvacant = true THEN 1 END), " +
            "MIN(ps.price)) " +
            "FROM ParkArea pa " +
            "JOIN pa.parkingSlots ps " +
            "WHERE pa.status = 1 AND LOWER(pa.areaname) LIKE LOWER(CONCAT('%', :areaname, '%')) " +
            "GROUP BY pa.areaid, pa.areaname, pa.arealocation, pa.image")
    List<ParkAreaDetailsDTO> findByAreanameContainingIgnoreCase(@Param("areaname") String areaname);

}
