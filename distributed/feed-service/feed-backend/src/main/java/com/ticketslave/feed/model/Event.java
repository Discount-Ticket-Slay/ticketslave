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
    private Long eventId;

    @Lob
    @Column(columnDefinition = "TEXT")
    @NotNull(message = "Event description cannot be null")
    private String eventDescription;

    @NotNull(message = "Event name cannot be null")
    private String eventName;

    @NotNull(message = "Start date and time cannot be null")
    private String startDateTime;

    @NotNull(message = "Venue cannot be null")
    private String venue;

    @NotNull(message = "Artist cannot be null")
    private String artist;

    private int capacity = -1;

    /*
     * Default Constructor: Initializes an empty Event object
     * Input: None
     * Output: None
     * Description: This constructor initializes an empty Event object
     */
    public Event() {
    }

    /*
     * Parameterized Constructor: Initializes an Event object with provided details
     * Input: eventName, eventDescription, startDateTime, venue, artist, capacity
     * Output: None
     * Description: This constructor initializes an Event object with the provided
     * details
     */
    public Event(String eventName, String eventDescription, String startDateTime, String venue, String artist,
            int capacity) {
        this.eventName = eventName;
        this.eventDescription = eventDescription;
        this.startDateTime = startDateTime;
        this.venue = venue;
        this.artist = artist;
        this.capacity = capacity;
    }

    // Getters and Setters for each field

    public Long getEventId() {
        return eventId;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getEventDescription() {
        return eventDescription;
    }

    public void setEventDescription(String eventDescription) {
        this.eventDescription = eventDescription;
    }

    public String getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(String startDateTime) {
        this.startDateTime = startDateTime;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public String getArtist() {
        return artist;
    }

    public void setArtist(String artist) {
        this.artist = artist;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    /*
     * toString Method: Provides a string representation of the Event object
     * Input: None
     * Output: String
     * Description: This method returns the event name as the string representation
     * of the Event object
     */
    public String toString() {
        return eventName;
    }

}
