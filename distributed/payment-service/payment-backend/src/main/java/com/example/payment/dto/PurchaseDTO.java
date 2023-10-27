package com.example.payment.dto;

import lombok.*;
import java.util.*;
@Getter
@Setter

public class PurchaseDTO {
    private Long purchaseId;
    private List<Long> ticketIds;
    private int price;
    private String userEmail;
}
