package com.ticketslave.buffer.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import com.ticketslave.buffer.websockets.BufferWebSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {

    @Autowired
    BufferWebSocketHandler bufferWebSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {

        System.out.println("Registering WebSocket handlers");
        System.out.println("BufferWebSocketHandler: " + bufferWebSocketHandler);

        registry.addHandler(bufferWebSocketHandler, "/buffer/buffer-updates")
                .setAllowedOrigins("*");

        System.out.println("WebSocket handlers registered");
        System.out.println("Registry: " + registry);
    }
}
