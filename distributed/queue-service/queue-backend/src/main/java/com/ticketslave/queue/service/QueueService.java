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

    @Autowired
    private TimerService timer;
    public void dequeueAll() {
        timer.startTimer();
        while (true) {
            if (timer.isTimerExpired()) {
                dequeueOne();
                timer.resetTimer();
            }
        }
    }
    // Listen for messages from the Kafka queue (topic: randomised-queue)
    @KafkaListener(topics = "randomised-queue", groupId = "queue-group")
    public void dequeueOne() {

    }
}
