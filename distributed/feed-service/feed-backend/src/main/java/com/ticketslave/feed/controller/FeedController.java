package com.ticketslave.feed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ticketslave.feed.security.JwtService;

import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

@Controller
@RequestMapping("/feed")
public class FeedController {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final JwtService jwtService;

    /*
     * Constructor: Initialises the FeedController with KafkaTemplate and
     * FeedService
     * Input: kafkaTemplate, jwtService
     * Output: None
     * Description: This constructor initialises the FeedController with the
     * provided KafkaTemplate and FeedService
     */
    @Autowired
    public FeedController(KafkaTemplate<String, String> kafkaTemplate, JwtService jwtService) {
        this.kafkaTemplate = kafkaTemplate;
        this.jwtService = jwtService;
    }

    /*
     * Endpoint: /feed
     * Input: None
     * Output: String "index"
     * Description: This method returns the home page view using Thymeleaf
     */
    @GetMapping()
    public String home() {
        return "index";
    } 

    /*
     * Endpoint: /feed/email
     * Input: HttpServletRequest (from client)
     * Output: ResponseEntity<String> with user email or error message
     * Description: This method attempts to retrieve the user's email from a JWT
     * token.
     * If the token is valid, it returns the email address associated with that
     * token.
     * If the token is invalid or not present, it returns an HTTP 401 Unauthorized
     * error.
     * In case of any exception during the process, it returns an HTTP 500 Internal
     * Server Error.
     */
    @GetMapping("/email")
    public ResponseEntity<String> getUserEmail(HttpServletRequest request) {
        try {
            // Extract the JWT token from the request cookies
            String jwtToken = jwtService.extractTokenFromCookies(request);

            // If the token is found and valid, extract the email
            if (jwtToken != null && jwtService.verifyToken(jwtToken)) {
                String email = jwtService.getEmailFromToken(jwtToken);
                return ResponseEntity.ok(email);
            } else {
                // If the token is not found or not valid, return an unauthorized error
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or missing JWT token.");
            }
        } catch (Exception e) {
            // Handle exceptions and return an appropriate response
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred while processing the JWT token.");
        }
    }

    /*
     * Endpoint: /feed/queue
     * Input: payload (Map containing user ID)
     * Output: ResponseEntity with status message
     * Description: This method queues a user for tickets by sending a message to
     * the message broker
     */
    @PostMapping("/queue")
    public ResponseEntity<String> queueForTickets(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        kafkaTemplate.send("buffered-queue", userId);
        return ResponseEntity.ok("Queued");
    }

}
