package com.ticketslave.buffer.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/buffer/health")
    public String healthCheck() {
        return "Hello, World!";
    }
    
}
