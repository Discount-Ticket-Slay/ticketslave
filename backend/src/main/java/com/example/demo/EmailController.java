package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping
    public void sendEmail(@RequestBody EmailRequest email) {
        // emailService.sendEmail(email.getTo(), email.getSubject(), email.getBody());
        System.out.println("lets say an email was sent");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<EmailRequest> requestEntity = new HttpEntity<>(emailRequest, headers);
        String scriptUrl = "URL_OF_YOUR_GOOGLE_SCRIPT_WEB_APP";
        restTemplate.postForObject(scriptUrl, requestEntity, String.class);
    }

    @GetMapping
    public void doStuff() {
        System.out.println("get request sent and received");
    }
}
