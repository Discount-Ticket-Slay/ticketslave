package com.ticketslave.buffer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/buffer")
public class BufferController {

    // serve the buffer landing page
    @GetMapping()
    public String home() {
        return "index";
    }

}