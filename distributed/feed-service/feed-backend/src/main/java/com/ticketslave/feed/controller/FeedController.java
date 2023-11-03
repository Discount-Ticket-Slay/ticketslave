package com.ticketslave.feed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Map;

@Controller
@RequestMapping("/feed")
public class FeedController {

    private final KafkaTemplate<String, String> kafkaTemplate;

    /* Constructor: Initialises the FeedController with KafkaTemplate and FeedService
     * Input: kafkaTemplate, feedService
     * Output: None
     * Description: This constructor initialises the FeedController with the provided KafkaTemplate and FeedService
     */
    @Autowired
    public FeedController(KafkaTemplate<String, String> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    /* Endpoint: /feed/
     * Input: None
     * Output: String "index"
     * Description: This method returns the home page view using Thymeleaf
     */
    @GetMapping("/")
    public String home() {
        return "index";
    }

    /* Endpoint: /feed/queue
     * Input: payload (Map containing user ID)
     * Output: ResponseEntity with status message
     * Description: This method queues a user for tickets by sending a message to the message broker
     */
    @PostMapping("/queue")
    public ResponseEntity<String> queueForTickets(@RequestBody Map<String, String> payload) {
        String userId = payload.get("userId");
        kafkaTemplate.send("buffered-queue", userId);
        return ResponseEntity.ok("Queued");
    }

}
