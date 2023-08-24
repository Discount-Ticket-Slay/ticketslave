package com.example.demo;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;

@Entity
@Table(name = "TicketCategory")
public class TicketCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int TicketCategoryId;

    private String Name;
    private double Price;

    // @OneToMany(mappedBy = "TicketCategory", cascade = CascadeType.ALL)
    // private List<Ticket> tickets;

    // Getters, Setters, Constructors, etc.
    public TicketCategory() {
    }

    public TicketCategory(String name, double price) {

        //TicketCategoryId = TicketCategoryId;
        Name = name;
        Price = price;
    }

    public int getTicketCategoryId() {
        return TicketCategoryId;
    }

    public void setTicketCategoryId(int ticketCategoryId) {
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

    public void setPrice(double price) {
        Price = price;
    }

    
}
