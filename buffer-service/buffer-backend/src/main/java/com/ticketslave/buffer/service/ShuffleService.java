package com.ticketslave.buffer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.io.IOException;

import com.ticketslave.buffer.websockets.BufferWebSocketHandler;

import java.util.ArrayList;
import java.util.Collections;
import java.util.stream.Collectors;

@Service
public class ShuffleService {

    @Autowired
    private BufferWebSocketHandler webSocketHandler;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private final ArrayList<String> buffer = new ArrayList<>();

    // consumer: listens to userid sent to buffered-queue topic
    @KafkaListener(topics = "buffered-queue", groupId = "randomiser-group")
    public void consume(String userId) {

        System.out.println("Consumed user id: " + userId);
        buffer.add(userId);

        // Converting ArrayList of objects to String
        String listString = buffer.stream()
                                .map(Object::toString)
                                .collect(Collectors.joining(", "));

        // Print the String
        System.out.println(listString);
    }

    // algorithm + producer: randomise and send the userid with their queue to another topic (to be consumed by queue service)
    public void processAndSendUserId() {

        System.out.println("Processing and sending user id called");

        Collections.shuffle(buffer);
        int currentQueueNumber = 1;

        // Converting ArrayList of objects to String
        String listString = buffer.stream()
                                .map(Object::toString)
                                .collect(Collectors.joining(", "));

        // Print the String
        System.out.println(listString);
        
        for (String randomisedUserId : buffer) {

            System.out.println("Sending randomised user id: " + randomisedUserId);
            
            kafkaTemplate.send("randomised-queue", randomisedUserId);

            // Send WebSocket message to the frontend
            String message = "{\"userId\":\"" + randomisedUserId + "\",\"queueNumber\":" + currentQueueNumber + "}";

            try {
                webSocketHandler.sendMessageToUser(randomisedUserId, message);
            } catch (IOException e) {
                System.out.println("Issues sending WebSocket connection: " + e.getMessage());
            }

            currentQueueNumber++; // increment queue number
            
        }
        buffer.clear();
    }
}
