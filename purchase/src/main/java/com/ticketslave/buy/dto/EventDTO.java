package com.ticketslave.buy.dto;

import lombok.*;
import java.util.*;
@Getter
@Setter
public class EventDTO {
    private Long eventId;
    private String eventName;
    private String eventDescription;
    private String StartDateTime;
    private String venue;
    private String artist;
    private int capacity;
    private List<Long> ticketCategoryIds;
}




