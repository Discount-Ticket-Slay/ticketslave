package com.example.demo.event;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.*;
import com.example.demo.ticketcategory.*;

import java.util.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "Event")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "eventId")
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long EventId;
    @NotNull(message = "eventName cannot be null")
    private String EventName;
    @Lob
    @Column(columnDefinition = "TEXT")
    @NotNull(message = "EventDescription cannot be null")
    private String EventDescription;
    @NotNull(message = "startDateTime cannot be null")
    private String StartDateTime;
    @NotNull(message = "venue cannot be null")
    private String Venue;
    @NotNull(message = "artist cannot be null")
    private String Artist;
    private int Capacity = -1;
    // @Lob
    // @Column(columnDefinition = "LONGBLOB")
    // private byte[] image;

    @OneToMany(mappedBy = "Event", cascade = CascadeType.ALL)
    // @JsonIgnore
    private List<TicketCategory> TicketCategories = new ArrayList<>();

    // Getters, Setters, Constructors, etc.
    public Event() {
    }

    public Event(String eventName, String eventDescription, String startDateTime, String venue, String artist,
            int capacity) {

        // EventId = eventId;
        EventName = eventName;
        EventDescription = eventDescription;
        StartDateTime = startDateTime;
        Venue = venue;
        Artist = artist;
        Capacity = capacity;
        // tickets = new ArrayList<Ticket>();
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

    // @JsonManagedReference
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

    // public byte[] getImage() {
    // return image;
    // }

    // public void setImage(byte[] image) {
    // this.image = image;
    // }

}