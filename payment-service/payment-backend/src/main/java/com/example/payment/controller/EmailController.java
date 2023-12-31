package com.example.payment.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
//import org.springframework.mail.SimpleMailMessage;
//import org.springframework.mail.javamail.JavaMailSender;
//import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.web.client.RestTemplate;
import com.example.payment.config.*;
import com.example.payment.model.EmailRequest;

@RestController
@RequestMapping("/email")
public class EmailController {


    @Autowired
    private RestTemplate restTemplate;

    @PostMapping
    public void sendEmail(@RequestBody EmailRequest email) {
        //emailService.sendEmail(email.getTo(), email.getSubject(), email.getBody());
        System.out.println("lets say an email was sent");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<EmailRequest> requestEntity = new HttpEntity<>(email, headers);
        String scriptUrl = "https://script.google.com/macros/s/AKfycbxLHNltrz_Wa6J0pk5wcEHBwpOCJK6-AMxETFVzXHG5DXV3_IEY0MyPl4GL7mTDm7YX/exec";
        restTemplate.postForObject(scriptUrl, requestEntity, String.class);
    }

    @GetMapping
    public void doStuff() {
        System.out.println("get request sent and received");
    }
}
