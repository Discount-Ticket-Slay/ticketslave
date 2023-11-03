package com.ticketslave.queue.model;

public class QueueUpdate {
    
    private final String userId;
    private final int queueNumber;
    
    // constructor
    public QueueUpdate(String userId, int queueNumber) {
        this.userId = userId;
        this.queueNumber = queueNumber;
    }

    // getters and setters
    public String getUserId() {
        return userId;
    }

    public int getQueueNumber() {
        return queueNumber;
    }

}