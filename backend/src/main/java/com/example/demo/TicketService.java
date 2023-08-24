package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    public List<Ticket> getAllTickets() {
        return ticketRepository.findAll();
    }

    public Ticket createTicket(Ticket Ticket) {
        
        return ticketRepository.save(Ticket);
    }

    public void reserveTicket(Ticket ticket) {
            ticket.setStatus(true);
            ticketRepository.save(ticket);
        // Implement logic to reserve the seat
    }

    public void undoReserveTicket(Ticket ticket) {
        ticket.setStatus(false);
        ticketRepository.save(ticket);
    }
}

