package com.ticketslave.purchase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ticketslave.purchase.repository.*;
import com.ticketslave.purchase.booking.*;
import com.ticketslave.purchase.model.*;
import com.ticketslave.purchase.controller.*;
import java.util.*;

import jakarta.persistence.OptimisticLockException;
import jakarta.transaction.Transactional;


@Service
public class TicketService {
    @Autowired
    private TicketRepository TicketRepository;
    @Autowired
    private BookingService BookingService;

    public List<Ticket> getAllTickets() {
        return TicketRepository.findAll();
    }

    //creates a blank Ticket object
    public Ticket createTicket(Ticket Ticket) {
        return TicketRepository.save(Ticket);
    }

    //Searches database for Ticket object that corresponds to Id, returns it
    public Ticket findTicket(Long id) {
        return TicketRepository.findById(id).orElse(null);
    }
    @Transactional
    public void setRowChar(Ticket ticket, char row) {
        ticket.setRowChar(row);
    }

    //Searches database for Ticket object that corresponds to seatNo, rowChar, ticketCategoryId, returns it
    public Ticket findBySeatNoAndRowChar(int seatNo, char rowChar, Long ticketCategoryId) {
        return TicketRepository.findBySeatNoAndRowChar(seatNo, (rowChar), ticketCategoryId).get(0);
    }

    //switches Ticket object's status to true
    @Transactional
    public boolean reserveTicket(Long ticketId) throws OptimisticLockException {
        Ticket ticket = findTicket(ticketId);
        if (ticket.isSold() || ticket.getStatus()) {
            return false;
        }
            ticket.setStatus(true);
            TicketRepository.save(ticket);
        return true;
    }

    //switches Ticket object's isSold to true
    @Transactional
    public void purchaseTicket(Ticket ticket) {
        ticket.setSold(true);
        TicketRepository.save(ticket);
    }

    //switches Ticket object's status to false
    @Transactional
    public void undoReserveTicket(Ticket ticket) {
        ticket.setStatus(false);
        TicketRepository.save(ticket);
    }

    //sets Ticket's PurchaseId to null value
    @Transactional
    public void removePurchase(Ticket ticket) {
        ticket.setPurchaseId(null);
        TicketRepository.save(ticket);
    }
}

