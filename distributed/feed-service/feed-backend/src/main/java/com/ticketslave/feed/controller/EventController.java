package com.ticketslave.feed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.http.*;
import com.ticketslave.feed.model.Event;
import com.ticketslave.feed.service.EventService;
import com.ticketslave.dto.*;

@CrossOrigin
@RestController
@RequestMapping("/feed/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    /* Input: None
     * Output: List of all events
     * Description: This method retrieves all events and returns them as a JSON list
     */
    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.getAllEvents();
    }


    /* Input: id (Event ID)
     * Output: Event object
     * Description: This method retrieves a specific event by its ID
     */
    @GetMapping("/{id}/get")
    public Event getEvent(@PathVariable Long id) {
        return eventService.findEvent(id);
    }

    @GetMapping("/{id}/eventDTO")
    public EventDTO getEventDTO(@PathVariable Long id) {
        return eventService.getEventDTO(id);
    }


    /* Input: Event object
     * Output: Created Event object
     * Description: This method creates a new event
     */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Event createEvent(@Valid @RequestBody Event event) {
        return eventService.createEvent(event);
    }

    /* Input: id (Event ID)
     * Output: Response entity with status and message
     * Description: This method deletes an event by its ID
     */
    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        try {
            eventService.deleteEvent(id);
            return new ResponseEntity<>("Event of ID:" + id + " deleted.", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Event does not exist", HttpStatus.NOT_FOUND);
        }
    }

}
