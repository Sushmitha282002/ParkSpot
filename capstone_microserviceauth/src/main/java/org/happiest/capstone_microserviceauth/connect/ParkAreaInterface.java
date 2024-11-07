package org.happiest.capstone_microserviceauth.connect;

import org.happiest.capstone_microserviceauth.dto.ParkArea;
import org.happiest.capstone_microserviceauth.dto.ParkAreaDetailsDTO;
import org.happiest.capstone_microserviceauth.model.Users;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@FeignClient("http://ProviderParkingSlot/parkareas")

public interface ParkAreaInterface {
    @PostMapping("/create")
    public ResponseEntity<?> createParkArea(@RequestParam("areaname") String areaName,
                                            @RequestParam("arealocation") String areaLocation,
                                            @RequestParam("totalslots") String totalSlots,
                                            @RequestParam("image") MultipartFile image,
                                            @RequestParam("providerid") int providerid);

    @GetMapping("/pending")
     ResponseEntity<List<ParkArea>> getPendingParkAreas();

    @GetMapping("/pending/count")
     ResponseEntity<Integer> getPendingCount();

    @PostMapping("/updateStatus")
    public ResponseEntity<String> updateParkAreaStatus(@RequestBody ParkArea request);

    @GetMapping("/role/user")
    public ResponseEntity<List<Users>> getAllUsersWithRoleUser();


    @GetMapping("/role/provider")
    public ResponseEntity<List<Users>> getAllProviders();

    @GetMapping("/available")
    public List<ParkAreaDetailsDTO> getAvailableParkAreas();

    @PostMapping("/search")
    public List<ParkAreaDetailsDTO> searchParkAreas(@RequestBody Map<String, String> request);

}
