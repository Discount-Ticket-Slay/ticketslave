package com.ticketslave.feed.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/feed/health")
    public String healthCheck() {
        return "Hello, World!";
    }
    
}
