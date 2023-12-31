package com.ticketslave.purchase.repository;

import java.util.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.*;
import org.springframework.data.repository.query.*;
import com.ticketslave.purchase.model.*;



public interface TicketRepository extends JpaRepository<Ticket, Long> {

    @Query(value = "SELECT * FROM Ticket t WHERE t.seat_no = :seatNo AND t.row_char = :rowChar AND t.ticket_category_id = :ticketCategoryId", nativeQuery = true)
    List<Ticket> findBySeatNoAndRowChar(@Param("seatNo") int seatNo, @Param("rowChar") char rowChar, @Param("ticketCategoryId") Long ticketCategoryId);

}
