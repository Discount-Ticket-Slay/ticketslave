package com.example.demo.ticketcategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;
import org.springframework.context.annotation.Lazy;
import com.example.demo.event.*;
import com.example.demo.ticket.*;

import jakarta.transaction.Transactional;

@Service
@Lazy
public class TicketCategoryService {

    @Autowired
    private TicketCategoryRepository TicketCategoryRepository;

    // @Autowired
    // private EventService EventService;
    // @Autowired
    // private TicketService TicketService;

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
    @Transactional
    public TicketCategory makeTickets (Long id, int count) throws IllegalArgumentException {
        
            TicketCategory ticketCategory = findTicketCategory(id);
            Event event = ticketCategory.getEvent();
            int capacity = event.getCapacity();
            if (capacity < count) {
                throw new IllegalArgumentException("Count exceeds capacity");
            }
    //System.out.println(event.getName());
            List<Ticket> tickets = new ArrayList<>();
            int counter = 0;
            int seatNo = 1;
            char rowChar = 'A';
            for (int i = 0; i < count; i++) {
                Ticket ticket = new Ticket(seatNo, rowChar);
                counter++;
                seatNo++;
                if (counter >= 10) {
                    rowChar++;
                    counter = 0;
                }
                if (seatNo > 10) {
                    seatNo = 1;
                }
                if (rowChar >= 'Z') {
                    rowChar = 'A';
                }
                tickets.add(ticket);
                ticket.setTicketCategory(ticketCategory);
            }
            ticketCategory.setTickets(tickets);
            return TicketCategoryRepository.save(ticketCategory);
    
    }
}
