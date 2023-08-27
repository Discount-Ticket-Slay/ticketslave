package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class TicketCategoryService {

    @Autowired
    private TicketCategoryRepository TicketCategoryRepository;

    public List<TicketCategory> getAllTicketCategorys() {
        return TicketCategoryRepository.findAll();
    }

    public TicketCategory createTicketCategory(TicketCategory TicketCategory) {
        //loadTickets(TicketCategory);
        
        return TicketCategoryRepository.save(TicketCategory);
    }
}
