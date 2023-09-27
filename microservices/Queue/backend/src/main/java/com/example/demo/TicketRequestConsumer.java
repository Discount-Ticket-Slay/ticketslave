package com.example.demo;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class TicketRequestConsumer {

    private final TicketService ticketBookingService;

    @Autowired
    public TicketRequestConsumer(TicketService ticketBookingService) {
        this.ticketBookingService = ticketBookingService;
    }

    // @RabbitListener(queues = "ticketQueue")
    // public void processTicketRequest(String ticketRequest) {
    //     String ticketName = ticketBookingService.requestTicket(ticketRequest);
        
    //     if (ticketName == "manoj" ) {
    //         System.out.println("congrats you're out of queue");
    //     } else {
    //         System.out.println("lmao good luck");
    //     }
    // }
}
