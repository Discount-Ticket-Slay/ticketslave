package com.ticketslave.backend.event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ticketslave.backend.event.*;
import com.ticketslave.backend.ticketcategory.*;


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
    public void deleteEvent(Long eventId) throws IllegalArgumentException{
        //loadTickets(Event);
        EventRepository.deleteById(eventId);
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

    // public Event addImage(Long id, MultipartFile file) {
    //     Event event = findEvent(id);
    //     if (event == null || file == null) {
    //         return null;
    //     }
    //     try {
    //         event.setImage(file.getBytes());
    //     } catch (IOException e) {
    //         return null;
    //     }
    //     return EventRepository.save(event);
    // }
}
