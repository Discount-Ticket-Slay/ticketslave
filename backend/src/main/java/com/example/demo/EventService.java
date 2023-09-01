package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import org.springframework.transaction.annotation.Transactional;


@Service
public class EventService {

    @Autowired
    private EventRepository EventRepository;
    @Autowired
    private TicketCategoryService TicketCategoryService;

    public List<Event> getAllEvents() {
        return EventRepository.findAll();
    }

    public Event createEvent(Event Event) {
        //loadTickets(Event);
        
        return EventRepository.save(Event);
    }

    //@Transactional
    public Event addTicketCategory(Long id, TicketCategory ticketCategory) {
        Event event = findEvent(id);
        if (event == null) {
            return null;
        }
        TicketCategoryService.createTicketCategory(ticketCategory, event);
        event.addTicketCategory(ticketCategory);
System.out.println("printing: " + ticketCategory);
System.out.println(event.getTicketCategories());
        return EventRepository.save(event);
    }

    public Event findEvent(Long eventId) {
        return EventRepository.findById(eventId).orElse(null);
    }

    // Other service methods...
}
