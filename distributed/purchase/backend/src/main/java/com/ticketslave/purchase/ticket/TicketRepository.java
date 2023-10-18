package com.ticketslave.purchase.ticket;

import java.util.*;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.*;
import org.springframework.data.repository.query.*;


public interface TicketRepository extends JpaRepository<Ticket, Long> {
    // @Query("Select t from Ticket t where t.seatNo = ?1 AND t.rowChar = ?2 AND t.ticketCategoryId = ?3")
    // List<Ticket> findBySeatNoAndRowChar(int seatNo, char rowChar, Long ticketCategoryId);

    @Query(value = "SELECT * FROM Ticket t WHERE t.seat_no = :seatNo AND t.row_char = :rowChar AND t.ticket_category_id = :ticketCategoryId", nativeQuery = true)
    List<Ticket> findBySeatNoAndRowChar(@Param("seatNo") int seatNo, @Param("rowChar") char rowChar, @Param("ticketCategoryId") Long ticketCategoryId);

}
