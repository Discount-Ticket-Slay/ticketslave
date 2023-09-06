package com.example.demo.event;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.*;
import com.example.demo.ticketcategory.*;


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
    @PostMapping("/{id}/add")
    public Event addTicketCategory(@PathVariable Long id, @RequestBody TicketCategory ticketCategory){
        return EventService.addTicketCategory(id, ticketCategory);
    };

    // enter data into database
    @PostMapping
    public Event createEvent(@RequestBody Event Event) {

        System.out.println(Event);
        
        return EventService.createEvent(Event);
    }

    // Other controller methods...

}