package com.ticketslave.home.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ticketslave.home.event.Event;

import java.util.*;

public interface EventRepository extends JpaRepository<Event, Long> {
    
    // @Query(value = "SELECT * FROM Event e WHERE :ticketCategoryId = ANY (select tc from e.ticket_category_ids tc)", nativeQuery = true)
    // List<Event> findByTicketCategoryId(@Param("ticketCategoryId") Long ticketCategoryId);
}