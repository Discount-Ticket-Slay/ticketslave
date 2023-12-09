package com.ticketslave.queue.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.ticketslave.queue.service.KafkaConsumerService;
import org.springframework.beans.factory.annotation.Autowired;

import jakarta.servlet.http.HttpServletRequest;
import com.ticketslave.queue.security.JwtService;
import org.springframework.beans.factory.annotation.Value;


@Controller
@RequestMapping("/queue")
public class QueueController {

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;
    private final KafkaConsumerService kafkaConsumerService;
    private final JwtService jwtService;

    @Autowired
    public QueueController(KafkaConsumerService kafkaConsumerService, JwtService jwtService) {
        this.kafkaConsumerService = kafkaConsumerService;
        this.jwtService = jwtService;
    }

    @GetMapping()
    public String home() {
        return "index";
    }

    // admin endpoints
    @PostMapping("/start-processing")
    public ResponseEntity<String> startProcessing(HttpServletRequest request) {

        String jwtToken = jwtService.extractTokenFromCookies(request);

        if (jwtToken != null && jwtService.getEmailFromToken(jwtToken).equals(adminEmail)) {
            kafkaConsumerService.startEmailProcessing();
            return ResponseEntity.ok("Processing started.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access.");
        }
    }

    @PostMapping("/stop-processing")
    public ResponseEntity<String> stopProcessing(HttpServletRequest request) {
        String jwtToken = jwtService.extractTokenFromCookies(request);
        if (jwtToken != null && jwtService.getEmailFromToken(jwtToken).equals(adminEmail)) {
            kafkaConsumerService.stopEmailProcessing();
            return ResponseEntity.ok("Processing stopped.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access.");
        }
    }

}

