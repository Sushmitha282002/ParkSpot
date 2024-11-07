package org.happiest.ProviderParkingSlot;

import org.happiest.ProviderParkingSlot.exception.*;

import org.junit.jupiter.api.BeforeEach;

import org.junit.jupiter.api.Test;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;

import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.*;

@ActiveProfiles("test")

public class ExceptionTest {

    @Test

    public void testConstructorWithMessage() {

        // Create the exception using the message constructor

        FileStorageException exception = new FileStorageException("File storage error");

        // Verify the message

        assertEquals("File storage error", exception.getMessage());

        // Verify that there is no cause

        assertNull(exception.getCause());

    }

    @Test

    public void testConstructorWithMessageAndCause() {


        // Create a throwable cause

        Throwable cause = new Throwable("Root cause");

        // Create the exception using the message and cause constructor

        FileStorageException exception = new FileStorageException("File storage error", cause);

        // Verify the message

        assertEquals("File storage error", exception.getMessage());

        // Verify the cause

        assertEquals(cause, exception.getCause());

        assertEquals("Root cause", exception.getCause().getMessage());

    }


    private GlobalExceptionHandler globalExceptionHandler;

    @BeforeEach

    public void setUp() {

        globalExceptionHandler = new GlobalExceptionHandler(); // Instantiate the exception handler

    }

    @Test

    public void testHandleUserNotFoundException() {

        // Simulate the UserNotFoundException with a custom message

        UserNotFoundException exception = new UserNotFoundException("User not found");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handleUserNotFoundException(exception);

        // Verify the response status is NOT_FOUND (404)

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("User not found", response.getBody());

    }

    @Test

    public void testMyFileNotFoundException_WithMessage() {

        // Create an exception with a message

        MyFileNotFoundException exception = new MyFileNotFoundException("File not found");

        // Verify that the message is correctly set

        assertEquals("File not found", exception.getMessage());

        // Verify that there is no cause

        assertNull(exception.getCause());

    }

    @Test

    public void testMyFileNotFoundException_WithMessageAndCause() {

        // Create a cause exception

        Throwable cause = new RuntimeException("Underlying cause");

        // Create MyFileNotFoundException with a message and cause

        MyFileNotFoundException exception = new MyFileNotFoundException("File not found", cause);

        // Verify that the message is correctly set

        assertEquals("File not found", exception.getMessage());

        // Verify that the cause is correctly set

        assertEquals(cause, exception.getCause());

    }


    @Test

    public void testUserNotFoundException_WithMessage() {

        // Create an exception with a message

        UserNotFoundException exception = new UserNotFoundException("User not found");

        // Verify that the message is correctly set

        assertEquals("User not found", exception.getMessage());

        // Verify that there is no cause (since the constructor does not accept a cause)

        assertNull(exception.getCause());



    }

    @Test

    public void testAvailableParkAreasRetrievalExceptionMessage() {

        // Given a message

        String message = "Error retrieving available park areas";

        // When the exception is thrown

        AvailableParkAreasRetrievalException exception =

                new AvailableParkAreasRetrievalException(message);

        // Then the exception message should match the given message

        assertEquals(message, exception.getMessage());

    }

    @Test

    public void testExceptionIsThrown() {

        // Given a scenario where park areas retrieval fails

        Exception exception = assertThrows(AvailableParkAreasRetrievalException.class, () -> {

            // Simulate the condition where the exception is thrown

            throw new AvailableParkAreasRetrievalException("Failed to retrieve park areas");

        });

        // Then the exception message should be as expected

        assertEquals("Failed to retrieve park areas", exception.getMessage());

    }

    @Test

    public void testParkAreaStatusUpdateExceptionMessage() {

        // Given a message

        String message = "Error updating park area status";

        // When the exception is thrown

        ParkAreaStatusUpdateException exception =

                new ParkAreaStatusUpdateException(message);

        // Then the exception message should match the given message

        assertEquals(message, exception.getMessage());

    }

