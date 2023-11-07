package com.ticketslave.purchase.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import com.ticketslave.purchase.model.*;
import com.ticketslave.purchase.service.*;
import java.util.List;
import org.springframework.web.bind.annotation.*;
import com.ticketslave.purchase.dto.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/purchase/ticketcategory")
public class TicketCategoryController {

    @Autowired
    private TicketCategoryService TicketCategoryService;

    @GetMapping
    public List<TicketCategory> getAllTicketCategorys() {
        System.out.println(TicketCategoryService.getAllTicketCategorys());
        // convert get TicketCategory object into json list
        return TicketCategoryService.getAllTicketCategorys();
    }

    @GetMapping("/{ticketCategoryId}/get")
    public TicketCategory getTicketCategory(@PathVariable Long ticketCategoryId) {
        // convert get TicketCategory object into json list
        return TicketCategoryService.findTicketCategory(ticketCategoryId);
    }

    @GetMapping("/{ticketCategoryId}/getevent")
    public EventDTO getEvent(@PathVariable Long ticketCategoryId) {
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

    //populates database with tickets for a specific TicketCategory
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


