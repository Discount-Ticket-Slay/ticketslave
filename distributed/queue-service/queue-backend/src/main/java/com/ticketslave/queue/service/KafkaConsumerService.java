package com.ticketslave.queue.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class KafkaConsumerService {

    private final WebSocketNotificationService webSocketNotificationService;

    // A thread-safe queue to hold the emails to be processed.
    private final BlockingQueue<String> emailQueue = new LinkedBlockingQueue<>();

    // Executor service to handle scheduled tasks.
    private final ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();

    // Delay between each task.
    private static final int DELAY = 10;

    @Autowired
    public KafkaConsumerService(WebSocketNotificationService webSocketNotificationService) {
        this.webSocketNotificationService = webSocketNotificationService;
    }

    /*
     * Input: None
     * Output: None
     * Description: Initializes the consumer service by starting a scheduled task that
     * will process the emails at fixed intervals (every 10 seconds).
     */
    @PostConstruct
    public void init() {
        scheduler.scheduleAtFixedRate(this::processNextEmail, 0, DELAY, TimeUnit.SECONDS);
    }

    /*
     * Input: email - A string representing the user's email address.
     * Output: None
     * Description: Consumes a message from the Kafka topic and attempts to add it to
     * the blocking queue for later processing.
     */
    @KafkaListener(topics = "randomised-queue", groupId = "queue-group")
    public void consume(String email) {
        boolean offered = emailQueue.offer(email);
        if (!offered) {
            System.err.println("Failed to add email to queue: " + email);
        }
    }

    /*
     * Input: None
     * Output: None
     * Description: Processes the next email in the queue by taking it from the queue
     * and redirecting the user associated with that email.
     */
    private void processNextEmail() {
        try {
            String email = emailQueue.take(); // Blocks until an email is available
            redirectUser(email);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt(); // Restore the interrupted status
            System.err.println("Interrupted while processing email queue.");
        }
    }

    /*
     * Input: email - A string representing the user's email address.
     * Output: None
     * Description: Notifies the frontend via WebSocket to redirect the user
     * associated with the given email.
     */
    private void redirectUser(String email) {
        webSocketNotificationService.notifyFrontend(email);
    }

    /*
     * Input: None
     * Output: None
     * Description: Cleans up resources by shutting down the scheduler service
     * when the bean is being destroyed.
     */
    @PreDestroy
    public void destroy() {
        scheduler.shutdownNow();
        try {
            if (!scheduler.awaitTermination(800, TimeUnit.MILLISECONDS)) {
                scheduler.shutdownNow();
            }
        } catch (InterruptedException e) {
            scheduler.shutdownNow();
        }
    }
}
