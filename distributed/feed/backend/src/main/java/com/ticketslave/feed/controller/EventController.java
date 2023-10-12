package com.ticketslave.feed.controller;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.springframework.http.*;
import com.ticketslave.feed.model.Event;
import com.ticketslave.feed.service.EventService;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService EventService;

    @GetMapping
    public List<Event> getAllEvents() {
        
        // convert get event object into json list
        return EventService.getAllEvents();

    }

    @GetMapping("/{id}/get")
    public Event getEvent(@PathVariable Long id) {
        
        // convert get event object into json list
        return EventService.findEvent(id);

    }

    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Event createEvent(@Valid @RequestBody Event Event) {
        return EventService.createEvent(Event);
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deleteEvent(@PathVariable Long id) {
        try {
            EventService.deleteEvent(id);
            return new ResponseEntity<String>("Event of ID:" + id + " deleted. ", HttpStatus.OK);
        } catch (IllegalArgumentException e){
            return new ResponseEntity<String>("Event does not exist", HttpStatus.NOT_FOUND);
        }
    }

}