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
@Table(name = "Event")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int EventId;

    private String EventName;
    private String EventDescription;
    private String StartDateTime;
    private String Venue;
    private String Artist;
    private int Capacity = -1;

    // @OneToMany(mappedBy = "event", cascade = CascadeType.ALL)
    // private List<Ticket> tickets;

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

    public int getEventId() {
        return EventId;
    }

    public void setEventId(int eventId) {
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

    // public List<Ticket> getTickets() {
    //     return tickets;
    // }

    // public void setTickets(List<Ticket> tickets) {
    //     this.tickets = tickets;
    // }

}