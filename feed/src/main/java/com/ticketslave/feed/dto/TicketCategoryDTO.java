package com.ticketslave.demo.dto;

import java.util.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TicketCategoryDTO {
    private Long id;
    private String name;
    private double price;
    private List<Long> ticketIds;
    private Long eventId;
}
