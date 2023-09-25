package com.example.demo.ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import jakarta.servlet.http.HttpServletRequest;
import java.net.http.HttpRequest;
import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.authentication.JwtService;

import jakarta.persistence.OptimisticLockException;

@RestController
@RequestMapping("/tickets")
public class TicketController {

    @Autowired
    private TicketService TicketService;

    private final JwtService jwtService;

    @Autowired
    public TicketController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

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
    // @PutMapping("/{id}/update-purchase")
    // public Ticket updatePurchase(@PathVariable Long id, @RequestParam Long purchaseId) {
    //     return TicketService.updatePurchase(id, purchaseId);
    // }

    // Other controller methods...
    @PostMapping("/{id}/reserve")
    public ResponseEntity<String> reserveTicket (@PathVariable Long id, HttpServletRequest request) {

        String jwt = jwtService.extractTokenFromCookies(request);

        if (jwt == null) {
            return new ResponseEntity<String>("JWT token not found in cookies", HttpStatus.BAD_REQUEST);
        }
        
        String userEmail = jwtService.getEmailFromToken(jwt);

        System.out.println("extracted! userEmail: " + userEmail);

        try {
            boolean result = TicketService.reserveTicket(id,userEmail);
            if (result) {
                return new ResponseEntity<String>("Ticket successfully reserved", HttpStatus.OK);
            }
            return new ResponseEntity<String>("Ticket was already reserved by another user", HttpStatus.CONFLICT);
        } catch (NullPointerException e) {
            return new ResponseEntity<String>("Ticket does not exist", HttpStatus.NOT_FOUND);
        } catch (OptimisticLockException e) {
            return new ResponseEntity<String>("Ticket was already reserved by another user", HttpStatus.CONFLICT);

        }
    }

    @PutMapping("/{id}/undoReserve")
    public ResponseEntity<String> undoReserveTicket (@PathVariable Long id) {
        try {
            boolean result = TicketService.undoReserveTicket(id);
            if (result) {
                return new ResponseEntity<String>("Ticket successfully unreserved", HttpStatus.OK);
            }
            return new ResponseEntity<String>("unreserve function failed", HttpStatus.CONFLICT);
        } catch (NullPointerException e) {
            return new ResponseEntity<String>("Ticket does not exist", HttpStatus.NOT_FOUND);
        } catch (OptimisticLockException e) {
            return new ResponseEntity<String>("unreserve function failed", HttpStatus.CONFLICT);

        }
    }
}
