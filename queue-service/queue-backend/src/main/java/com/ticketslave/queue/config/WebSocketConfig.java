package com.ticketslave.queue.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import com.ticketslave.queue.websockets.QueueWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    QueueWebSocketHandler queueWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        System.out.println("Registering WebSocket handlers");
        System.out.println("queueWebSocketHandler: " + queueWebSocketHandler);

        registry.addHandler(queueWebSocketHandler, "/queue/queue-updates")
                .setAllowedOrigins("*");

        System.out.println("WebSocket handlers registered");
        System.out.println("Registry: " + registry);
    }
}
