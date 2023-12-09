package com.ticketslave.queue.service;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import javax.annotation.PreDestroy;
import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class QueueWebSocketService extends TextWebSocketHandler {

    private final ConcurrentHashMap<String, WebSocketSession> sessions = new ConcurrentHashMap<>();

    // Handle new WebSocket connections
    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        String userId = getUserIdFromSession(session);
        if (userId != null) {
            sessions.put(userId, session);
        }
    }

    // Handle incoming WebSocket messages containing queue numbers
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        try {
            JSONObject jsonMessage = new JSONObject(message.getPayload());
            String userId = getUserIdFromSession(session);
            if (userId != null) {
                // Assume that the message contains a queue number for the user
                int queueNumber = jsonMessage.getInt("queueNumber");
                System.out.println("User with queue number " + queueNumber + " is ready to be dequeued.");
                
                // Here you would add your logic to dequeue the user with the given queue number
                
                // Send a redirect message back to the user after processing
                redirectUser(userId);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Send a redirect message to the user to navigate to a different URL
    private void redirectUser(String userId) {
        WebSocketSession session = sessions.get(userId);
        if (session != null && session.isOpen()) {
            try {
                JSONObject message = new JSONObject();
                message.put("action", "redirect");
                message.put("url", "https://www.ticketslave.org/purchase?userId=" + userId);
                session.sendMessage(new TextMessage(message.toString()));
            } catch (IOException e) {
                System.err.println("Failed to send redirect message to user: " + userId);
            }
        }
    }

    // Extract the user ID from the WebSocket session
    private String getUserIdFromSession(WebSocketSession session) {
        // This method should be implemented to extract the user ID from the session
        // For example, if the user ID is stored in a URI query parameter:
        String query = session.getUri().getQuery();
        // Parse the query and extract the userId parameter
        return parseUserIdFromQuery(query);
    }

    // Placeholder method to parse the user ID from a query string
    private String parseUserIdFromQuery(String query) {
        // Implement this method to parse the user ID from the query string
        return null; // Return the parsed user ID
    }

    @PreDestroy
    public void destroy() {
        // Close all WebSocket sessions gracefully
        sessions.forEach((userId, session) -> {
            try {
                session.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        });
    }
}
