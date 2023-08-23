package com.example.demo;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

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

    // Getters, Setters, Constructors, etc.
    public Event() {
    }

    public Event(int eventId, String eventName, String eventDescription, String startDateTime, String venue, String artist) {

        EventId = eventId;
        EventName = eventName;
        EventDescription = eventDescription;
        StartDateTime = startDateTime;
        Venue = venue;
        Artist = artist;
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

}