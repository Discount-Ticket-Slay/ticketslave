package com.ticketslave.queue.websockets;

import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class QueueWebSocketHandler extends TextWebSocketHandler {

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
            System.out
                    .println("WebSocketHandler: Session URI query split: " + session.getUri().getQuery().split("=")[1]);

            // Store the new session in the ConcurrentHashMap
            sessions.put(userId, session);

            System.out.println("WebSocketHandler: New session established for userId: " + userId);

        } catch (NullPointerException e) {
            System.out.println("Error getting URI");
        }

    }

    // This method is called whenever a WebSocket connection is closed
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        // Log the close status
        System.out.println(
                "WebSocketHandler: Connection closed. Status: " + status.getCode() + " - " + status.getReason());

        // Log whether the session is still open (should be false)
        System.out.println("WebSocketHandler: Session is open: " + session.isOpen());

        // Attempt to extract the userId from the session URI
        try {
            String userId = session.getUri().getQuery().split("=")[1];

            // Log the user ID for the closed session
            System.out.println("WebSocketHandler: Session closed for userId: " + userId);

            // Remove the session from the ConcurrentHashMap
            sessions.remove(userId);

        } catch (Exception e) {
            // This catches any exception, not just NullPointerException,
            // to ensure we see errors related to other issues as well
            System.out.println("WebSocketHandler: Error during session closure: " + e.getMessage());
        }

        // Additionally, you might want to log the entire session to check if there's
        // more relevant info
        System.out.println("WebSocketHandler: Closed session info: " + session.toString());
    }

    // Method to send a message to a specific user via WebSocket
    public void sendMessageToUser(String userId, String message) throws IOException {

        // Retrieve the session for the given userId
        WebSocketSession session = sessions.get(userId);

        System.out.println("WebSocketHandler: Attempting to sending message to userId: " + userId);

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
