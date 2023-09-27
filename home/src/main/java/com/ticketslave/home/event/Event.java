package com.ticketslave.home.event;

import jakarta.persistence.*;

import com.ticketslave.home.dto.EventDTO;
import com.ticketslave.home.dto.TicketCategoryDTO;
import com.fasterxml.jackson.annotation.*;

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

    // @OneToMany(mappedBy = "Event", cascade = CascadeType.ALL, orphanRemoval = true)
    //@JsonIgnore
    // @ElementCollection
    // @CollectionTable(name = "ticketCategoryIds")
    private List<Long> TicketCategoryIds = new ArrayList<>();

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

    public EventDTO toDTO() {
        EventDTO dto = new EventDTO();
        dto.setEventId(EventId);
        dto.setArtist(Artist);
        dto.setCapacity(Capacity);
        dto.setEventDescription(EventDescription);
        dto.setEventName(EventName);
        dto.setStartDateTime(StartDateTime);
        dto.setVenue(Venue);
        dto.setTicketCategoryIds(TicketCategoryIds);

        return dto;
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
    // public List<TicketCategory> getTicketCategories() {
    //     return TicketCategories;
    // }

    // public void addTicketCategory(TicketCategory ticketCategory) {
    //     TicketCategories.add(ticketCategory);
    // }

    // public void setTicketCategories(List<TicketCategory> ticketCategories) {
    //     TicketCategories = ticketCategories;
    // }
    

    public String toString() {
        return EventName;
    }

    public List<Long> getTicketCategoryIds() {
        return TicketCategoryIds;
    }

    public void setTicketCategoryIds(List<Long> ticketCategoryIds) {
        TicketCategoryIds = ticketCategoryIds;
    }

    // public byte[] getImage() {
    // return image;
    // }

    // public void setImage(byte[] image) {
    // this.image = image;
    // }

}