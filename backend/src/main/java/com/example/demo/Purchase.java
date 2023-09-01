package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import java.util.*;

@Entity
@Table(name = "Purchase")
public class Purchase {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PurchaseId;

    @OneToMany(mappedBy = "Purchase", cascade = CascadeType.ALL)
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

    
}
