package com.ticketslave.feed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.context.annotation.Bean;

@RestController
@RequestMapping("/route")
public class RouteController {

    @Autowired
    private RestTemplate restTemplate;

    // Endpoint to directly call the target microservice's API
    @GetMapping("/purchase")
    public ResponseEntity<String> purchase() {

        // Call the target microservice's API
        String targetServiceUrl = "http://purchase:8081/api-endpoint"; // edit to specific endpoint
        ResponseEntity<String> response = restTemplate.getForEntity(targetServiceUrl, String.class);

        // Return the response content to the user
        return ResponseEntity.ok(response.getBody());
    }

    // Bean definition for RestTemplate
    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
