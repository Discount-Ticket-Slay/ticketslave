package com.ticketslave.purchase.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketslave.purchase.model.*;


public interface PurchaseRepository extends JpaRepository<Purchase, Long>{
    
}
