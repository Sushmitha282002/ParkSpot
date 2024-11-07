package org.happiest.ProviderParkingSlot;

import org.happiest.ProviderParkingSlot.model.ParkingSlot;
import org.happiest.ProviderParkingSlot.repository.ParkingSlotRepository;
import org.happiest.ProviderParkingSlot.service.ParkingSlotService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.mockito.Mockito.verify;

public class ParkingSlotServiceTest {

    @Mock
    private ParkingSlotRepository parkingSlotRepository;

    @InjectMocks
    private ParkingSlotService parkingSlotService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testSaveParkingSlot() {
        ParkingSlot slot = new ParkingSlot();
//        slot.setSlotId(1L);
//        slot.setSlotnumber("A1");

        parkingSlotService.saveParkingSlot(slot);

        verify(parkingSlotRepository).save(slot);
    }
}

