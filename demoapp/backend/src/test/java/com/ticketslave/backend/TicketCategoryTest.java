package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
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
import com.ticketslave.backend.ticketcategory.TicketCategory;
import com.ticketslave.backend.ticketcategory.TicketCategoryRepository;
import com.ticketslave.backend.ticketcategory.TicketCategoryService;

@ExtendWith(MockitoExtension.class)
public class TicketCategoryTest {

    @Mock
    private EventRepository eRepo;

    @InjectMocks
    private EventService eServ;

    @Mock
    private TicketCategoryRepository cRepo;

    @InjectMocks
    private TicketCategoryService cServ;
    
    @Test
    void Add_Cat(){
        // arrange ***
        Event event = new Event("last supper", "Betrayal", "01-01-0011", "Long ass table", "Big J", 14);
        TicketCategory tCat = new TicketCategory("Testing", 10);

        // mock the "save" operation 
        when(eRepo.save(any(Event.class))).thenReturn(event);
        when(cRepo.save(any(TicketCategory.class))).thenReturn(tCat);

        // act ***
        Event savedevent = eServ.createEvent(event);
        TicketCategory savedCat = cServ.createTicketCategory(tCat, event);
        
        // assert ***
        assertNotNull(savedevent);
        assertNotNull(savedCat);
        verify(cRepo).save(tCat);
        verify(eRepo).save(event);
    }

}
