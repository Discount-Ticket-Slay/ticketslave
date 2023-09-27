package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    private final TicketService ticketService;

    @Autowired
    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/request")
    public String requestTicket(@RequestBody String ticket) {
        System.out.println("so lets say a queue ticket has been requested");
        ticketService.requestTicket(ticket);
        return "Ticket request sent: " + ticket;
    }
}

