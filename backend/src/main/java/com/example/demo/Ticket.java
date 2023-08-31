package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;


@Entity
@Table(name = "Ticket")
public class Ticket {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TicketId;

    private int SeatNo;
    private int RowNo;
    private String TicketDescription;
    private boolean Status = false;

    @ManyToOne
    @JoinColumn(name = "ticketCategoryId")
    private TicketCategory TicketCategory;

    @ManyToOne
    @JoinColumn(name = "purchaseId")
    private Purchase Purchase;

    public Ticket () {

    }

    public Ticket(int seatNo, int rowNo, String ticketDescription) {
        SeatNo = seatNo;
        RowNo = rowNo;
        TicketDescription = ticketDescription;
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

    public int getRowNo() {
        return RowNo;
    }

    public void setRowNo(int rowNo) {
        RowNo = rowNo;
    }

    public String getTicketDescription() {
        return TicketDescription;
    }

    public void setTicketDescription(String ticketDescription) {
        TicketDescription = ticketDescription;
    }

    public boolean getStatus() {
        return Status;
    }

    public void setStatus(boolean status) {
        Status = status;
    }

    public TicketCategory getTicketCategory() {
        return TicketCategory;
    }

    public void setTicketCategory(TicketCategory ticketCategory) {
        TicketCategory = ticketCategory;
    }

}
