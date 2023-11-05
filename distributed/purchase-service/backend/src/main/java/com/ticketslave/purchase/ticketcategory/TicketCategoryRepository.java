package com.ticketslave.purchase.ticketcategory;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.*;

public interface TicketCategoryRepository extends JpaRepository<TicketCategory, Long> {
    
        @Query(value = "SELECT * FROM Ticket_Category t WHERE t.event_id = :eventId ", nativeQuery = true)
    List<TicketCategory> findByEventId(@Param("eventId") Long eventId);
}
