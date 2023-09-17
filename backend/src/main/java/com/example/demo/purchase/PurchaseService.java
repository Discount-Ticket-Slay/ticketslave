package com.example.demo.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.example.demo.ticket.*;

import jakarta.transaction.Transactional;
import reactor.netty.channel.AbortedException;


@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository PurchaseRepository;

    @Autowired
    private TicketService TicketService;

    public List<Purchase> getAllPurchases() {
        return PurchaseRepository.findAll();
    }

    public Purchase findPurchase(Long id) {
        return PurchaseRepository.findById(id).orElse(null);
    }

    public void deletePurchase(Long id) throws IllegalArgumentException{
        //loadTickets(Event);
        PurchaseRepository.deleteById(id);
    }

    public Purchase createPurchase(Purchase Purchase) {
        
        return PurchaseRepository.save(Purchase);
    }
    @Transactional
    public void addTicket(Long id, Long ticketId) throws AbortedException{
        Purchase purchase = findPurchase(id);
        Ticket ticket = TicketService.findTicket(ticketId);
        List<Ticket> tickets = purchase.getTickets();
        boolean result = TicketService.reserveTicket(ticketId);
        if (!result) {
            throw new AbortedException("Ticket already reserved by another");
        }
        tickets.add(ticket);
        ticket.setPurchase(purchase);
        PurchaseRepository.save(purchase);
    }

    

    // public Purchase addPurchase ( Long id, Long ticketId) {
    //     Purchase purchase = findPurchase(id);
    //     Ticket ticket = TicketService.findTicket(ticketId);
    //     if (purchase == null || ticket == null || ticket.getStatus() == true) {
    //         return null;
    //     }
    //     purchase.addTicket(ticket);
    //     return PurchaseRepository.save(purchase);
    // }
}
