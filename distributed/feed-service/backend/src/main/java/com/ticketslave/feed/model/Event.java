package com.ticketslave.feed.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;

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

    // Getters, Setters, Constructors, etc.
    public Event() {
    }

    public Event(String eventName, String eventDescription, String startDateTime, String venue, String artist,
            int capacity) {
        EventName = eventName;
        EventDescription = eventDescription;
        StartDateTime = startDateTime;
        Venue = venue;
        Artist = artist;
        Capacity = capacity;
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

    public String toString() {
        return EventName;
    }

}