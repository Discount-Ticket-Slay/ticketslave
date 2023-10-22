package com.ticketslave.feed.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import com.ticketslave.feed.model.Event;
import com.ticketslave.feed.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository EventRepository;

    public List<Event> getAllEvents() {
        return EventRepository.findAll();
    }

    public Event createEvent(Event Event) {
        return EventRepository.save(Event);
    }
    public void deleteEvent(Long eventId) throws IllegalArgumentException{
        EventRepository.deleteById(eventId);
    }

    public Event findEvent(Long eventId) {
        return EventRepository.findById(eventId).orElse(null);
    }

}