    @Test

    public void testExceptionIsThrown1() {

        // Given a scenario where park area status update fails

        Exception exception = assertThrows(ParkAreaStatusUpdateException.class, () -> {

            // Simulate the condition where the exception is thrown

            throw new ParkAreaStatusUpdateException("Failed to update park area status");

        });

        // Then the exception message should be as expected

        assertEquals("Failed to update park area status", exception.getMessage());

    }

    @Test

    public void testPendingParkCountRetrievalExceptionMessage() {

        // Given a message

        String message = "Error retrieving pending park count";

        // When the exception is thrown

        PendingParkCountRetrievalException exception =

                new PendingParkCountRetrievalException(message);

        // Then the exception message should match the given message

        assertEquals(message, exception.getMessage());

    }

    @Test

    public void testExceptionIsThrown3() {

        // Given a scenario where pending park count retrieval fails

        Exception exception = assertThrows(PendingParkCountRetrievalException.class, () -> {

            // Simulate the condition where the exception is thrown

            throw new PendingParkCountRetrievalException("Failed to retrieve pending park count");

        });

        // Then the exception message should be as expected

        assertEquals("Failed to retrieve pending park count", exception.getMessage());

    }

    @Test

    public void testParkAreaStatusUpdateException_WithMessage() {

        // Create an exception with a message

        ParkAreaStatusUpdateException exception = new ParkAreaStatusUpdateException("Status update failed");

        // Verify that the message is correctly set

        assertEquals("Status update failed", exception.getMessage());

        // Verify that there is no cause

        assertNull(exception.getCause());

    }

    @Test

    public void testPendingParkCountRetrievalException_WithMessage() {

        // Create an exception with a message

        PendingParkCountRetrievalException exception = new PendingParkCountRetrievalException("Pending park count retrieval error");

        // Verify that the message is correctly set
        assertEquals("Pending park count retrieval error", exception.getMessage());

        // Verify that there is no cause

        assertNull(exception.getCause());

    }

    @Test

    public void testAvailableParkAreasRetrievalException_WithMessage() {

        // Create an exception with a message

        AvailableParkAreasRetrievalException exception = new AvailableParkAreasRetrievalException("Available park areas retrieval error");

        // Verify that the message is correctly set

        assertEquals("Available park areas retrieval error", exception.getMessage());

        // Verify that there is no cause

        assertNull(exception.getCause());

    }

    @Test

    public void testHandleParkAreaStatusUpdateException() {

        // Simulate the ParkAreaStatusUpdateException

        ParkAreaStatusUpdateException exception = new ParkAreaStatusUpdateException("Status update failed");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handleParkAreaStatusUpdateException(exception);

        // Verify the response status is BAD_REQUEST (400)

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("Status update failed", response.getBody());

    }

    @Test

    public void testHandlePendingParkCountRetrievalException() {

        // Simulate the PendingParkCountRetrievalException

        PendingParkCountRetrievalException exception = new PendingParkCountRetrievalException("Count retrieval error");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handlePendingParkCountRetrievalException(exception);

        // Verify the response status is INTERNAL_SERVER_ERROR (500)

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("Count retrieval error", response.getBody());

    }

    @Test

    public void testHandleAvailableParkAreasRetrievalException() {

        // Simulate the AvailableParkAreasRetrievalException

        AvailableParkAreasRetrievalException exception = new AvailableParkAreasRetrievalException("Park areas retrieval error");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handleAvailableParkAreasRetrievalException(exception);

        // Verify the response status is INTERNAL_SERVER_ERROR (500)

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("Park areas retrieval error", response.getBody());

    }

    @Test

    void testExceptionMessage() {

        // Create an instance of the exception with a custom message

        String errorMessage = "Failed to retrieve provider information.";

        ProviderRetrievalException exception = new ProviderRetrievalException(errorMessage);

        // Assert that the message is correctly set

        assertEquals(errorMessage, exception.getMessage());

    }

