package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ticketslave.backend.event.Event;
import com.ticketslave.backend.event.EventRepository;
import com.ticketslave.backend.event.EventService;
import com.ticketslave.backend.ticket.Ticket;
import com.ticketslave.backend.ticket.TicketRepository;
import com.ticketslave.backend.ticket.TicketService;
import com.ticketslave.backend.ticketcategory.TicketCategory;
import com.ticketslave.backend.ticketcategory.TicketCategoryRepository;
import com.ticketslave.backend.ticketcategory.TicketCategoryService;

@ExtendWith(MockitoExtension.class)
public class TicketTest {

    @Mock
    private EventRepository eRepo;
    @InjectMocks
    private EventService eServ;

    @Mock
    private TicketCategoryRepository cRepo;
    @InjectMocks
    private TicketCategoryService cServ;

    @Mock
    private TicketRepository tRepo;
    @InjectMocks
    private TicketService tServ;
    
    @Test
    void Add_Cat(){
        // arrange ***
        Event event = new Event("last supper", "Betrayal", "01-01-0011", "Long ass table", "Big J", 14);
        TicketCategory tCat = new TicketCategory("Testing", 10);
        Ticket tic = new Ticket(5, 'k');

        // mock the "save" operation 
        when(eRepo.save(any(Event.class))).thenReturn(event);
        when(cRepo.save(any(TicketCategory.class))).thenReturn(tCat);
        when(tRepo.save(any(Ticket.class))).thenReturn(tic);

        // act ***
        Event savedevent = eServ.createEvent(event);
        TicketCategory savedCat = cServ.createTicketCategory(tCat, event);
        Ticket savedTic = tServ.createTicketUsingCategory(tCat);
        
        // assert ***
        assertNotNull(savedevent);
        assertNotNull(savedCat);
        assertNotNull(savedTic);
        verify(cRepo).save(tCat);
        verify(eRepo).save(event);
        verify(tRepo).save(tic);
    }
}
