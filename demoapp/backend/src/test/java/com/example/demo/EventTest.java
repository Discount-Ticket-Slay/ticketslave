package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ticketslave.backend.event.Event;
import com.ticketslave.backend.event.EventRepository;
import com.ticketslave.backend.event.EventService;

@ExtendWith(MockitoExtension.class)
public class EventTest {

    @Mock
    private EventRepository eRepo;

    @InjectMocks
    private EventService eServ;
    
    @Test
    void addEvent_ReturnSavedEvent(){
        // arrange ***
        Event event = new Event("last supper", "Betrayal", "01-01-0011", "Long ass table", "Big J", 14);

        // mock the "save" operation 
        when(eRepo.save(any(Event.class))).thenReturn(event);

        // act ***
        Event savedevent = eServ.createEvent(event);
        
        // assert ***
        assertNotNull(savedevent);
        verify(eRepo).save(event);
    }

    @Test
    void addNoSpaceEvent_ReturnNoEvent(){
        // arrange ***
        Event event = new Event("last supper", "Betrayal", "01-01-0011", "Long ass table", "Big J", -1);

        // mock the "save" operation 
        when(eRepo.save(any(Event.class))).thenReturn(event);

        // act ***
        Event savedevent = eServ.createEvent(event);
        
        // assert ***
        assertNull(savedevent);
        verify(eRepo).save(event);
    }

    @Test
    void addRepeatedEvent_ReturnOneEvent(){
        // arrange ***
        Event event1 = new Event("last supper", "Betrayal", "01-01-0011", "Long ass table", "Big J", 1);
        Event event2 = new Event("last supper", "Betrayal", "01-01-0011", "Long ass table", "Big J", 1);

        // mock the "save" operation 
        when(eRepo.save(any(Event.class))).thenReturn(event1);
        when(eRepo.save(any(Event.class))).thenReturn(event2);

        // act ***
        Event savedevent1 = eServ.createEvent(event1);
        Event savedevent2 = eServ.createEvent(event2);
        
        // assert ***
        assertNotNull(savedevent1);     //first time save event
        verify(eRepo).save(event1);

        assertNull(savedevent2);        //repeat event idw
        verify(eRepo).save(event2);
    }
}

