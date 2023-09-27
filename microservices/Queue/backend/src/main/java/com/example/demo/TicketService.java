package com.example.demo;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TicketService {

    private final RabbitTemplate rabbitTemplate;

    //private TicketRequestConsumer ticketConsumer ;

    @Autowired
    public TicketService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public String requestTicket(String ticket) {
        rabbitTemplate.convertAndSend("ticketQueue", ticket);
        //ticketConsumer.processTicketRequest(ticket);
        return ticket;
    }
}

