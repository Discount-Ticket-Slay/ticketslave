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
 
    @PostMapping("/send")
    public void sendEmail(@RequestBody EmailService email, String to, String subject, String body) {
        email.sendEmail(to, subject, body);
    }
}
