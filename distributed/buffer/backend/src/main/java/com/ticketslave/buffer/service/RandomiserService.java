package com.ticketslave.buffer.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import java.io.IOException;

import com.ticketslave.buffer.websockets.BufferWebSocketHandler;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class RandomiserService {

    @Autowired
    private BufferWebSocketHandler webSocketHandler;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private final ArrayList<String> buffer = new ArrayList<>();
    private static final int MAX_BUFFER_SIZE = 5;

    // consumer: listens to userid sent to buffered-queue topic
    @KafkaListener(topics = "buffered-queue", groupId = "randomiser-group")
    public void consume(String userId) {
        buffer.add(userId);

        if (buffer.size() >= MAX_BUFFER_SIZE) {
            processAndSendUserId();
        }
    }

    // algorithm + producer: randomise and send the userid with their queue to another topic (to be consumed by queue service)
    public void processAndSendUserId() {

        Collections.shuffle(buffer);
        int currentQueueNumber = 1;
        for (String randomisedUserId : buffer) {
            
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
