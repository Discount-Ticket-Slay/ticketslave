package com.ticketslave.buy.purchase;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.*;
import com.ticketslave.buy.ticket.*;

import java.util.*;

@Entity
@Table(name = "Purchase")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "purchaseId")
public class Purchase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PurchaseId;

    @OneToMany(mappedBy = "Purchase", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Ticket> Tickets = new ArrayList<>();

    public Purchase () {

    }

    public Long getPurchaseId() {
        return PurchaseId;
    }

    public void setPurchaseId(Long purchaseId) {
        PurchaseId = purchaseId;
    }

    //@JsonManagedReference
    public List<Ticket> getTickets() {
        return Tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        Tickets = tickets;
    }

    public void addTicket(Ticket ticket) {
        Tickets.add(ticket);
    }

    
}
