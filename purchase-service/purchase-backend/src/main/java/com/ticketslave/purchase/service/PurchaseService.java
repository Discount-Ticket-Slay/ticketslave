package com.ticketslave.purchase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ticketslave.purchase.model.*;
import com.ticketslave.purchase.repository.*;
import com.ticketslave.purchase.controller.*;
import com.ticketslave.purchase.dto.*;
import java.util.*;

import jakarta.transaction.Transactional;
import reactor.netty.channel.AbortedException;


@Service
public class PurchaseService {

    private final int CENTS_IN_A_DOLLAR = 100;
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

    public PurchaseDTO getPurchaseDTO(Long id) {
        Purchase purchase = findPurchase(id);
        return purchase.toDTO();
    }

    //Deletes Purchase Object from database
    @Transactional
    public void deletePurchase(Long id) {
        //loadTickets(Event);
        Purchase purchase = findPurchase(id);
        List<Long> tickets = purchase.getTicketIds();
        for (Long tId: tickets) {
            Ticket t = TicketService.findTicket(tId);
            TicketService.undoReserveTicket(t);
            TicketService.removePurchase(t);
        }
        purchase.setTicketIds(null);
        PurchaseRepository.deleteById(id);
    }

    //create blank Purchase object and add to database
    public Purchase createPurchase(String userEmail) {
        Purchase purchase = new Purchase(userEmail);
        return PurchaseRepository.save(purchase);
    }

    public int convertPrice(double price) {
        price *= CENTS_IN_A_DOLLAR;
        return (int)Math.round(price);
    }

    //updates the price field in accordance to Ticket costs in Purchase object
    @Transactional
    public void updatePrice(Long id) {
        Purchase purchase = findPurchase(id);
        List<Long> ticketIds = purchase.getTicketIds();
        int updatedPrice = 0;
        for (Long ticketId: ticketIds) {
            Ticket t = TicketService.findTicket(ticketId);
            TicketCategory tCat = t.getTicketCategory();
            double price = tCat.getPrice();
            updatedPrice += convertPrice(price);
        }

        purchase.setPrice(updatedPrice);
        PurchaseRepository.save(purchase);
    }

    //add ticketId to Purchase object, save to database
    @Transactional
    public void addTicketId(Long id, Long ticketId) throws AbortedException{
        Purchase purchase = findPurchase(id);
        if (purchase == null){
            throw new AbortedException("Cannot find purchase by ID");
        }
        Ticket ticket = TicketService.findTicket(ticketId);
        if (ticket == null){
            throw new AbortedException("Cannot find ticket by ID");
        }
        List<Long> tickets = purchase.getTicketIds();
        boolean result = TicketService.reserveTicket(ticketId);
        if (!result) {
            throw new AbortedException("Ticket already reserved by another");
        }
        tickets.add(ticketId);
        ticket.setPurchaseId(id);
        PurchaseRepository.save(purchase);
    }

    //switch all corresponding Ticket objects in Purchase object to sold = true
    @Transactional
    public void completePurchase(Long id) throws AbortedException{
        Purchase purchase = findPurchase(id);
        List<Long> tickets = purchase.getTicketIds();
        for (Long tId: tickets) {
            Ticket t = TicketService.findTicket(tId);

            //if ticket is sold or ticket is no longer reserved, abort
            if (t.isSold()) {
                throw new AbortedException("Purchase aborted, ticket has already been sold");
            } else if (!t.getStatus()) {
                throw new AbortedException("Purchase aborted, one of your tickets timed out");
            }

            TicketService.purchaseTicket(t);
        }

    }

}
