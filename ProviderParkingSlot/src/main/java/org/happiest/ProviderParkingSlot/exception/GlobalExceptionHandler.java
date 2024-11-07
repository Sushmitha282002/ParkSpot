package org.happiest.ProviderParkingSlot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }

    @ExceptionHandler(ParkAreaStatusUpdateException.class)
    public ResponseEntity<String> handleParkAreaStatusUpdateException(ParkAreaStatusUpdateException ex) {
        return ResponseEntity.badRequest().body(ex.getMessage());
    }

    @ExceptionHandler(PendingParkAreasRetrievalException.class)
    public ResponseEntity<String> handlePendingParkAreasRetrievalException(PendingParkAreasRetrievalException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(PendingParkCountRetrievalException.class)
    public ResponseEntity<String> handlePendingParkCountRetrievalException(PendingParkCountRetrievalException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(ProviderRetrievalException.class)
    public ResponseEntity<String> handleProviderRetrievalException(ProviderRetrievalException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(UserRetrievalException.class)
    public ResponseEntity<String> handleUserRetrievalException(UserRetrievalException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(SearchParkAreasException.class)
    public ResponseEntity<String> handleSearchParkAreasException(SearchParkAreasException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

    @ExceptionHandler(AvailableParkAreasRetrievalException.class)
    public ResponseEntity<String> handleAvailableParkAreasRetrievalException(AvailableParkAreasRetrievalException ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ex.getMessage());
    }

}
