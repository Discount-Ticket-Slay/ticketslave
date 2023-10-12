package com.ticketslave.queue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class QueueController {

    @GetMapping("/")
    public String queue(@RequestParam Long id) {
        System.out.println("QueueController.queue() called");
        System.out.println("id = " + id);
        return "queue";
    }
}
