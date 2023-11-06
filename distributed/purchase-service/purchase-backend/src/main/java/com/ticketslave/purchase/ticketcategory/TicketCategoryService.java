package com.ticketslave.purchase.ticketcategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.ticketslave.purchase.dto.*;
import com.ticketslave.purchase.ticket.*;

import org.springframework.web.reactive.function.*;
import org.springframework.http.ResponseEntity;
import reactor.core.publisher.Mono;
import org.springframework.web.client.RestTemplate;


import java.util.*;
import org.springframework.context.annotation.Lazy;

import jakarta.transaction.Transactional;

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
    // @Autowired
    // private EventService EventService;
    // @Autowired
    // private TicketService TicketService;

    public List<TicketCategory> getAllTicketCategorys() {
        return TicketCategoryRepository.findAll();
    }

    //grabs Event object from Feed microservice
    public EventDTO getEvent(Long ticketCategoryId) {
        TicketCategory ticketCategory = findTicketCategory(ticketCategoryId);
        Long eventId = ticketCategory.getEventId();
        //WebClient webClient = WebClientBuilder.baseUrl("http://localhost:8080").build();
        EventDTO eventDTO = RestTemplate.getForObject(BASE_URL + "/events/" + eventId + "/eventDTO", 
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

    // public TicketCategory updateEvent (Long ticketCategoryId, Long eventId) {
    //     Event event = EventService.findEvent(eventId);
    //     TicketCategory ticketCategory = findTicketCategory(ticketCategoryId);
    //     if (event == null || ticketCategory == null) {
    //         return null;
    //     }
        
//         ticketCategory.setEvent(event);
// System.out.println(ticketCategory);
//         return TicketCategoryRepository.save(ticketCategory);
//     }
    public TicketCategory createTicketCategory (TicketCategory TicketCategory) {
        return TicketCategoryRepository.save(TicketCategory);
    }

//     public TicketCategory createTicketCategory(TicketCategory TicketCategory) {
//         //loadTickets(TicketCategory);
//         //TicketCategory.setEventId(eventId);
//         Long eventId = TicketCategory.getEventId();
//         TicketCategoryRepository.save(TicketCategory);
// //System.out.println(TicketCategory.getEventId());
// //System.out.println(TicketCategory.getTicketCategoryId());
//         // TicketCategory ticketCategory = findTicketCategory(eventId);
//         String eventUpdateUrl = BASE_URL + "/feed/events" + eventId + "/update";
//         WebClient webCLient = WebClientBuilder.baseUrl(eventUpdateUrl).build();
//         Long ticketCategoryId = TicketCategory.getTicketCategoryId();
//         if (ticketCategoryId == null || eventId == null) {
// //System.out.println("bye");
//             return null;
//         }
//         ResponseEntity<String> response = webCLient
//             .put()
//             .uri(uriBuilder -> uriBuilder
//             .queryParam("ticketCategoryId", ticketCategoryId)
//             .build())
//             .retrieve()
//             .toEntity(String.class)
//             .block();

//System.out.println("lmao");
    //     return TicketCategoryRepository.save(TicketCategory);
    // }


    @Transactional
    public TicketCategory makeTickets (Long id, int count) throws IllegalArgumentException {
        
            TicketCategory ticketCategory = findTicketCategory(id);
            Long eventId = ticketCategory.getEventId();
            EventDTO event = getEvent(eventId);
            int capacity = event.getCapacity();
            if (capacity < count) {
                throw new IllegalArgumentException("Count exceeds capacity");
            }
    //System.out.println(event.getName());
            List<Ticket> tickets = new ArrayList<>();
            int counter = 0;
            int seatNo = 1;
            char rowChar = 'A';
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
                if (rowChar >= 'Z') {
                    rowChar = 'A';
                }
                tickets.add(ticket);
                ticket.setTicketCategory(ticketCategory);
            }
            ticketCategory.setTickets(tickets);
            return TicketCategoryRepository.save(ticketCategory);
    
    }
}
