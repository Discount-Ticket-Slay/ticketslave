package com.example.demo.booking;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@Controller
@RequestMapping("booking")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/reserve")
    public ModelAndView reserve() {
        System.out.println("at lest this runs");
        bookingService.startTimer();

        // Save reservation details to the database or in-memory storage if needed

        // Check if the timer has expired and redirect accordingly
        if (bookingService.isTimerExpired()) {
            RedirectView redirectView = new RedirectView("/booking/timeout");
            return new ModelAndView(redirectView);
        }

        // If the timer is still running, stay on the "waiting/reserve" page
        return new ModelAndView("reserve");
    }

    @PostMapping("/submitBooking")
    public ModelAndView submitBooking() {
        // Check if the timer has expired
        if (bookingService.isTimerExpired()) {
            RedirectView redirectView = new RedirectView("/timeout");
            return new ModelAndView(redirectView);
        }

        // Process the booking request (save to the database, etc.)

        // Redirect the user to a confirmation page
        RedirectView redirectView = new RedirectView("/confirmation");
        return new ModelAndView(redirectView);
    }

    @GetMapping("/timeout")
    public ResponseEntity<String> timeout() {
        // Handle the case when the timer has expired
        // Redirect the user to the "timeout" page
        System.out.println("you're too late");
        bookingService.resetTimer();
        return new ResponseEntity<String>("you timed out bro, too late", HttpStatus.NOT_FOUND);
    }

    @GetMapping("/confirmation")
    public String confirmation() {
        // This is the confirmation page after a successful booking
        return "confirmation";
    }
}