    @Test

    void testNullMessage() {

        // Create an instance of the exception with a null message

        ProviderRetrievalException exception = new ProviderRetrievalException(null);

        // Assert that the message is null

        assertNull(exception.getMessage());

    }

    @Test

    void testExceptionMessage1() {

        // Create an instance of the exception with a custom message

        String errorMessage = "Error retrieving pending park areas.";

        PendingParkAreasRetrievalException exception = new PendingParkAreasRetrievalException(errorMessage);

        // Assert that the message is correctly set

        assertEquals(errorMessage, exception.getMessage());

    }

    @Test

    void testNullMessage1() {

        // Create an instance of the exception with a null message

        PendingParkAreasRetrievalException exception = new PendingParkAreasRetrievalException(null);

        // Assert that the message is null

        assertNull(exception.getMessage());

    }

    @Test

    void testExceptionMessage2() {

        // Create an instance of the exception with a custom message

        String errorMessage = "Error searching park areas.";

        SearchParkAreasException exception = new SearchParkAreasException(errorMessage);

        // Assert that the message is correctly set

        assertEquals(errorMessage, exception.getMessage());

    }

    @Test

    void testNullMessage2() {

        // Create an instance of the exception with a null message

        SearchParkAreasException exception = new SearchParkAreasException(null);

        // Assert that the message is null

        assertNull(exception.getMessage());

    }

    @Test

    void testExceptionMessage3() {

        // Create an instance of the exception with a custom message

        String errorMessage = "Error retrieving user.";

        UserRetrievalException exception = new UserRetrievalException(errorMessage);

        // Assert that the message is correctly set

        assertEquals(errorMessage, exception.getMessage());

    }

    @Test

    void testNullMessage3() {

        // Create an instance of the exception with a null message

        UserRetrievalException exception = new UserRetrievalException(null);

        // Assert that the message is null

        assertNull(exception.getMessage());

    }

    @Test

    public void testPendingParkAreasRetrievalException_WithMessage() {

        // Create an exception with a message

        PendingParkAreasRetrievalException exception = new PendingParkAreasRetrievalException("Pending park areas not found");

        // Verify that the message is correctly set

        assertEquals("Pending park areas not found", exception.getMessage());

        // Verify that there is no cause (since the constructor does not accept a cause)

    }

    @Test

    public void testHandleSearchParkAreasException() {

        // Simulate the SearchParkAreasException

        SearchParkAreasException exception = new SearchParkAreasException("Error searching park areas");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handleSearchParkAreasException(exception);

        // Verify the response status is INTERNAL_SERVER_ERROR (500)

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("Error searching park areas", response.getBody());

    }

    @Test

    public void testHandleUserRetrievalException() {

        // Simulate the UserRetrievalException

        UserRetrievalException exception = new UserRetrievalException("User retrieval error");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handleUserRetrievalException(exception);

        // Verify the response status is INTERNAL_SERVER_ERROR (500)

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("User retrieval error", response.getBody());

    }

    @Test

    public void testHandleProviderRetrievalException() {

        // Simulate the ProviderRetrievalException

        ProviderRetrievalException exception = new ProviderRetrievalException("Provider retrieval error");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handleProviderRetrievalException(exception);

        // Verify the response status is INTERNAL_SERVER_ERROR (500)

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("Provider retrieval error", response.getBody());

    }

    @Test

    public void testHandlePendingParkAreasRetrievalException() {

        // Simulate the PendingParkAreasRetrievalException

        PendingParkAreasRetrievalException exception = new PendingParkAreasRetrievalException("Pending park areas not found");

        // Call the exception handler method

        ResponseEntity<String> response = globalExceptionHandler.handlePendingParkAreasRetrievalException(exception);

        // Verify the response status is INTERNAL_SERVER_ERROR (500)

        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());

        // Verify the response body contains the correct exception message

        assertEquals("Pending park areas not found", response.getBody());

    }


}


