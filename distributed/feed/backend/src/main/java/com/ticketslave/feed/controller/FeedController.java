package com.ticketslave.feed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.MediaType;

import java.util.HashMap;
import java.util.Map;

import com.ticketslave.feed.service.FeedService;

@Controller
@RequestMapping("/feed")
public class FeedController {

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final FeedService feedService;

    @Autowired
    public FeedController(KafkaTemplate<String, String> kafkaTemplate, FeedService feedService) {
        this.feedService = feedService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @GetMapping("/")
    public String home() {
        return "index";
    }

    @GetMapping(value = "/getUserId", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Map<String, String>> getUserId() {
        String userId = feedService.assignUserId();  // Assign userId based on the predefined array

        Map<String, String> response = new HashMap<>();
        response.put("userId", userId);

        return ResponseEntity.ok(response);
    }

    // producer: endpoint to send a message to the message broker, registering the user for the queue
    @PostMapping("/queue")
    public ResponseEntity<String> queueForTickets(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        kafkaTemplate.send("buffered-queue", userId);
        return ResponseEntity.ok("Queued");
    }

}



