package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/email")
public class EmailController {
 
    @Autowired
    private EmailService emailService;
 
    @PostMapping("/email")
    public void sendEmail(@RequestBody EmailRequest email) {
        emailService.sendEmail(email.getTo(), email.getSubject(), email.getBody());
    }
}
