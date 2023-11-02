package com.ticketslave.buffer.controller;

import com.ticketslave.buffer.service.RandomiserService;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/buffer")
public class BufferController {

    // serve the buffer landing page
    public String home(@RequestParam(name = "userId", required = false) String userId) {
        return "index";
    }

}