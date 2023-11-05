package com.ticketslave.purchase.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheckController {

    @GetMapping("/purchase/health")
    public String healthCheck() {
        return "Hello, World!";
    }
    
}