package com.ticketslave.backend.purchase;


import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.*;
import java.util.*;
import com.ticketslave.backend.ticket.*;
import java.time.LocalDateTime;

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

    private LocalDateTime dateOfPurchase = LocalDateTime.now();

    private String userEmail = null;

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

    public LocalDateTime getDateOfPurchase(){
        return this.dateOfPurchase;
    }

    public void setDateOfPurchase(LocalDateTime setDate){
        this.dateOfPurchase = setDate;
    }

    public String getUserEmail(){
        return this.userEmail;
    }

    public void setUserEmail(String email){
        this.userEmail = email;
    }
    
}