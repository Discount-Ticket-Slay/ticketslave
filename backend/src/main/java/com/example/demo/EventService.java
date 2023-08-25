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

    // public void loadTickets(Event Event) {
    //     List<Ticket> tickets = Event.getTickets(); 
    //     for (int i = 0; i < Event.getCapacity(); i++) {
    //         tickets.add(new Ticket(i, Event));
    //     }
    // }

    // Other service methods...
}
