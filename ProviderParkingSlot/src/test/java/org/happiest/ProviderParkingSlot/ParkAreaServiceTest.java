package org.happiest.ProviderParkingSlot;

import org.happiest.ProviderParkingSlot.model.ParkArea;

import org.happiest.ProviderParkingSlot.dto.ParkAreaDetailsDTO;

import org.happiest.ProviderParkingSlot.model.Users;

import org.happiest.ProviderParkingSlot.repository.ParkRepo;

import org.happiest.ProviderParkingSlot.repository.ParkingSlotRepository;
import org.happiest.ProviderParkingSlot.repository.UserRepo;

import org.happiest.ProviderParkingSlot.service.ParkAreaService;

import org.happiest.ProviderParkingSlot.service.ParkingSlotService;

import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;

import org.mockito.Mock;

import org.mockito.MockitoAnnotations;


import java.util.ArrayList;

import java.util.Arrays;

import java.util.List;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;

class ParkAreaServiceTest {

    @InjectMocks

    private ParkAreaService parkAreaService;

    // Ensure this is present

    @Mock

    private UserRepo userRepo;

    @Mock

    private ParkRepo parkRepo;

    @Mock
    private ParkingSlotRepository parkingSlotRepository;


    @Mock

    private ParkingSlotService parkingSlotService;

    private ParkArea parkArea;

    private Users user;

    @BeforeEach

    void setUp() {

        MockitoAnnotations.openMocks(this);

        user = new Users();

        user.setId(1);

        parkArea = new ParkArea();

        parkArea.setAreaid(1);

        parkArea.setUser(user);

        parkArea.setTotalslots("10"); // Assuming totalslots is a String

    }

    @BeforeEach

    void setUp1() {

        MockitoAnnotations.openMocks(this);

    }


    @Test

    void testFindAllPending() {

        List<ParkArea> parkAreas = new ArrayList<>();

        parkAreas.add(parkArea);

        when(parkRepo.findAllByStatusNative(0)).thenReturn(parkAreas);

        List<ParkArea> result = parkAreaService.findAllPending();

        assertEquals(1, result.size());

        verify(parkRepo, times(1)).findAllByStatusNative(0);

    }

    @Test

    void testCountPendingParkAreas() {

        when(parkRepo.countByStatus(0)).thenReturn(5);

        int count = parkAreaService.countPendingParkAreas();

        assertEquals(5, count);

        verify(parkRepo, times(1)).countByStatus(0);

    }

    @Test

    void testFindAllUsersWithRoleProviders() {

        // Arrange

        Users user1 = new Users();

        user1.setId(1);

        user1.setRole("provider");

        Users user2 = new Users();

        user2.setId(2);

        user2.setRole("provider");

        List<Users> expectedUsers = Arrays.asList(user1, user2);

        when(userRepo.findByRole("provider")).thenReturn(expectedUsers); // Mock the repository method

        // Act

        List<Users> actualUsers = parkAreaService.findAllUsersWithRoleProviders(); // Call the service method

        // Assert

        assertEquals(expectedUsers.size(), actualUsers.size()); // Assert the size matches

        assertEquals(expectedUsers.get(0).getId(), actualUsers.get(0).getId()); // Assert the first user matches

        assertEquals(expectedUsers.get(1).getId(), actualUsers.get(1).getId()); // Assert the second user matches

        verify(userRepo, times(1)).findByRole("provider"); // Verify method was called once

    }




    @Test

    void testGetAvailableParkAreas() {

        // Assuming you have a mock implementation for available areas

        when(parkRepo.findAllAvailableParkAreasWithDetails()).thenReturn(new ArrayList<>());

        List<ParkAreaDetailsDTO> result = parkAreaService.getAvailableParkAreas();

        assertNotNull(result);

        verify(parkRepo, times(1)).findAllAvailableParkAreasWithDetails();

    }

    @Test

    void testSearchParkAreas() {

        // Mock a search

        List<ParkAreaDetailsDTO> searchResults = new ArrayList<>();

        when(parkRepo.findByAreanameContainingIgnoreCase("Park")).thenReturn(searchResults);

        List<ParkAreaDetailsDTO> result = parkAreaService.searchParkAreas("Park");

        assertNotNull(result);

        verify(parkRepo, times(1)).findByAreanameContainingIgnoreCase("Park");

    }

    @Test

    void testFindAllUsersWithRoleUser() {

        // Arrange

        Users user1 = new Users();

        user1.setId(1);

        user1.setRole("user");

        Users user2 = new Users();

        user2.setId(2);

        user2.setRole("user");

        List<Users> expectedUsers = Arrays.asList(user1, user2);

        when(userRepo.findAllByRole("user")).thenReturn(expectedUsers);

        // Act

        List<Users> actualUsers = parkAreaService.findAllUsersWithRoleUser();

        // Assert

        assertEquals(expectedUsers.size(), actualUsers.size());

        assertEquals(expectedUsers.get(0).getId(), actualUsers.get(0).getId());

        assertEquals(expectedUsers.get(1).getId(), actualUsers.get(1).getId());

        verify(userRepo, times(1)).findAllByRole("user"); // Verify the interaction with the repository

    }

    @Test

    void testUpdateParkAreaStatusNative_Success() {

        // Arrange

        when(parkRepo.findById(1)).thenReturn(Optional.of(parkArea));

        // Act

        parkAreaService.updateParkAreaStatusNative(1, 1);

        // Assert

        assertEquals(1, parkArea.getStatus()); // Ensure the status is updated

        verify(parkRepo, times(1)).updateParkAreaStatusNative(1, 1); // Verify native update was called

        verify(parkRepo, times(1)).save(parkArea); // Verify save was called

        // If you want to check if createParkingSlots was called,

        // you could use a spy like this:

        // verify(parkAreaService, times(1)).createParkingSlots(parkArea);

    }

//    @Test
//    void testSaveParkingSlot() {
//        // Arrange
//        ParkingSlot parkingSlot = new ParkingSlot();
//        // Set any necessary fields on the parkingSlot object here
//
//        // Act
//        parkingSlotService.saveParkingSlot(parkingSlot);
//
//        // Assert
//        verify(parkingSlotRepository, times(1)).save(parkingSlot); // Verify save was called once
//    }


}

