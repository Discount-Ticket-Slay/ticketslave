package com.ticketslave.purchase.purchase;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.*;
import com.ticketslave.purchase.dto.*;
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

    //@OneToMany(mappedBy = "Purchase", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Long> TicketIds = new ArrayList<>();

    private int price = -1;

    @NotNull(message = "UserEmail cannot be null")
    private String UserEmail;

    public Purchase (String UserEmail) {
        this.UserEmail = UserEmail;
    }

    public void setTicketIds(List<Long> ticketIds) {
        TicketIds = ticketIds;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
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

    public PurchaseDTO toDTO() {
    PurchaseDTO dto = new PurchaseDTO();
    dto.setPrice(price);
    dto.setPurchaseId(PurchaseId);
    dto.setTicketIds(TicketIds);
    dto.setUserEmail(UserEmail);
    return dto;
    }

    public String getUserEmail() {
        return UserEmail;
    }


    public void setUserEmail(String userEmail) {
        UserEmail = userEmail;
    }
}
