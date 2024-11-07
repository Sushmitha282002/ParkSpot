package org.happiest.ProviderParkingSlot.controller;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.happiest.ProviderParkingSlot.exception.*;
import org.happiest.ProviderParkingSlot.model.ParkArea;

import org.happiest.ProviderParkingSlot.model.Users;
import org.happiest.ProviderParkingSlot.dto.ParkAreaDetailsDTO;
import org.happiest.ProviderParkingSlot.repository.ParkRepo;
import org.happiest.ProviderParkingSlot.repository.UserRepo;
import org.happiest.ProviderParkingSlot.service.FileStorageService;
import org.happiest.ProviderParkingSlot.service.ParkAreaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.happiest.ProviderParkingSlot.constants.ProviderParkingAreaConstants.*;


@RestController
@RequestMapping("/parkareas")
@CrossOrigin

public class ParkAreaController {
    private static final Logger errorLogger = LogManager.getLogger("ErrorLogger");

    private static final Logger logger = LogManager.getLogger(ParkAreaController.class);
    @Autowired
    private ParkAreaService parkAreaService;

    @Autowired
    private FileStorageService fileStorageService;

    @Autowired
    private UserRepo userRepo;


    @Autowired
    private ParkRepo parkRepo;

    @PostMapping("/create")
    public ResponseEntity<?> createParkArea(@RequestParam("areaname") String areaName,
                                            @RequestParam("arealocation") String areaLocation,
                                            @RequestParam("totalslots") String totalSlots,
                                            @RequestParam("image") MultipartFile image,
                                            @RequestParam("providerid") int providerid) {
        logger.info(LOG_CREATE_PARK_AREA, areaName);
        String fileName;
        try {
            // Store the file and get the download URI
            fileName = fileStorageService.storeFile(image);
        } catch (Exception e) {
            logger.error(LOG_STORE_FILE_FAILED, e.getMessage(), e);
            return ResponseEntity.status(500).body(LOG_STORE_FILE_FAILED);
        }

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(fileName)
                .toUriString();

        // Fetch the user by provider ID
        Users user;
        try {
            user = userRepo.findById(providerid)
                    .orElseThrow(() -> new UserNotFoundException(LOG_USER_NOTFOUND_WITHID + providerid));
        } catch (UserNotFoundException e) {
            errorLogger.error(ERROR_FETCHING_USER, e.getMessage(), e);
            return ResponseEntity.status(404).body(ERROR_USER_NOT_FOUND );
        }

        // Create a new ParkArea object
        ParkArea parkArea = new ParkArea(areaName, areaLocation, totalSlots, fileDownloadUri, user);

        // Save the park area using the service
        parkAreaService.createParkArea(parkArea);
        logger.info(LOG_PARKAREA_CREATEDSUCCESSFULLY, parkArea.getAreaid());

        // Build the response map with only required fields
        Map<String, Object> response = new HashMap<>();
        response.put("areaid", parkArea.getAreaid());
        response.put("areaname", parkArea.getAreaname());
        response.put("arealocation", parkArea.getArealocation());
        response.put("status", parkArea.getStatus());

        // Add only the user ID to the response
        Map<String, Object> userResponse = new HashMap<>();
        userResponse.put("id", user.getId());
        response.put("user", userResponse);

        // Add file download URI to the response
        response.put("fileDownloadUri", fileDownloadUri);

        // Return the custom response
        return ResponseEntity.ok(response);
    }

    @GetMapping("/pending")
    public ResponseEntity<List<ParkArea>> getPendingParkAreas() {
        try {
            logger.info(LOG_FETCH_PENDING_PARK_AREAS);
            List<ParkArea> pendingParkAreas = parkAreaService.findAllPending();
            logger.info(LOG_FOUND_PENDING_PARKAREAS , pendingParkAreas.size());
            return ResponseEntity.ok(pendingParkAreas);
        } catch (Exception e) {
            errorLogger.error(PENDING_PARK_AREAS_RETRIEVAL_ERROR);
            throw new PendingParkAreasRetrievalException(PENDING_PARK_AREAS_RETRIEVAL_ERROR);
        }
    }

    @GetMapping("/pending/count")
    public ResponseEntity<Integer> getPendingCount() {
        try {
            logger.info(LOG_PENDING_PARK_AREAS_COUNT);
            int count = parkAreaService.countPendingParkAreas();
            logger.info(LOG_PENDING_PARKAREAS_COUNT , count);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            errorLogger.error(PENDING_PARK_COUNT_RETRIEVAL_ERROR);
            throw new PendingParkCountRetrievalException(PENDING_PARK_COUNT_RETRIEVAL_ERROR);
        }
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<String> updateParkAreaStatus(@RequestBody ParkArea request) {
        logger.info(LOG_UPDATE_STATUS , request.getAreaid());
        try {
            parkAreaService.updateParkAreaStatusNative(request.getAreaid(), request.getStatus());
            logger.info(LOG_STATUS_UPDATEDSUCCESSFULLY_PARKAREAID, request.getAreaid());
            return ResponseEntity.ok("Status updated successfully.");
        } catch (Exception e) {
            logger.error(PARK_AREA_STATUS_UPDATE_ERROR);
            throw new ParkAreaStatusUpdateException(PARK_AREA_STATUS_UPDATE_ERROR);
        }
    }

    @GetMapping("/role/user")
    public ResponseEntity<List<Users>> getAllUsersWithRoleUser() {
        try {
            logger.info(LOG_FETCH_USERS_ROLE_USER);
            List<Users> users = parkAreaService.findAllUsersWithRoleUser();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            errorLogger.error(USER_RETRIEVAL_ERROR);
            throw new UserRetrievalException(USER_RETRIEVAL_ERROR);
        }
    }

    @GetMapping("/role/provider")
    public ResponseEntity<List<Users>> getAllProviders() {
        try {
            logger.info(LOG_FETCH_USERS_ROLE_PROVIDER);
            List<Users> users = parkAreaService.findAllUsersWithRoleProviders();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            errorLogger.error(PROVIDER_RETRIEVAL_ERROR);
            throw new ProviderRetrievalException(PROVIDER_RETRIEVAL_ERROR);
        }
    }

    @GetMapping("/available")
    public ResponseEntity<List<ParkAreaDetailsDTO>> getAvailableParkAreas() {
        try {
            logger.info(LOG_FETCH_AVAILABLE_PARK_AREAS);
            List<ParkAreaDetailsDTO> availableParkAreas = parkAreaService.getAvailableParkAreas();
            return ResponseEntity.ok(availableParkAreas);
        } catch (Exception e) {
            errorLogger.error(AVAILABLE_PARK_AREAS_RETRIEVAL_ERROR);
            throw new AvailableParkAreasRetrievalException(AVAILABLE_PARK_AREAS_RETRIEVAL_ERROR);
        }
    }

    @PostMapping("/search")
    public List<ParkAreaDetailsDTO> searchParkAreas(@RequestBody Map<String, String> request) {
        try {
            logger.info(SEARCHING_FOR_PARK_AREA);
            String name = request.get("name");
            return parkAreaService.searchParkAreas(name);
        } catch (Exception e) {
            errorLogger.error(SEARCH_PARK_AREAS_ERROR);
            throw new SearchParkAreasException(SEARCH_PARK_AREAS_ERROR);
        }
    }

}
