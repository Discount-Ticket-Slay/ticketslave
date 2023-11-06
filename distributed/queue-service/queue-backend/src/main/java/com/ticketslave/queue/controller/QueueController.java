package com.ticketslave.queue.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import jakarta.servlet.http.HttpSession;
import java.util.*;

@Controller
@RequestMapping("/queue")
public class QueueController {

    @GetMapping()
    public String home() {
        return "index";
    }

    @PostMapping("/queue")
    public ResponseEntity<String> updateQueue(@RequestBody Map<String, Object> payload, HttpSession session) {
        String userId = (String) payload.get("userId");
        int queueNumber = (Integer) payload.get("queueNumber");

        System.out.println("updateQueue: Received queue update for user " + userId + ": " + queueNumber);

        // Store userId and queueNumber in server-side session (for security)
        session.setAttribute("userId", userId);
        session.setAttribute("queueNumber", queueNumber);

        System.out.println("updateQueue: Stored queue update in server-side session");

        return new ResponseEntity<>("OK", HttpStatus.OK);
    }

    @GetMapping("/getQueueData")
    public ResponseEntity<Map<String, Object>> getQueueData(HttpSession session) {
        Map<String, Object> data = new HashMap<>();

        // Fetch userId and queueNumber from the server-side session
        data.put("userId", session.getAttribute("userId"));
        data.put("queueNumber", session.getAttribute("queueNumber"));

        System.out.println("getQueueData: Fetched queue data from server-side session, data = " + data);

        return new ResponseEntity<>(data, HttpStatus.OK);
    }


}

