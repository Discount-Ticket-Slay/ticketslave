package com.example.demo.ticket;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.*;
import com.example.demo.purchase.*;
import com.example.demo.ticketcategory.*;

@Entity
@Table(name = "Ticket")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "ticketId")
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TicketId;

    @Column(name = "seatNo")
    private int SeatNo;
    @Column(name = "rowChar", columnDefinition = "CHAR(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci")
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
    //@JsonBackReference
    public TicketCategory getTicketCategory() {
        return TicketCategory;
    }

    public void setTicketCategory(TicketCategory ticketCategory) {
        TicketCategory = ticketCategory;
    }

    //@JsonBackReference
    //@JsonIgnore
    public Purchase getPurchase() {
        return Purchase;
    }

    public void setPurchase(Purchase purchase) {
        Purchase = purchase;
    }

}
