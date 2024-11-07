package org.happiest.ProviderParkingSlot;

import org.junit.jupiter.api.Test;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
public class MainTest {

    @Test
    void contextLoads() {
        // This will test if the application context loads successfully
    }

    @Test
    void main() {
        ProviderParkingSlotApplication.main(new String[] {});
    }

}