package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TicketService {
    @Autowired
    private TicketRepository TicketRepository;

    // @Autowired
    // private TicketCategoryService TicketCategoryService;
    @Autowired
    private PurchaseService PurchaseService;

    public List<Ticket> getAllTickets() {
        return TicketRepository.findAll();
    }

    public Ticket createTicket(Ticket Ticket) {
        
        return TicketRepository.save(Ticket);
    }
    public Ticket createTicketUsingCategory(TicketCategory TicketCategory) {
        Ticket ticket = new Ticket(TicketCategory);
        return TicketRepository.save(ticket);
    }
    public Ticket findTicket(Long id) {
        return TicketRepository.findById(id).orElse(null);
    }

    // public Ticket updateTicketCategory (Long id, Long ticketCategoryId) {
    //     TicketCategory ticketCategory = TicketCategoryService.findTicketCategory(ticketCategoryId);
    //     Ticket ticket = findTicket(id);
    //     if (ticket == null || ticketCategory == null) {
    //         return null;
    //     }
    //     ticket.setTicketCategory(ticketCategory);
    //     return TicketRepository.save(ticket);
    // }

    public Ticket updatePurchase (Long id, Long purchaseId) {
        Purchase purchase = PurchaseService.findPurchase(purchaseId);
        Ticket ticket = findTicket(id);
        if (ticket == null || purchase == null) {
            return null;
        }
        ticket.setPurchase(purchase);
        return TicketRepository.save(ticket);
    }

    public void reserveTicket(Ticket ticket) {
            ticket.setStatus(true);
            TicketRepository.save(ticket);
        // Implement logic to reserve the seat
    }

    public void undoReserveTicket(Ticket ticket) {
        ticket.setStatus(false);
        TicketRepository.save(ticket);
    }
}

