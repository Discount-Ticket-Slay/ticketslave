package com.ticketslave.feed.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

import com.ticketslave.feed.dto.*;
import com.ticketslave.feed.model.Event;
import com.ticketslave.feed.repository.EventRepository;

@Service
public class EventService {

    private final EventRepository eventRepository;

    @Autowired
    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    /* Method: getAllEvents
     * Input: None
     * Output: List<Event>
     * Description: Retrieves all events from the repository
     */
    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    /* Method: createEvent
     * Input: Event
     * Output: Event
     * Description: Saves a new event to the repository
     */
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }

    /* Method: deleteEvent
     * Input: eventId
     * Output: None
     * Description: Deletes an event by its ID from the repository
     */
    public void deleteEvent(Long eventId) throws IllegalArgumentException {
        eventRepository.deleteById(eventId);
    }

    /* Method: findEvent
     * Input: eventId
     * Output: Event
     * Description: Finds an event by its ID from the repository
     */
    public Event findEvent(Long eventId) {
        return eventRepository.findById(eventId).orElse(null);
    }

    public EventDTO getEventDTO(Long eventId) {
        Event event = eventRepository.findById(eventId).orElse(null);

        if (event != null) {
            return event.toDTO();
        }
        return null;
    }

}
