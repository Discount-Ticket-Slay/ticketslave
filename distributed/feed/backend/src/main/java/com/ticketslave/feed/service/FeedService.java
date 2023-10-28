package com.ticketslave.feed.service;

import org.springframework.stereotype.Service;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class FeedService {
    private AtomicInteger userCounter = new AtomicInteger(0);
    private final String[] userIDs = {"A", "B", "C", "D", "E"}; // for demonstration purposes

    public String assignUserId() {
        int index = userCounter.getAndIncrement();
        if (index < userIDs.length) {
            return userIDs[index];
        }
        return "INVALID";  // Exceeded the number of available user IDs
    }
}
