package com.example.demo.ticket;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.*;
import com.example.demo.purchase.*;
import com.example.demo.ticketcategory.*;

@Entity
@Table(name = "Ticket")
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TicketId;

    private int SeatNo;
    private char RowChar;
    //private String TicketDescription;
    private boolean Status = false;

    @ManyToOne
    @JoinColumn(name = "ticketCategoryId")
    //@JsonIgnoreProperties("tickets")
    private TicketCategory TicketCategory;

    @ManyToOne
    @JoinColumn(name = "purchaseId")
    private Purchase Purchase;

    public Ticket () {

    }

    public Ticket (TicketCategory ticketCategory) {
        TicketCategory = ticketCategory;
    }

    public Ticket(int seatNo, char rowChar) {
        SeatNo = seatNo;
        RowChar = rowChar;
        // TicketDescription = ticketDescription;
        //Event = event;

    }

    public void setTicketId(Long ticketId) {
        TicketId = ticketId;
    }
    
    public Long getTicketId() {
        return TicketId;
    }

    public int getSeatNo() {
        return SeatNo;
    }

    public void setSeatNo(int seatNo) {
        SeatNo = seatNo;
    }

    public char getRowChar() {
        return RowChar;
    }

    public void setRowChar(char rowChar) {
        RowChar = rowChar;
    }

    // public String getTicketDescription() {
    //     return TicketDescription;
    // }

    // public void setTicketDescription(String ticketDescription) {
    //     TicketDescription = ticketDescription;
    // }

    public boolean getStatus() {
        return Status;
    }

    public void setStatus(boolean status) {
        Status = status;
    }
    @JsonBackReference
    public TicketCategory getTicketCategory() {
        return TicketCategory;
    }

    public void setTicketCategory(TicketCategory ticketCategory) {
        TicketCategory = ticketCategory;
    }

    //@JsonBackReference
    public Purchase getPurchase() {
        return Purchase;
    }

    public void setPurchase(Purchase purchase) {
        Purchase = purchase;
    }

}
