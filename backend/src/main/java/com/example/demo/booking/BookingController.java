package com.example.demo.booking;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class BookingController {

    private final BookingService bookingService;
    
    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/reserve")
    public RedirectView reserve() {
        // Start the timer using BookingService
        bookingService.startTimer();

        // Save reservation details to the database or in-memory storage

        // Redirect the user to a "waiting" page
        return new RedirectView("/waiting");
    }

    @PostMapping("/booking")
    public RedirectView submitBooking() {
        // Check if the timer has expired
        if (bookingService.isTimerExpired()) {
            // Handle the case when the timer has expired
            return new RedirectView("/timeout");
        }

        // Process the booking request (save to the database, etc.)

        // Redirect the user to a confirmation page
        return new RedirectView("/confirmation");
    }

    @GetMapping("/waiting")
    public String waiting() {
        // This is the "waiting" page where the user will be redirected
        return "waiting";
    }

    @GetMapping("/timeout")
    public String timeout() {
        // Handle the case when the timer has expired
        // Redirect the user to the "timeout" page
        return "timeout";
    }

    @GetMapping("/confirmation")
    public String confirmation() {
        // This is the confirmation page after a successful booking
        return "confirmation";
    }
}

