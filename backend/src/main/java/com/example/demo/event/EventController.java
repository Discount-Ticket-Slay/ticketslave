package com.example.demo.event;


import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.example.demo.ticketcategory.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;

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

    @GetMapping("/{id}/image")
    public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
        Event event = EventService.findEvent(id);

        if (event != null && event.getImage() != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG); // Set the content type to image/jpeg or appropriate format

            return new ResponseEntity<>(event.getImage(), headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/{id}/add")
    public ResponseEntity<String> addTicketCategory(@PathVariable Long id, @RequestBody TicketCategory ticketCategory){
        if (EventService.findEvent(id) == null){
            return new ResponseEntity<String>("Event not found", HttpStatus.NOT_FOUND);
        }
        EventService.addTicketCategory(id, ticketCategory);
        return new ResponseEntity<String>("Ticket Category added", HttpStatus.OK);
    };
    //original function body was just return EventService.addTicketCategory(id, ticketCategory); , revert if there are any errors

    // enter data into database
    @PostMapping
    public Event createEvent(@RequestBody Event Event) {

        System.out.println(Event);
        
        return EventService.createEvent(Event);
    }
    @PostMapping("/{id}/image")
    public ResponseEntity<String> addImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        if (EventService.findEvent(id) == null){
            return new ResponseEntity<String>("Event not found", HttpStatus.NOT_FOUND);
        }
        EventService.addImage(id, file);
        return new ResponseEntity<>("Image added to the event", HttpStatus.OK);
    }
    // Other controller methods...

}