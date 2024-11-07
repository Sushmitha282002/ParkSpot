package org.happiest.ProviderParkingSlot;

import org.happiest.ProviderParkingSlot.controller.ParkAreaController;
import org.happiest.ProviderParkingSlot.exception.*;
import org.happiest.ProviderParkingSlot.model.ParkArea;
import org.happiest.ProviderParkingSlot.dto.ParkAreaDetailsDTO;
import org.happiest.ProviderParkingSlot.model.Users;
import org.happiest.ProviderParkingSlot.service.FileStorageService;
import org.happiest.ProviderParkingSlot.service.ParkAreaService;
import org.happiest.ProviderParkingSlot.repository.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import static org.junit.jupiter.api.Assertions.*;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class ParkAreaControllerTest {

    @Mock
    private ParkAreaService parkAreaService;

    @Mock
    private FileStorageService fileStorageService;

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private ParkAreaController parkAreaController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }


    @Disabled("Reason why this test is disabled")
    @Test


    public void testCreateParkArea() throws Exception {

        // Mocking the MultipartFile

        MultipartFile mockFile = mock(MultipartFile.class);

        when(mockFile.getOriginalFilename()).thenReturn("test.jpg");

        // Mocking the file storage service

        when(fileStorageService.storeFile(any(MultipartFile.class))).thenReturn("test.jpg");

        // Mocking the user repository

        Users mockUser = new Users();

        mockUser.setId(1);

        when(userRepo.findById(anyInt())).thenReturn(Optional.of(mockUser));

        // Mocking the park area service (since it returns void)

        doNothing().when(parkAreaService).createParkArea(any(ParkArea.class));

        // Calling the method under test

        ResponseEntity<?> response = parkAreaController.createParkArea("Test Area", "Test Location", "10", mockFile, 1);

        // Verifying the response

        assertEquals(200, response.getStatusCodeValue());

        verify(fileStorageService, times(1)).storeFile(any(MultipartFile.class));

        verify(userRepo, times(1)).findById(anyInt());

        verify(parkAreaService, times(1)).createParkArea(any(ParkArea.class));

    }
    @Test
    public void testGetPendingParkAreas_Success() {
        // Mocking the service response
        List<ParkArea> mockPendingParkAreas = new ArrayList<>();
        mockPendingParkAreas.add(new ParkArea());
        when(parkAreaService.findAllPending()).thenReturn(mockPendingParkAreas);

        // Calling the method under test
        ResponseEntity<List<ParkArea>> response = parkAreaController.getPendingParkAreas();

        // Verifying the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        verify(parkAreaService, times(1)).findAllPending();
    }

    @Test
    public void testGetPendingParkAreas_Exception() {
        // Mocking the service to throw an exception
        when(parkAreaService.findAllPending()).thenThrow(new RuntimeException());

        // Calling the method under test and expecting an exception
        assertThrows(PendingParkAreasRetrievalException.class, () -> {
            parkAreaController.getPendingParkAreas();
        });

        // Verifying the service method was called
        verify(parkAreaService, times(1)).findAllPending();
    }

    @Test
    public void testGetPendingCount_Success() {
        // Mocking the service response
        int mockCount = 5;
        when(parkAreaService.countPendingParkAreas()).thenReturn(mockCount);

        // Calling the method under test
        ResponseEntity<Integer> response = parkAreaController.getPendingCount();

        // Verifying the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(mockCount, response.getBody());
        verify(parkAreaService, times(1)).countPendingParkAreas();
    }

    @Test
    public void testGetPendingCount_Exception() {
        // Mocking the service to throw an exception
        when(parkAreaService.countPendingParkAreas()).thenThrow(new RuntimeException());

        // Calling the method under test and expecting an exception
        assertThrows(PendingParkCountRetrievalException.class, () -> {
            parkAreaController.getPendingCount();
        });

        // Verifying the service method was called
        verify(parkAreaService, times(1)).countPendingParkAreas();
    }

    @Test
    public void testUpdateParkAreaStatus_Success() {
        // Mocking the request
        ParkArea mockRequest = new ParkArea();
        mockRequest.setAreaid(1);
//        mockRequest.setStatus("Available");

        // No need to mock the service method as it returns void

        // Calling the method under test
        ResponseEntity<String> response = parkAreaController.updateParkAreaStatus(mockRequest);

        // Verifying the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Status updated successfully.", response.getBody());
        verify(parkAreaService, times(1)).updateParkAreaStatusNative(mockRequest.getAreaid(), mockRequest.getStatus());
    }

    @Test
    public void testUpdateParkAreaStatus_Exception() {
        // Mocking the request
        ParkArea mockRequest = new ParkArea();
        mockRequest.setAreaid(1);
//        mockRequest.setStatus("Available");

        // Mocking the service to throw an exception
        doThrow(new RuntimeException()).when(parkAreaService).updateParkAreaStatusNative(mockRequest.getAreaid(), mockRequest.getStatus());

        // Calling the method under test and expecting an exception
        try {
            parkAreaController.updateParkAreaStatus(mockRequest);
        } catch (ParkAreaStatusUpdateException e) {
            // Verifying the exception
            assertEquals(ParkAreaStatusUpdateException.class, e.getClass());
        }

        // Verifying the service method was called
        verify(parkAreaService, times(1)).updateParkAreaStatusNative(mockRequest.getAreaid(), mockRequest.getStatus());
    }


    @Test
    public void testGetAllUsersWithRoleUser_Success() {
        // Mocking the service response
        List<Users> mockUsers = new ArrayList<>();
        mockUsers.add(new Users());
        when(parkAreaService.findAllUsersWithRoleUser()).thenReturn(mockUsers);

        // Calling the method under test
        ResponseEntity<List<Users>> response = parkAreaController.getAllUsersWithRoleUser();

        // Verifying the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        verify(parkAreaService, times(1)).findAllUsersWithRoleUser();
    }

    @Test
    public void testGetAllUsersWithRoleUser_Exception() {
        // Mocking the service to throw an exception
        when(parkAreaService.findAllUsersWithRoleUser()).thenThrow(new RuntimeException());

        // Calling the method under test and expecting an exception
        try {
            parkAreaController.getAllUsersWithRoleUser();
        } catch (UserRetrievalException e) {
            // Verifying the exception
            assertEquals(UserRetrievalException.class, e.getClass());
        }

        // Verifying the service method was called
        verify(parkAreaService, times(1)).findAllUsersWithRoleUser();
    }


    @Test
    public void testGetAllProviders_Success() {
        // Mocking the service response
        List<Users> mockUsers = new ArrayList<>();
        mockUsers.add(new Users());
        when(parkAreaService.findAllUsersWithRoleProviders()).thenReturn(mockUsers);

        // Calling the method under test
        ResponseEntity<List<Users>> response = parkAreaController.getAllProviders();

        // Verifying the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        verify(parkAreaService, times(1)).findAllUsersWithRoleProviders();
    }

    @Test
    public void testGetAllProviders_Exception() {
        // Mocking the service to throw an exception
        when(parkAreaService.findAllUsersWithRoleProviders()).thenThrow(new RuntimeException());

        // Calling the method under test and expecting an exception
        try {
            parkAreaController.getAllProviders();
        } catch (ProviderRetrievalException e) {
            // Verifying the exception
            assertEquals(ProviderRetrievalException.class, e.getClass());
        }

        // Verifying the service method was called
        verify(parkAreaService, times(1)).findAllUsersWithRoleProviders();
    }


    @Test
    public void testGetAvailableParkAreas_Success() {
        // Mocking the service response
        List<ParkAreaDetailsDTO> mockAvailableParkAreas = new ArrayList<>();
        mockAvailableParkAreas.add(new ParkAreaDetailsDTO());
        when(parkAreaService.getAvailableParkAreas()).thenReturn(mockAvailableParkAreas);

        // Calling the method under test
        ResponseEntity<List<ParkAreaDetailsDTO>> response = parkAreaController.getAvailableParkAreas();

        // Verifying the response
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(1, response.getBody().size());
        verify(parkAreaService, times(1)).getAvailableParkAreas();
    }

    @Test
    public void testGetAvailableParkAreas_Exception() {
        // Mocking the service to throw an exception
        when(parkAreaService.getAvailableParkAreas()).thenThrow(new RuntimeException());

        // Calling the method under test and expecting an exception
        try {
            parkAreaController.getAvailableParkAreas();
        } catch (AvailableParkAreasRetrievalException e) {
            // Verifying the exception
            assertEquals(AvailableParkAreasRetrievalException.class, e.getClass());
        }

        // Verifying the service method was called
        verify(parkAreaService, times(1)).getAvailableParkAreas();
    }

    @Test
    public void testSearchParkAreas_Success() {
        // Mocking the service response
        List<ParkAreaDetailsDTO> mockParkAreas = new ArrayList<>();
        mockParkAreas.add(new ParkAreaDetailsDTO());
        when(parkAreaService.searchParkAreas(anyString())).thenReturn(mockParkAreas);

        // Creating the request map
        Map<String, String> request = new HashMap<>();
        request.put("name", "Test Area");

        // Calling the method under test
        List<ParkAreaDetailsDTO> response = parkAreaController.searchParkAreas(request);

        // Verifying the response
        assertEquals(1, response.size());
        verify(parkAreaService, times(1)).searchParkAreas("Test Area");
    }

    @Test
    public void testSearchParkAreas_Exception() {
        // Mocking the service to throw an exception
        when(parkAreaService.searchParkAreas(anyString())).thenThrow(new RuntimeException());

        // Creating the request map
        Map<String, String> request = new HashMap<>();
        request.put("name", "Test Area");

        // Calling the method under test and expecting an exception
        assertThrows(SearchParkAreasException.class, () -> {
            parkAreaController.searchParkAreas(request);
        });

        // Verifying the service method was called
        verify(parkAreaService, times(1)).searchParkAreas("Test Area");
    }
}


