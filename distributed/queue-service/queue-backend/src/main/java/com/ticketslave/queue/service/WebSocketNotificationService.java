package com.ticketslave.queue.service;

import org.springframework.stereotype.Service;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Service
public class WebSocketNotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public WebSocketNotificationService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    public void notifyFrontend(String email) {
        // Notify the frontend using a WebSocket
        messagingTemplate.convertAndSend("/topic/redirectUser", email);
    }
}
