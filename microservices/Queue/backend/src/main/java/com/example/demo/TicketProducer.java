package com.example.demo;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketProducer {
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    public TicketProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendTicketRequest(String ticket) {
        // Publish the ticket request message to the "ticketQueue"
        rabbitTemplate.convertAndSend("ticketQueue", ticket);
    }
}


