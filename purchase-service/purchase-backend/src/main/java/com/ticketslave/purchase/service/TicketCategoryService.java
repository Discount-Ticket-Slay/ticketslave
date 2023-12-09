package com.ticketslave.purchase.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import com.ticketslave.purchase.dto.*;
import com.ticketslave.purchase.model.*;
import org.springframework.web.reactive.function.*;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;
import org.springframework.web.client.RestTemplate;
import java.util.*;
import org.springframework.context.annotation.Lazy;
import jakarta.transaction.Transactional;
import com.ticketslave.purchase.repository.*;
import com.ticketslave.purchase.controller.*;

@Service
@Lazy
public class TicketCategoryService {

    @Autowired
    private TicketCategoryRepository TicketCategoryRepository;
    @Autowired
    private WebClient.Builder WebClientBuilder;
    @Autowired
    private RestTemplate RestTemplate;
    private final String BASE_URL = "https://www.ticketslave.org";

    public List<TicketCategory> getAllTicketCategorys() {
        return TicketCategoryRepository.findAll();
    }

    //grabs Event object from Feed microservice
    public EventDTO getEvent(Long ticketCategoryId) {
        TicketCategory ticketCategory = findTicketCategory(ticketCategoryId);
        Long eventId = ticketCategory.getEventId();
        if (eventId == null) {
            return null;
        }
        EventDTO eventDTO = RestTemplate.getForObject(BASE_URL + "/feed/events/" + eventId + "/eventDTO", 
                                                        EventDTO.class);

            return eventDTO;
    }

    public List<TicketCategoryDTO> getTicketCategoryFromEventId (Long eventId) {
        List<TicketCategory> ticketCategory = TicketCategoryRepository.findByEventId(eventId);
        List<TicketCategoryDTO> dto = new ArrayList<>();
        for (TicketCategory t: ticketCategory) {
            dto.add(t.toDTO());
        }

        return dto;
    }

    public TicketCategory findTicketCategory(Long ticketCategoryId) {
        return TicketCategoryRepository.findById(ticketCategoryId).orElse(null);
    }

    public TicketCategory createTicketCategory (TicketCategory TicketCategory) {
        return TicketCategoryRepository.save(TicketCategory);
    }

    @Transactional
    public TicketCategory makeTickets (Long id, int count) throws IllegalArgumentException {
        final char FIRST_ROW_CHAR = 'A';
        final char LAST_ROW_CHAR = 'Z';
            TicketCategory ticketCategory = findTicketCategory(id);
            EventDTO event = getEvent(id);
            int capacity = event.getCapacity();
            if (capacity < count) {
                throw new IllegalArgumentException("Count exceeds capacity");
            }
            List<Ticket> tickets = new ArrayList<>();
            int counter = 0;
            int seatNo = 1;
            char rowChar = FIRST_ROW_CHAR;
            for (int i = 0; i < count; i++) {
                Ticket ticket = new Ticket(seatNo, rowChar);
                counter++;
                seatNo++;
                if (counter >= 10) {
                    rowChar++;
                    counter = 0;
                }
                if (seatNo > 10) {
                    seatNo = 1;
                }
                if (rowChar >= LAST_ROW_CHAR) {
                    rowChar = FIRST_ROW_CHAR;
                }
                tickets.add(ticket);
                ticket.setTicketCategory(ticketCategory);
            }
            ticketCategory.setTickets(tickets);
            return TicketCategoryRepository.save(ticketCategory);
    
    }
}
