package com.example.demo.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.*;
import com.example.demo.ticket.*;


@RestController
@RequestMapping("/purchases")
public class PurchaseController {
    
    @Autowired
    private PurchaseService PurchaseService;

    @GetMapping
    public ResponseEntity<List<Purchase>> getAllPurchases() {
        System.out.println(PurchaseService.getAllPurchases());
        // convert get Purchase object into json list
        return ResponseEntity.ok(PurchaseService.getAllPurchases());

    }

    // enter data into database
    @PostMapping
    public Purchase createPurchase(@RequestBody Purchase Purchase) {

        System.out.println(Purchase);
        
        return PurchaseService.createPurchase(Purchase);
    }
    // @PutMapping("/{id}/add-purchase")
    // public Purchase addPurchase (@PathVariable Long id, @RequestParam Long ticketId) {
    //     return PurchaseService.addPurchase(id, ticketId);
    // }
}
