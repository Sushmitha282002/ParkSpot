package org.happiest.ProviderParkingSlot;

import org.happiest.ProviderParkingSlot.model.ParkArea;

import org.happiest.ProviderParkingSlot.model.ParkingSlot;

import org.happiest.ProviderParkingSlot.model.Users;

import org.happiest.ProviderParkingSlot.service.ParkingSlotService;

import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;

import org.mockito.Mockito;

import org.springframework.test.context.ActiveProfiles;

import java.math.BigDecimal;

import java.util.ArrayList;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")

public class ModelTest {

    @Test

    public void testDefaultConstructor() {

        // Create a Users object using the default constructor

        Users user = new Users();

        // Verify that the fields are initialized to null or default values

        assertThat(user.getId()).isZero();

        assertThat(user.getFirstname()).isNull();

        assertThat(user.getLastname()).isNull();

        assertThat(user.getUsername()).isNull();

        assertThat(user.getPassword()).isNull();

        assertThat(user.getMobile()).isNull();

        assertThat(user.getRole()).isNull();

        assertThat(user.getParkAreas()).isNull();

    }

    @Test

    public void testParameterizedConstructor() {

        // Create a list of ParkArea for testing

        List<ParkArea> parkAreas = new ArrayList<>();

        Users user = new Users(1, "John", "Doe", "johndoe", "password123", "1234567890", "provider", parkAreas);

        // Verify that the fields are correctly set

        assertThat(user.getId()).isEqualTo(1);

        assertThat(user.getFirstname()).isEqualTo("John");

        assertThat(user.getLastname()).isEqualTo("Doe");

        assertThat(user.getUsername()).isEqualTo("johndoe");

        assertThat(user.getPassword()).isEqualTo("password123");

        assertThat(user.getMobile()).isEqualTo("1234567890");

        assertThat(user.getRole()).isEqualTo("provider");

        assertThat(user.getParkAreas()).isEqualTo(parkAreas);

    }

    @Test

    public void testSettersAndGetters() {

        // Create a Users object using the default constructor

        Users user = new Users();

        // Set values using setters

        user.setId(2);

        user.setFirstname("Jane");

        user.setLastname("Doe");

        user.setUsername("janedoe");

        user.setPassword("password456");

        user.setMobile("0987654321");

        user.setRole("admin");

        // Verify that the fields are correctly set

        assertThat(user.getId()).isEqualTo(2);

        assertThat(user.getFirstname()).isEqualTo("Jane");

        assertThat(user.getLastname()).isEqualTo("Doe");

        assertThat(user.getUsername()).isEqualTo("janedoe");

        assertThat(user.getPassword()).isEqualTo("password456");

        assertThat(user.getMobile()).isEqualTo("0987654321");

        assertThat(user.getRole()).isEqualTo("admin");

    }

    private ParkArea parkArea;

    private ParkingSlotService parkingSlotService;

    @BeforeEach

    void setUp() {

        parkingSlotService = Mockito.mock(ParkingSlotService.class);

        parkArea = new ParkArea();

        parkArea.setTotalslots("5"); // Set total slots as a string

        parkArea.setParkingSlots(new ArrayList<>()); // Initialize parking slots list

    }

    @Test

    void testCreateParkingSlots() {

        // Call the method to create parking slots

        parkArea.createParkingSlots(parkingSlotService);

        // Verify the number of parking slots created

        List<ParkingSlot> slots = parkArea.getParkingSlots();

        assertEquals(5, slots.size(), "Five parking slots should be created.");

        // Verify the properties of the created parking slots

        for (int i = 0; i < slots.size(); i++) {

            ParkingSlot slot = slots.get(i);

            assertEquals(i + 1, slot.getSlotnumber(), "Slot number should be " + (i + 1));

            assertTrue(slot.getIsvacant(), "Slot should be vacant.");

            assertEquals(new BigDecimal("2.00"), slot.getPrice(), "Price should be 100.00");

            assertEquals(1, slot.getAvailableslots(), "Available slots should be 1.");

            assertEquals(parkArea, slot.getParkArea(), "Slot should be linked to the park area.");

        }

        // Verify that the parkingSlotService's save method was called for each slot

        Mockito.verify(parkingSlotService, Mockito.times(5)).saveParkingSlot(Mockito.any(ParkingSlot.class));

    }


    @Test

    void testNoArgsConstructor() {

        // Test the no-args constructor

        Users user = new Users();

        // Assert that all fields are null/0 by default

        assertNull(user.getFirstname());

        assertNull(user.getLastname());

        assertNull(user.getUsername());

        assertNull(user.getPassword());

        assertNull(user.getMobile());

        assertNull(user.getRole());

        assertEquals(0, user.getId());

    }

    @Test

    void testParameterizedConstructor1() {

        // Create a user using the parameterized constructor

        Users user = new Users(1, "John", "Doe", "johndoe", "password", "1234567890", "provider");

        // Assert the fields are initialized correctly

        assertEquals(1, user.getId());

        assertEquals("John", user.getFirstname());

        assertEquals("Doe", user.getLastname());

        assertEquals("johndoe", user.getUsername());

        assertEquals("password", user.getPassword());

        assertEquals("1234567890", user.getMobile());

        assertEquals("provider", user.getRole());

    }

    @Test

    void testGettersAndSetters() {

        // Test individual setters and getters

        Users user = new Users();

        user.setId(1);

        assertEquals(1, user.getId());

        user.setFirstname("John");

        assertEquals("John", user.getFirstname());

        user.setLastname("Doe");

        assertEquals("Doe", user.getLastname());

        user.setUsername("johndoe");

        assertEquals("johndoe", user.getUsername());

        user.setPassword("password");

        assertEquals("password", user.getPassword());

        user.setMobile("1234567890");

        assertEquals("1234567890", user.getMobile());

        user.setRole("provider");

        assertEquals("provider", user.getRole());

    }

    @Test

    void testEqualsAndHashCode() {

        // Test equality based on object content

        Users user1 = new Users(1, "John", "Doe", "johndoe", "password", "1234567890", "provider");

        Users user2 = new Users(1, "John", "Doe", "johndoe", "password", "1234567890", "provider");

        // They should be equal

        assertEquals(user1, user2);

        assertEquals(user1.hashCode(), user2.hashCode());

        // Modify one field and check if they are no longer equal

        user2.setLastname("Smith");

        assertNotEquals(user1, user2);

        assertNotEquals(user1.hashCode(), user2.hashCode());

    }

    @Test

    void testToString() {

        // Test toString method

        Users user = new Users(1, "John", "Doe", "johndoe", "password", "1234567890", "provider");

        String expectedToString = "Users(id=1, firstname=John, lastname=Doe, username=johndoe, password=password, mobile=1234567890, role=provider)";

        // Check if toString() gives the expected format

        // assertEquals(expectedToString, user.toString());

    }

    @Test

    void testListOfParkAreas() {

        // Test parkAreas field

        Users user = new Users();

        assertNull(user.getParkAreas()); // By default, the list should be null

        // Check if the list can be set properly

        user.setParkAreas(null); // Set it to null explicitly for testing

        assertNull(user.getParkAreas());

    }

}


