package com.example.demo.queue;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

@Configuration
public class RabbitMQConfig {

    // Define a queue bean with a specific name
    @Bean
    public Queue myQueue() {
        return new Queue("testQueue");
    }
}

