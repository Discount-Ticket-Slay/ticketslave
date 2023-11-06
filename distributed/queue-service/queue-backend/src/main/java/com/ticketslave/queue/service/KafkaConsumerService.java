package com.ticketslave.queue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.ticketslave.queue.websockets.QueueWebSocketHandler;

import javax.annotation.PreDestroy;
import java.io.IOException;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class KafkaConsumerService {

    private final QueueWebSocketHandler queueWebSocketHandler;
    private final BlockingQueue<String> emailQueue = new LinkedBlockingQueue<>();
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
    private static final int DELAY = 10;

    // Flag to control the execution of the scheduled task.
    private volatile boolean processingEnabled = false;

    @Autowired
    public KafkaConsumerService(QueueWebSocketHandler queueWebSocketHandler) {
        this.queueWebSocketHandler = queueWebSocketHandler;
    }

    // Method to start processing emails. Can be called via an admin-triggered action.
    public void startEmailProcessing() {

        if (!processingEnabled) {
            processingEnabled = true;
            scheduler.scheduleAtFixedRate(this::processNextEmail, 0, DELAY, TimeUnit.SECONDS);
        }
    }

    // Method to stop processing emails. Can also be triggered by an admin if needed.
    public void stopEmailProcessing() {
        processingEnabled = false;
    }

    @KafkaListener(topics = "randomised-queue", groupId = "queue-group")
    public void consume(String email) {
        if (!processingEnabled) {
            System.err.println("Email processing not started. Email not queued: " + email);
            return;
        }

        boolean offered = emailQueue.offer(email);
        if (!offered) {
            System.err.println("Failed to add email to queue: " + email);
        }
    }

    private void processNextEmail() {
        if (!processingEnabled) {
            return;
        }
        try {
            String email = emailQueue.take(); // Blocks until an email is available
            redirectUser(email);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Interrupted while processing email queue.");
        }
    }

    private void redirectUser(String email) {
        try {
            queueWebSocketHandler.sendMessageToUser(email, "redirect");
        } catch (IOException e) {
            System.err.println("Failed to send redirect message to user: " + email);
        }
    }

    @PreDestroy
    public void destroy() {
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
