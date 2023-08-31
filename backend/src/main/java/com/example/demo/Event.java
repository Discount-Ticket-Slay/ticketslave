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
@Table(name = "Event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long EventId;

    private String EventName;
    private String EventDescription;
    private String StartDateTime;
    private String Venue;
    private String Artist;
    private int Capacity = -1;

    @OneToMany(mappedBy = "Event", cascade = CascadeType.ALL)
    
    private List<TicketCategory> TicketCategories = new ArrayList<>();

    // Getters, Setters, Constructors, etc.
    public Event() {
    }

    public Event(String eventName, String eventDescription, String startDateTime, String venue, String artist, int capacity) {

        //EventId = eventId;
        EventName = eventName;
        EventDescription = eventDescription;
        StartDateTime = startDateTime;
        Venue = venue;
        Artist = artist;
        Capacity = capacity;
        //tickets = new ArrayList<Ticket>();
    }

    public Long getEventId() {
        return EventId;
    }

    public void setEventId(Long eventId) {
        EventId = eventId;
    }

    public String getEventName() {
        return EventName;
    }

    public void setEventName(String eventName) {
        EventName = eventName;
    }

    public String getEventDescription() {
        return EventDescription;
    }

    public void setEventDescription(String eventDescription) {
        EventDescription = eventDescription;
    }

    public String getStartDateTime() {
        return StartDateTime;
    }

    public void setStartDateTime(String startDateTime) {
        StartDateTime = startDateTime;
    }

    public String getVenue() {
        return Venue;
    }

    public void setVenue(String venue) {
        Venue = venue;
    }

    public String getArtist() {
        return Artist;
    }

    public void setArtist(String artist) {
        Artist = artist;
    }

    public int getCapacity() {
        return Capacity;
    }

    public void setCapacity(int capacity) {
        Capacity = capacity;
    }

    @JsonManagedReference
    public List<TicketCategory> getTicketCategories() {
        return TicketCategories;
    }
    public void addTicketCategory(TicketCategory ticketCategory) {
        TicketCategories.add(ticketCategory);
    }

    public void setTicketCategories(List<TicketCategory> ticketCategories) {
        TicketCategories = ticketCategories;
    }
    public String toString() {
        return EventName;
    }

}