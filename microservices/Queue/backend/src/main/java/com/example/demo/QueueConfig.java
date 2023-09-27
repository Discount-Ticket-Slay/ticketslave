package com.example.demo;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class QueueConfig {
    @Bean
    @Primary
    public Queue ticketQueue() {
        return new Queue("ticketQueue");
    }
}


