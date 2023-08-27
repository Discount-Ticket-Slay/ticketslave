package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

import java.util.*;

@Entity
@Table(name = "Purchase")
public class Purchase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int PurchaseId;

    @OneToMany(mappedBy = "Purchase", cascade = CascadeType.ALL)
    private List<Ticket> Tickets = new ArrayList<>();

    public Purchase () {

    }

    public int getPurchaseId() {
        return PurchaseId;
    }

    public void setPurchaseId(int purchaseId) {
        PurchaseId = purchaseId;
    }

    public List<Ticket> getTickets() {
        return Tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        Tickets = tickets;
    }

    
}
