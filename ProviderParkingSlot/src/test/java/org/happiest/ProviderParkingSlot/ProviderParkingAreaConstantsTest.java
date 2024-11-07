package org.happiest.ProviderParkingSlot;


import org.happiest.ProviderParkingSlot.constants.ProviderParkingAreaConstants;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertNotNull;

class ProviderParkingAreaConstantsTest {

    @Test
    void testClassInstantiation() {
        // This test will ensure that the class can be instantiated,
        // though it's not necessary since the class only has static constants
        assertNotNull(new ProviderParkingAreaConstants());
    }
}
