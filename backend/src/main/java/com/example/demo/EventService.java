package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class EventService {

    @Autowired
    private EventRepository EventRepository;

    public List<Event> getAllEvents() {
        return EventRepository.findAll();
    }

    public Event createEvent(Event Event) {
        //loadTickets(Event);
        
        return EventRepository.save(Event);
    }

    public Event findEvent(Long eventId) {
        return EventRepository.findById(eventId).orElse(null);
    }

    // Other service methods...
}
