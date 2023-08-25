package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService EventService;

    @GetMapping
    public List<Event> getAllEvents() {
        System.out.println(EventService.getAllEvents());
        
        // convert get event object into json list
        return EventService.getAllEvents();

    }

    // enter data into database
    @PostMapping
    public Event createEvent(@RequestBody Event Event) {

        System.out.println(Event);
        
        return EventService.createEvent(Event);
    }

    // Other controller methods...

}