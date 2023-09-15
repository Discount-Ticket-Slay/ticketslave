package com.example.demo.ticketcategory;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.CascadeType;
import java.util.*;
import com.fasterxml.jackson.annotation.*;
import com.example.demo.event.*;
import com.example.demo.ticket.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "TicketCategory")
@JsonIdentityInfo(
  generator = ObjectIdGenerators.PropertyGenerator.class, 
  property = "ticketCategoryId")
public class TicketCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long TicketCategoryId;

    @NotNull(message = "ticketCategory name cannot be null")
    private String Name;
    private double Price;

    @OneToMany(mappedBy = "TicketCategory", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Ticket> tickets = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "eventId")
    private Event Event;

    // Getters, Setters, Constructors, etc.
    public TicketCategory() {
    }

    public TicketCategory(String name, double price) {

        //TicketCategoryId = TicketCategoryId;
        Name = name;
        Price = price;
    }

    public Long getTicketCategoryId() {
        return TicketCategoryId;
    }

    public void setTicketCategoryId(Long ticketCategoryId) {
        TicketCategoryId = ticketCategoryId;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public double getPrice() {
        return Price;
    }

    //@JsonManagedReference
    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }

    public void addTicket(Ticket ticket) {
        tickets.add(ticket);
    }

    //@JsonBackReference
    public Event getEvent() {
        return Event;
    }

    public void setEvent(Event event) {
        Event = event;
    }

    public void setPrice(double price) {
        Price = price;
    }

    public String toString() {
        return Name;
    }
}
