package com.ticketslave.purchase.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ticketslave.purchase.ticket.*;

import java.util.*;

import jakarta.transaction.Transactional;
import reactor.netty.channel.AbortedException;


@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository PurchaseRepository;

    @Autowired
    private TicketService TicketService;

    //return all purchases
    public List<Purchase> getAllPurchases() {
        return PurchaseRepository.findAll();
    }

    //return a Purchase object with corresponding Id
    public Purchase findPurchase(Long id) {
        return PurchaseRepository.findById(id).orElse(null);
    }

    //to delete Purchase Object from database
    @Transactional
    public void deletePurchase(Long id) {
        //loadTickets(Event);
        Purchase purchase = findPurchase(id);
        List<Ticket> tickets = purchase.getTicketIds();
        for (Ticket t: tickets) {
            TicketService.undoReserveTicket(t);
            TicketService.removePurchase(t);
        }
        purchase.setTicketIds(null);
        PurchaseRepository.deleteById(id);
    }

    //create blank Purchase object and add to database
    public Purchase createPurchase() {
        Purchase purchase = new Purchase();
        return PurchaseRepository.save(purchase);
    }

    //add ticketId to Purchase object, save to database (INCOMPLETE)
    @Transactional
    public void addTicket(Long id, Long ticketId) throws AbortedException{
        Purchase purchase = findPurchase(id);
        Ticket ticket = TicketService.findTicket(ticketId);
        List<Ticket> tickets = purchase.getTicketIds();
        boolean result = TicketService.reserveTicket(ticketId);
        if (!result) {
            throw new AbortedException("Ticket already reserved by another");
        }
        tickets.add(ticket);
        ticket.setPurchase(purchase);
        PurchaseRepository.save(purchase);
    }

    //switch all corresponding Ticket objects in Purchase object to sold = true
    @Transactional
    public void completePurchase(Long id) throws AbortedException{
        Purchase purchase = findPurchase(id);
        List<Ticket> tickets = purchase.getTicketIds();
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
