package com.ticketslave.home.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.*;


import java.io.IOException;
import java.util.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.ticketslave.home.config.RestTemplateConfig;
import com.ticketslave.home.dto.*;
import com.ticketslave.home.event.Event;
import com.ticketslave.home.repository.EventRepository;

@Service
public class EventService {

    @Autowired
    private EventRepository EventRepository;

    @Autowired
    private WebClient.Builder WebClientBuilder;
    @Autowired
    private RestTemplateConfig RestTemplate;

    public List<Event> getAllEvents() {
        return EventRepository.findAll();
    }

    public List<TicketCategoryDTO> getTicketCategoriesByEventId(Long eventId) {
        List<TicketCategoryDTO> ticketCategories = WebClientBuilder
            .baseUrl("http://localhost:8081")
            .build()
            .get()
            .uri("/ticketcategory/{eventId}/getcategories", eventId)
            .retrieve()
            .bodyToFlux(TicketCategoryDTO.class)
            .collectList()
            .block();

        return ticketCategories;
    }

    public EventDTO getEventDTO(Long eventId) {
        Event event = findEvent(eventId);
        EventDTO eventDTO = event.toDTO();

        return eventDTO;
    }

    public void updateTicketCategory(Long eventId, Long ticketCategoryId) {
System.out.println("Start");

        Event event = findEvent(eventId);
        List<Long> ticketCategoryIds = event.getTicketCategoryIds();
        ticketCategoryIds.add(ticketCategoryId);
        event.setTicketCategoryIds(ticketCategoryIds);
System.out.println("Done");
        EventRepository.save(event);
    }

    // public void createTicketCategory(CreateTicketCategoryDTO createTicketCategoryDTO) {
    //     String ticketCategoryServiceUrl = "http;//localhost:8080";
    //     WebClient webclient = WebClientBuilder.baseUrl(ticketCategoryServiceUrl).build();

    //     Flux<CreateTicketCategoryDTO> ticketCategoryDTOs = Flux.just(
    //         createTicketCategoryDTO
    //     );

    //     ticketCategoryDTOs 
    //         .flatMap(dto ->
    //             webclient
    //                 .post()
    //                 .uri("/ticketcategory")
    //                 .body(Mono.just(dto), CreateTicketCategoryDTO.class)
    //                 .retrieve()
    //                 .bodyToMono(Void.class)
    //                 )
    //                 .blockLast();
    // }

    public Event createEvent(Event Event) {
        //loadTickets(Event);
        
        return EventRepository.save(Event);
    }
    public void deleteEvent(Long eventId) throws IllegalArgumentException{
        //loadTickets(Event);
        EventRepository.deleteById(eventId);
    }

    //@Transactional
//     public Event addTicketCategory(Long id, TicketCategory ticketCategory) {
//         Event event = findEvent(id);
//         if (event == null) {
//             return null;
//         }
//         TicketCategoryService.createTicketCategory(ticketCategory, event);
//         event.addTicketCategory(ticketCategory);
// System.out.println("printing: " + ticketCategory);
// System.out.println(event.getTicketCategories());
//         return EventRepository.save(event);
//     }

    public Event findEvent(Long eventId) {
        return EventRepository.findById(eventId).orElse(null);
    }

    // public Event addImage(Long id, MultipartFile file) {
    //     Event event = findEvent(id);
    //     if (event == null || file == null) {
    //         return null;
    //     }
    //     try {
    //         event.setImage(file.getBytes());
    //     } catch (IOException e) {
    //         return null;
    //     }
    //     return EventRepository.save(event);
    // }
}
