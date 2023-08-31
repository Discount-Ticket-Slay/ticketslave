package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class PurchaseService {
    @Autowired
    private PurchaseRepository PurchaseRepository;

    public List<Purchase> getAllPurchases() {
        return PurchaseRepository.findAll();
    }

    public Purchase findPurchase(Long id) {
        return PurchaseRepository.findById(id).orElse(null);
    }

    public Purchase createPurchase(Purchase Purchase) {
        
        return PurchaseRepository.save(Purchase);
    }
}
