package com.ticketslave.purchase.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.ticketslave.purchase.dto.*;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.ticketslave.purchase.ticket.*;

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

    @GetMapping("/{id}")
    public ResponseEntity<PurchaseDTO> getPurchaseDTO(@RequestParam Long purchaseId) {
        System.out.println(PurchaseService.getPurchaseDTO(purchaseId));
        // convert get Purchase object into json list
        return ResponseEntity.ok(PurchaseService.getPurchaseDTO(purchaseId));

    }

    // enter data into database
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping("/{userEmail}")
    public Purchase createPurchase(@PathVariable String userEmail) {
        System.out.println("did it work");
        System.out.println("purchase created with " + userEmail);
        timerService.startTimer();
        return PurchaseService.createPurchase(userEmail);
    }
    // @PutMapping("/{id}/add-purchase")
    // public Purchase addPurchase (@PathVariable Long id, @RequestParam Long ticketId) {
    //     return PurchaseService.addPurchase(id, ticketId);
    // }
    @PostMapping("/{id}/add")
    public ResponseEntity<String> addTicket(@PathVariable Long id, @RequestParam Long ticketId) {
        if (timerService.isTimerExpired()){
            System.out.println("you timed out, your purchase will be deleted");
            PurchaseService.deletePurchase(id);
        }
        try {       
            PurchaseService.addTicketId(id, ticketId);
            return new ResponseEntity<String>("Ticket successfully added to purchase", HttpStatus.OK); 
        } catch (NullPointerException e) {
            return new ResponseEntity<String>("Ticket does not exist", HttpStatus.BAD_REQUEST);
        } catch (AbortedException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);

        }
    }

    @PutMapping("/{id}/complete")
    public ResponseEntity<String> completePurchase(@PathVariable Long id) {
        if (timerService.isTimerExpired()){
            System.out.println("you timed out, purchase unable to be completed");
            PurchaseService.deletePurchase(id);
        }
        try {
            System.out.println("you passed the timer");
            PurchaseService.completePurchase(id);
            return new ResponseEntity<String>("Purchase completed", HttpStatus.OK); 
        } catch (AbortedException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT); 
        } catch (NullPointerException e) {
            return new ResponseEntity<String>("Purchase does not exist", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/{id}/delete")
    public ResponseEntity<String> deletePurchase(@PathVariable Long id) {
        try {
            PurchaseService.deletePurchase(id);
            return new ResponseEntity<String>("Purchase of ID:" + id + " deleted. ", HttpStatus.OK);
        } catch (IllegalArgumentException e){
            return new ResponseEntity<String>("Purchase does not exist", HttpStatus.NOT_FOUND);
        }
    }
}
