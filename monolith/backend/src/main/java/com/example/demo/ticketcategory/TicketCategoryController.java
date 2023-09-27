package com.example.demo.ticketcategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


import java.util.List;

import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;


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

    @GetMapping("{id}/get")
    public TicketCategory getTicketCategory(@PathVariable Long id) {
//System.out.println(TicketCategoryService.getAllTicketCategorys());
        
        // convert get TicketCategory object into json list
        return TicketCategoryService.findTicketCategory(id);

    }

    // enter data into database
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public TicketCategory createTicketCategory(@Valid @RequestBody TicketCategory TicketCategory) {

        System.out.println(TicketCategory);
        return TicketCategoryService.createTicketCategory(TicketCategory, null);
    }

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


