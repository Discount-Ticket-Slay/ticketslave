package com.ticketslave.queue.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.ticketslave.queue.websockets.QueueWebSocketHandler;

import javax.annotation.PreDestroy;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class KafkaConsumerService {

    private final QueueWebSocketHandler queueWebSocketHandler;
    private final List<String> emailBuffer = Collections.synchronizedList(new ArrayList<>());
    private final BlockingQueue<String> emailQueue = new LinkedBlockingQueue<>();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private static final int DELAY = 10; // 10 second delay between processing each email

    // Flag to control the execution of the scheduled task.
    private volatile boolean processingEnabled = false;

    @Autowired
    public KafkaConsumerService(QueueWebSocketHandler queueWebSocketHandler) {
        this.queueWebSocketHandler = queueWebSocketHandler;
    }

    // Method to start processing emails. Can be called via an admin-triggered action.
    public void startEmailProcessing() {
        System.out.println("Starting email processing.");
        synchronized (emailBuffer) {
            if (!processingEnabled) {
                processingEnabled = true;
                emailQueue.addAll(emailBuffer); // Transfer buffered emails to the processing queue
                emailBuffer.clear(); // Clear the buffer
                System.out.println("Scheduling email processing.");
                scheduler.scheduleAtFixedRate(this::processNextEmail, 0, DELAY, TimeUnit.SECONDS);
                System.out.println("Email processing scheduled.");
            }
        }
    }

    // Method to stop processing emails. Can also be triggered by an admin if needed.
    public void stopEmailProcessing() {
        processingEnabled = false;
    }

    @KafkaListener(topics = "randomised-queue", groupId = "randomiser-group")
    public void consume(String email) {
        System.out.println("Consumed email: " + email);
        synchronized (emailBuffer) {
            if (!processingEnabled) {
                System.out.println("Buffering email: " + email);
                emailBuffer.add(email);
            } else {
                emailQueue.offer(email);
            }
        }
    }

    // for debugging
    private void printAllEmails() {
        synchronized (emailBuffer) {
            for (String email : emailBuffer) {
                System.out.println(email);
            }
        }
    }

    private void processNextEmail() {
        if (!processingEnabled || emailBuffer.isEmpty()) {
            return;
        }
        String email;
        synchronized (emailBuffer) {
            if (emailBuffer.isEmpty()) {
                return; // Double-check in case the buffer became empty while waiting for the lock
            }
            email = emailBuffer.remove(0); // Removes the first element in the list (FIFO)
        }
        System.out.println("Processing email + Redirect: " + email);
        redirectUser(email);
    }
    

    private void redirectUser(String email) {
        try {
            System.out.println("Attempting to redirect user: " + email);
            JSONObject message = new JSONObject();
            message.put("userId", email); // Use the correct key for the userId expected by the frontend

            queueWebSocketHandler.sendMessageToUser(email, message.toString());
        } catch (IOException e) {
            System.err.println("Failed to send redirect message to user: " + email);
        }
    }

    @PreDestroy
    public void destroy() {
        System.out.println("Shutting down the email processing.");
        stopEmailProcessing(); // Ensure processing is stopped
        scheduler.shutdownNow();
        try {
            if (!scheduler.awaitTermination(800, TimeUnit.MILLISECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}
