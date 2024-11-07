package org.happiest.capstone_microserviceauth.connect;

import org.happiest.capstone_microserviceauth.dto.*;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@FeignClient("http://CapstoneBookingMicroservice/bookings")
public interface CapstoneBookingMicroserviceInterface {

    @PostMapping("/creatingbook")
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest bookingRequest);

    @PostMapping("/checkout")
    public ResponseEntity<Booking> checkoutBooking(@RequestBody CheckoutRequest checkoutRequest);

    @PostMapping("/cancel")
    public ResponseEntity<String> cancelBooking(@RequestBody CancelBookingRequest cancelrequest);

    @GetMapping("/{userId}/details")
    public ResponseEntity<List<BookingDetailsDTO>> getBookingDetails(@PathVariable int userId);

    @PostMapping("/process")
    public ResponseEntity<String> processPayment(@RequestBody PaymentDTO paymentDTO);

    @GetMapping("/pay/user/{userId}")
    public ResponseEntity<List<PaymentDetailsDTO>> getPaymentDetailsByUserId(@PathVariable int userId);

    @GetMapping("/last7days")
    public Map<LocalDate, Long> getBookingCountForLast7Days();


}
