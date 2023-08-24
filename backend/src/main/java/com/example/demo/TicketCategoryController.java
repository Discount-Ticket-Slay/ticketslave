package com.example.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/ticketcategory")
public class TicketCategoryController {

    @Autowired
    private TicketCategoryService TicketCategoryService;

    @GetMapping
    public List<TicketCategory> getAllTicketCategorys() {
        System.out.println(TicketCategoryService.getAllTicketCategorys());
        
        // convert get TicketCategory object into json list
        return TicketCategoryService.getAllTicketCategorys();

    }

    // enter data into database
    @PostMapping
    public TicketCategory createTicketCategory(@RequestBody TicketCategory TicketCategory) {

        System.out.println(TicketCategory);
        return TicketCategoryService.createTicketCategory(TicketCategory);
    }

    // Other controller methods...

}


