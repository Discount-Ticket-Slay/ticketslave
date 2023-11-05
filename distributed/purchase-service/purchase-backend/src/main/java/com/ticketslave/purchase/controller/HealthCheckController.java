package com.ticketslave.purchase.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/purchase")
public class HealthCheckController {

    @GetMapping("/health")
    public String healthCheck() {
        return "Hello, World!";
    }
    
}