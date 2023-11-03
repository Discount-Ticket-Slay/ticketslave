package com.ticketslave.feed.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;

import org.springframework.http.HttpStatus;

import com.ticketslave.feed.model.Event;
import com.ticketslave.feed.service.EventService;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class EventControllerTest {

    @Mock
    private EventService eventService;

    @InjectMocks
    private EventController eventController;

    private Event event;
    private List<Event> allEvents;

    @BeforeEach
    public void setUp() {
        event = new Event("eventName", "eventDescription", "startDateTime", "venue", "artist", 100);
        allEvents = Arrays.asList(event);
    }

    @Test
    void getAllEvents_ReturnsListOfEvents() {
        when(eventService.getAllEvents()).thenReturn(allEvents);

        List<Event> result = eventController.getAllEvents();

        assertEquals(allEvents, result);
        verify(eventService).getAllEvents();
    }

    @Test
    void getEvent_ReturnsSingleEvent() {
        when(eventService.findEvent(1L)).thenReturn(event);

        Event result = eventController.getEvent(1L);

        assertEquals(event, result);
        verify(eventService).findEvent(1L);
    }

    @Test
    void createEvent_ReturnsCreatedEvent() {
        when(eventService.createEvent(any(Event.class))).thenReturn(event);

        Event result = eventController.createEvent(event);

        assertEquals(event, result);
        verify(eventService).createEvent(event);
    }

    @Test
    void deleteEvent_ReturnsSuccessResponseEntity() {
        doNothing().when(eventService).deleteEvent(1L);

        ResponseEntity<String> responseEntity = eventController.deleteEvent(1L);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals("Event of ID:1 deleted.", responseEntity.getBody());
        verify(eventService).deleteEvent(1L);
    }

    @Test
    void deleteEvent_ReturnsNotFoundResponseEntity() {
        doThrow(new IllegalArgumentException()).when(eventService).deleteEvent(anyLong());

        ResponseEntity<String> responseEntity = eventController.deleteEvent(1L);

        assertEquals(HttpStatus.NOT_FOUND, responseEntity.getStatusCode());
        assertEquals("Event does not exist", responseEntity.getBody());
        verify(eventService).deleteEvent(1L);
    }
}
