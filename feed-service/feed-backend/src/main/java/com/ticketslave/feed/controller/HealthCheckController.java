package com.ticketslave.feed.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    /* Endpoint: /feed/health
     * Input: None
     * Output: String "Hello, World!"
     * Description: This method returns a String to indicate that the backend is up and running
     * this is essential for the healthchecks from the application load balancer to work
     */
    @GetMapping("/feed/health")
    public String healthCheck() {
        return "Hello, World!";
    }
    
}
