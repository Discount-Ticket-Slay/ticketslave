package com.ticketslave.buffer.websockets;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.TextMessage;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class BufferWebSocketHandler extends TextWebSocketHandler {

    // ConcurrentHashMap to store WebSocket sessions, keyed by userId
    private ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    // This method is called whenever a new WebSocket connection is established
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {

        System.out.println("WebSocketHandler: Session is open: " + session.isOpen());

        // Extract the userId from the session URI
        try {
            String userId = session.getUri().getQuery().split("=")[1];

            System.out.println("WebSocketHandler: Session URI: " + session.getUri());
            System.out.println("WebSocketHandler: Session URI query: " + session.getUri().getQuery());
            System.out.println("WebSocketHandler: Session URI query split: " + session.getUri().getQuery().split("=")[1]);

            // Store the new session in the ConcurrentHashMap
            sessions.put(userId, session);

            System.out.println("WebSocketHandler: New session established for userId: " + userId);

        } catch (NullPointerException e) {
            System.out.println("Error getting URI");
        }

    }

    // Method to send a message to a specific user via WebSocket
    public void sendMessageToUser(String userId, String message) throws IOException {

        // Retrieve the session for the given userId
        WebSocketSession session = sessions.get(userId);

        System.out.println("WebSocketHandler: Sending message to userId: " + userId);

        if (session != null) {
            System.out.println("WebSocketHandler: Session found for userId: " + userId);
            System.out.println("WebSocketHandler: Session state - is open: " + session.isOpen());
            if (session.isOpen()) {
                session.sendMessage(new TextMessage(message));
                System.out.println("WebSocketHandler: Message sent to userId: " + userId);
            } else {
                System.out.println("WebSocketHandler: Session is not open for userId: " + userId);
            }
        } else {
            System.out.println("WebSocketHandler: No session found for userId: " + userId);
        }
        

        // Check if the session is valid and open before sending message
        if (session != null && session.isOpen()) {

            System.out.println("WebSocketHandler: Session is valid and open");

            try {
                session.sendMessage(new TextMessage(message));
                System.out.println("WebSocketHandler: Message sent to userId: " + userId);
            } catch (Exception e) {
                System.out.println("WebSocketHandler: Error sending message: " + e.getMessage());
            }
            
            System.out.println("WebSocketHandler: Message sent to userId: " + userId);
        }
    }
}
