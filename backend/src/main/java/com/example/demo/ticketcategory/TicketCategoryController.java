package com.example.demo.ticketcategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.List;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import com.example.demo.dto.*;

@RestController
@RequestMapping("/ticketcategory")
public class TicketCategoryController {

    @Autowired
    private TicketCategoryService TicketCategoryService;

    @GetMapping
    public List<TicketCategory> getAllTicketCategorys() {
        System.out.println(TicketCategoryService.getAllTicketCategorys());
        
        // convert get TicketCategory object into json list
        return TicketCategoryService.getAllTicketCategorys();
    }

    @GetMapping("/{ticketCategoryId}/getevent")
    public EventDTO getEvent(@PathVariable Long ticketCategoryId) {
//System.out.println("Let's go!");
        return TicketCategoryService.getEvent(ticketCategoryId);
    }

    @GetMapping("/{eventId}/getcategories") 
    public List<TicketCategoryDTO> getTicketCategoryFromEventId (@PathVariable Long eventId) {
        return TicketCategoryService.getTicketCategoryFromEventId(eventId);

    }
    @PostMapping
    public TicketCategory createTicketCategory(@Valid @RequestBody TicketCategory ticketCategory) {
        return TicketCategoryService.createTicketCategory(ticketCategory);
    }


    // enter data into database
    //@ResponseStatus(HttpStatus.CREATED)
    // @PostMapping
    // public ResponseEntity<TicketCategory> createTicketCategory(@Valid @RequestBody CreateTicketCategoryDTO createTicketCategoryDTO) {
    //     TicketCategory createdTicketCategory = TicketCategoryService.createTicketCategory(createTicketCategoryDTO);
    //     if (createdTicketCategory != null) {
    //         return ResponseEntity.status(HttpStatus.CREATED).body(createdTicketCategory);
    //     } else {
    //         return ResponseEntity.badRequest().build();
 
    //     }
    //     // System.out.println(TicketCategory);
    //     // return TicketCategoryService.createTicketCategory(TicketCategory, null);
    // }

    // Other controller methods...
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{id}/make-tickets")
    public ResponseEntity<String> makeTickets (@PathVariable Long id, @RequestParam int count) {
        try {
            TicketCategoryService.makeTickets(id, count);
            return new ResponseEntity<String>("Tickets created", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (NullPointerException e) {
            return new ResponseEntity<String>("Ticket Category does not exist", HttpStatus.NOT_FOUND);
        }
    }

    // @PutMapping("/{id}/update-event")
    // public TicketCategory updateEvent (@PathVariable Long id, @RequestParam Long eventId) {
    //     return TicketCategoryService.updateEvent(id, eventId);
    // }

}


