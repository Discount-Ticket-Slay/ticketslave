package com.example.demo.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.example.demo.ticket.*;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository PurchaseRepository;

    // @Autowired
    // private TicketService TicketService;

    public List<Purchase> getAllPurchases() {
        return PurchaseRepository.findAll();
    }

    public Purchase findPurchase(Long id) {
        return PurchaseRepository.findById(id).orElse(null);
    }

    public Purchase createPurchase(Purchase Purchase) {
        
        return PurchaseRepository.save(Purchase);
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
