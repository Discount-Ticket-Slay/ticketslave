package com.ticketslave.backend.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.web.bind.annotation.*;

//import com.example.demo.event.EventService;
import com.ticketslave.backend.ticket.*;
import com.ticketslave.backend.timer.*;

import reactor.netty.channel.AbortedException;


@RestController
@RequestMapping("/purchases")
public class PurchaseController {
    
    @Autowired
    private PurchaseService PurchaseService;

    @Autowired
    private TimerService timerService;

    @GetMapping
    public ResponseEntity<List<Purchase>> getAllPurchases() {
        System.out.println(PurchaseService.getAllPurchases());
        // convert get Purchase object into json list
        return ResponseEntity.ok(PurchaseService.getAllPurchases());

    }

    // enter data into database
    @PostMapping
    public ResponseEntity<String> createPurchase(@RequestBody List<Ticket> cart, @RequestParam String userEmail) {
        try {
            if (timerService.isTimerExpired()){
                return new ResponseEntity<String>("Request timeout", HttpStatus.GATEWAY_TIMEOUT);
            }
            PurchaseService.createPurchase(cart, userEmail);
            return new ResponseEntity<String>("puchase completed", HttpStatus.OK);
        } catch (AbortedException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
        }
    }

    // @PutMapping("/{id}/add-purchase")
    // public Purchase addPurchase (@PathVariable Long id, @RequestParam Long ticketId) {
    //     return PurchaseService.addPurchase(id, ticketId);
    // }
    // @PostMapping("/{id}/add")
    // public ResponseEntity<String> addTicket(@PathVariable Long id, @RequestParam Long ticketId) {
    //     try {       
    //         PurchaseService.addTicket(id, ticketId);
    //         return new ResponseEntity<String>("Ticket successfully added to purchase", HttpStatus.OK); 
    //     } catch (NullPointerException e) {
    //         return new ResponseEntity<String>("Ticket does not exist", HttpStatus.BAD_REQUEST);
    //     } catch (AbortedException e) {
    //         return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);

    //     }
    // }

    // @PutMapping("/{id}/complete")
    // public ResponseEntity<String> completePurchase(@PathVariable Long id) {
    //     if (timerService.isTimerExpired()){
    //         System.out.println("you timed out, purchase unable to be completed");
    //         PurchaseService.deletePurchase(id);
    //     }
    //     try {
    //         PurchaseService.completePurchase(id);
    //         return new ResponseEntity<String>("Purchase completed", HttpStatus.OK); 
    //     } catch (AbortedException e){
    //         return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT); 
    //     } catch (NullPointerException e) {
    //         return new ResponseEntity<String>("Purchase does not exist", HttpStatus.BAD_REQUEST);
    //     }
    // }

    // @DeleteMapping("/{id}/delete")
    // public ResponseEntity<String> deletePurchase(@PathVariable Long id) {
    //     try {
    //         PurchaseService.deletePurchase(id);
    //         return new ResponseEntity<String>("Purchase of ID:" + id + " deleted. ", HttpStatus.OK);
    //     } catch (IllegalArgumentException e){
    //         return new ResponseEntity<String>("Purchase does not exist", HttpStatus.NOT_FOUND);
    //     }
    // }
}