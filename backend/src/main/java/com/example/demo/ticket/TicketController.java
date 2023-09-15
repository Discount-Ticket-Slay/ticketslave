package com.example.demo.ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService TicketService;

    @GetMapping
    public List<Ticket> getAllTickets() {
        System.out.println(TicketService.getAllTickets());
        // convert get Ticket object into json list
        return TicketService.getAllTickets();
    }

    @GetMapping("/{ticketCategoryId}/find")
    public Ticket findBySeatNoAndRowChar(@PathVariable Long ticketCategoryId, @RequestParam int seatNo, @RequestParam char rowChar) {
        return TicketService.findBySeatNoAndRowChar(seatNo, rowChar, ticketCategoryId);
    }

    // @PutMapping("/{id}/update-ticketcategory")
    // public Ticket updateTicketCategory(@PathVariable Long id, @RequestParam Long ticketCategoryId){
    //     return TicketService.updateTicketCategory(id, ticketCategoryId);
    // };
    

    // enter data into database
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping
    public Ticket createTicket(@RequestBody Ticket Ticket) {

        System.out.println(Ticket);
        return TicketService.createTicket(Ticket);
    }
    //used when user selects ticket for purchase. It assigns the ticket object to the purchase object
    @PutMapping("/{id}/update-purchase")
    public Ticket updatePurchase(@PathVariable Long id, @RequestParam Long purchaseId) {
        return TicketService.updatePurchase(id, purchaseId);
    }

    // Other controller methods...

}
