package com.ticketslave.feed.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ticketslave.feed.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    
}