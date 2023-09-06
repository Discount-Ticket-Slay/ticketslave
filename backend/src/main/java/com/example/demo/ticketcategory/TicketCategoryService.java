package com.example.demo.ticketcategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import org.springframework.context.annotation.Lazy;
import com.example.demo.event.*;
import com.example.demo.ticket.*;

@Service
@Lazy
public class TicketCategoryService {

    @Autowired
    private TicketCategoryRepository TicketCategoryRepository;

    // @Autowired
    // private EventService EventService;
    @Autowired
    private TicketService TicketService;

    public List<TicketCategory> getAllTicketCategorys() {
        return TicketCategoryRepository.findAll();
    }

    public TicketCategory findTicketCategory(Long ticketCategoryId) {
        return TicketCategoryRepository.findById(ticketCategoryId).orElse(null);
    }

    // public TicketCategory updateEvent (Long ticketCategoryId, Long eventId) {
    //     Event event = EventService.findEvent(eventId);
    //     TicketCategory ticketCategory = findTicketCategory(ticketCategoryId);
    //     if (event == null || ticketCategory == null) {
    //         return null;
    //     }
        
//         ticketCategory.setEvent(event);
// System.out.println(ticketCategory);
//         return TicketCategoryRepository.save(ticketCategory);
//     }

    public TicketCategory createTicketCategory(TicketCategory TicketCategory, Event Event) {
        //loadTickets(TicketCategory);
        TicketCategory.setEvent(Event);
        return TicketCategoryRepository.save(TicketCategory);
    }

    public TicketCategory makeTickets (Long id, int count) {
        TicketCategory ticketCategory = findTicketCategory(id);
        if (ticketCategory == null) {
            return null;
        }
        Event event = ticketCategory.getEvent();
        if (event == null) {
            return null;
        }
        int capacity = event.getCapacity();
        if (capacity < count) {
            return null;
        }
//System.out.println(event.getName());
        for (int i = 0; i < count; i++) {
            TicketService.createTicketUsingCategory(ticketCategory);
        }
        
        return TicketCategoryRepository.save(ticketCategory);
    }
}
