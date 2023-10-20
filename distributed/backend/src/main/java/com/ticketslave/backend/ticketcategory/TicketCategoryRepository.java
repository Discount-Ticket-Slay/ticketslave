package com.ticketslave.backend.ticketcategory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory, Long> {
    
}
