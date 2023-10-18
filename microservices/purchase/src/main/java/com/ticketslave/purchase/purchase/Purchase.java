package com.ticketslave.purchase.purchase;

import jakarta.persistence.*;

import com.fasterxml.jackson.annotation.*;
import com.ticketslave.purchase.ticket.*;

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
    private List<Long> TicketIds = new ArrayList<>();

    private double price = -1;

    public Purchase () {
    }

    public void setTicketIds(List<Long> ticketIds) {
        TicketIds = ticketIds;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Long getPurchaseId() {
        return PurchaseId;
    }

    public void setPurchaseId(Long purchaseId) {
        PurchaseId = purchaseId;
    }

    //@JsonManagedReference
    public List<Long> getTicketIds() {
        return TicketIds;
    }

    public void addTicketId(Long ticketId) {
        TicketIds.add(ticketId);
    }

    
}
