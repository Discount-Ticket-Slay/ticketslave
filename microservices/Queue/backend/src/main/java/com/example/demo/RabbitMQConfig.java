package com.example.demo;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.EnableRabbit;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableRabbit // Enable RabbitMQ functionality
public class RabbitMQConfig {

    // Define the queue
    @Bean
    public Queue TicketQueue() {
        return new Queue("ticketQueue");
    }

    // Configure RabbitTemplate
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        // You can customize the RabbitTemplate here if needed
        return rabbitTemplate;
    }
}
