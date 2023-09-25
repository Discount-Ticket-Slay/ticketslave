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

    @Transactional
    public void deletePurchase(Long id) {
        //loadTickets(Event);
        Purchase purchase = findPurchase(id);
        List<Ticket> tickets = purchase.getTickets();
        for (Ticket t: tickets) {
            TicketService.undoReserveTicket(t);
            TicketService.removePurchase(t);
        }
        purchase.setTickets(null);
        PurchaseRepository.deleteById(id);
    }

    public Purchase createPurchase() {
        Purchase purchase = new Purchase();
        return PurchaseRepository.save(purchase);
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

    @Transactional
    public void removeTicket(Long id, Long ticketId) throws AbortedException{
        Purchase purchase = findPurchase(id);
        Ticket ticket = TicketService.findTicket(ticketId);
        List<Ticket> tickets = purchase.getTickets();
        boolean result = TicketService.undoReserveTicket(ticketId);
        if (!result) {
            throw new AbortedException("Ticket reserve could not be undone");
        }
        tickets.remove(ticket);
//purchase.setTickets(tickets);
    ticket.setPurchase(null);
        PurchaseRepository.save(purchase);
    }

    @Transactional
    public void completePurchase(Long id) throws AbortedException{
        Purchase purchase = findPurchase(id);
        List<Ticket> tickets = purchase.getTickets();
        for (Ticket t: tickets) {
            if (t.isSold() || !t.getStatus()) {
                throw new AbortedException("Purchase aborted, one of your tickets timed out");
            }
        }
        for (Ticket t: tickets) {
            TicketService.purchaseTicket(t);
        }

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
