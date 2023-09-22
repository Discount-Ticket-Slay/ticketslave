package com.ticketslave.feed.event;


import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;

import org.springframework.web.bind.annotation.*;
import com.ticketslave.feed.config.*;
import com.ticketslave.feed.dto.*;
import org.springframework.web.reactive.function.client.*;


import jakarta.validation.Valid;

import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.*;

import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/events")
public class EventController {

    @Autowired
    private EventService EventService;
    @Autowired
    private WebClient.Builder WebClientBuilder;

    @GetMapping
    public List<Event> getAllEvents() {
        System.out.println(EventService.getAllEvents());
        
        // convert get event object into json list
        return EventService.getAllEvents();
    }

    @GetMapping("/{eventId}/ticketcategory")
    public List<TicketCategoryDTO> getTicketCategoriesByEventId(@PathVariable Long eventId) {
        return EventService.getTicketCategoriesByEventId(eventId);
        // if (ticketCategories != null && !ticketCategories.isEmpty()) {
        //     return ResponseEntity.ok(ticketCategories);
        // } else {
        //     return ResponseEntity.notFound().build();
        // }
    }

    @GetMapping("/{ticketCategoryId}/eventDTO")
    public EventDTO getEventDTO(@PathVariable Long ticketCategoryId) {
        return EventService.getEventDTO(ticketCategoryId);
    }

    @PutMapping("/{eventId}/update")
    public ResponseEntity<String> updateTicketCategory(@PathVariable Long eventId, @RequestParam Long ticketCategoryId) {
        try {
            EventService.updateTicketCategory(eventId, ticketCategoryId);
            return new ResponseEntity<String>("Ticket Category updated", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>("Failed to update", HttpStatus.CONFLICT);
        }
    }

    // @PostMapping("/{eventId}/ticketcategory")
    // public ResponseEntity<String> createTicketCategories

    // @GetMapping("/redir")
    // public ModelAndView eventRedirect(){
    //     RedirectView redirectView = new RedirectView("/purchase");
    //     System.out.println("you're being redirected lmao");
    //     return new ModelAndView(redirectView);
    // }

    // @GetMapping("/{id}/image")
    // public ResponseEntity<byte[]> getImage(@PathVariable Long id) {
    //     Event event = EventService.findEvent(id);

    //     if (event != null && event.getImage() != null) {
    //         HttpHeaders headers = new HttpHeaders();
    //         headers.setContentType(MediaType.IMAGE_JPEG); // Set the content type to image/jpeg or appropriate format

    //         return new ResponseEntity<>(event.getImage(), headers, HttpStatus.OK);
    //     } else {
    //         return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    //     }
    // }


    // @PostMapping("/{id}/add")
    // public ResponseEntity<String> addTicketCategory(@PathVariable Long id, @Valid @RequestBody TicketCategory ticketCategory){
    //     if (EventService.findEvent(id) == null){
    //         return new ResponseEntity<String>("Event not found", HttpStatus.NOT_FOUND);
    //     }
    //     EventService.addTicketCategory(id, ticketCategory);
    //     return new ResponseEntity<String>("Ticket Category added", HttpStatus.OK);
    // };
    //original function body was just return EventService.addTicketCategory(id, ticketCategory); , revert if there are any errors

    // enter data into database
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Event createEvent(@Valid @RequestBody Event Event) {

        System.out.println(Event);
        
        return EventService.createEvent(Event);
    }
    // @PostMapping("/{id}/image")
    // public ResponseEntity<String> addImage(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
    //     if (EventService.findEvent(id) == null){
    //         return new ResponseEntity<String>("Event not found", HttpStatus.NOT_FOUND);
    //     }
    //     EventService.addImage(id, file);
    //     return new ResponseEntity<>("Image added to the event", HttpStatus.OK);
    // }
    // Other controller methods...

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