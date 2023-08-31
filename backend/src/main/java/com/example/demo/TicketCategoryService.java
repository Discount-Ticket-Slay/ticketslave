package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TicketCategoryService {

    @Autowired
    private TicketCategoryRepository TicketCategoryRepository;

    @Autowired
    private EventService EventService;

    public List<TicketCategory> getAllTicketCategorys() {
        return TicketCategoryRepository.findAll();
    }

    public TicketCategory findTicketCategory(Long ticketCategoryId) {
        return TicketCategoryRepository.findById(ticketCategoryId).orElse(null);
    }

    public TicketCategory updateEvent (Long ticketCategoryId, Long eventId) {
        Event event = EventService.findEvent(eventId);
        TicketCategory ticketCategory = findTicketCategory(ticketCategoryId);
        if (event == null || ticketCategory == null) {
            return null;
        }
        
        ticketCategory.setEvent(event);
System.out.println(ticketCategory);
        return TicketCategoryRepository.save(ticketCategory);
    }

    public TicketCategory createTicketCategory(TicketCategory TicketCategory) {
        //loadTickets(TicketCategory);
        
        return TicketCategoryRepository.save(TicketCategory);
    }
}
