package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

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

    // Other service methods...
}
