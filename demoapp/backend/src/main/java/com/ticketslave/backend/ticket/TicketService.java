package com.ticketslave.backend.ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
//import com.ticketslave.backend.purchase.*;
import com.ticketslave.backend.ticketcategory.*;
import com.ticketslave.backend.booking.*;

import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;


@Service
public class TicketService {
    @Autowired
    private TicketRepository TicketRepository;

    // @Autowired
    // private TicketCategoryService TicketCategoryService;
    // @Autowired
    // private PurchaseService PurchaseService;
    @Autowired
    private BookingService BookingService;

    public List<Ticket> getAllTickets() {
        return TicketRepository.findAll();
    }

    public Ticket createTicket(Ticket Ticket) {
        
        return TicketRepository.save(Ticket);
    }
    public Ticket createTicketUsingCategory(TicketCategory TicketCategory) {
        Ticket ticket = new Ticket(TicketCategory);
        //hardcode
        setRowChar(ticket, 'a');
        return TicketRepository.save(ticket);
    }
    public Ticket findTicket(Long id) {
        return TicketRepository.findById(id).orElse(null);
    }
    public Ticket setRowChar(Ticket ticket, char row) {
        ticket.setRowChar(row);
        return TicketRepository.save(ticket);
    }

    public Ticket findBySeatNoAndRowChar(int seatNo, char rowChar, Long ticketCategoryId) {
        return TicketRepository.findBySeatNoAndRowChar(seatNo, (rowChar), ticketCategoryId).get(0);
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
    // @Transactional
    // public Ticket updatePurchase (Long id, Long purchaseId) {
    //     Purchase purchase = PurchaseService.findPurchase(purchaseId);
    //     Ticket ticket = findTicket(id);

    //     //function aborts if ticket does not exist, purchase does not exist, or if ticket is already reserved by someone else
    //     if (ticket == null || purchase == null || ticket.getStatus() == true) {
    //         return null;
    //     }
    //     ticket.setStatus(true);
    //     ticket.setPurchase(purchase);
    //     return TicketRepository.save(ticket);
    // }
    @Transactional
    public boolean reserveTicket(Long ticketId, String userEmail) throws OptimisticLockException {
        Ticket ticket = findTicket(ticketId);
        if (ticket.isSold() || ticket.getStatus()) {
            return false;
        }
            ticket.setStatus(true);
            ticket.setUserEmail(userEmail);
            TicketRepository.save(ticket);
        return true;
    }

    @Transactional
    public boolean undoReserveTicket(Long ticketId) throws OptimisticLockException{
        Ticket ticket = findTicket(ticketId);
        if (ticket.isSold() || !ticket.getStatus()) {
            return false;
        }
        ticket.setStatus(false);
        ticket.setUserEmail(null);
        TicketRepository.save(ticket);
        return true;
    }

    @Transactional
    public void purchaseTicket(Ticket ticket) {
        ticket.setSold(true);
        TicketRepository.save(ticket);
    }

    @Transactional
    public void removePurchase(Ticket ticket) {
        ticket.setPurchase(null);
        TicketRepository.save(ticket);
    }
    
    public void completePurchase(List<Ticket> tickets){
        for (Ticket t:tickets){
            t.setSold(true);
            TicketRepository.save(t);
        }
    }

}
