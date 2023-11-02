package com.ticketslave.queue.service;

import org.springframework.stereotype.Service;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import com.ticketslave.queue.model.QueueUpdate;

import java.util.*;

@Service
public class QueueService {

    @Autowired
    private SimpMessagingTemplate template;  // For WebSocket communication

    private final Map<String, Integer> userQueueNumbers = new HashMap<>();

    // Listen for messages from the Kafka queue (topic: randomised-queue)
    @KafkaListener(topics = "randomised-queue", groupId = "queue-group")
    public void admitUser(String userId) {
        
        // Assign a queue number to the user
        int queueNumber = userQueueNumbers.size() + 1;
        userQueueNumbers.put(userId, queueNumber);

        // Create a QueueUpdate object to send as a WebSocket message
        QueueUpdate queueUpdate = new QueueUpdate(userId, queueNumber);

        // Send a WebSocket message to the frontend to notify the user of their queue number
        template.convertAndSend("/topic/queue-updates", queueUpdate);
    }
}
