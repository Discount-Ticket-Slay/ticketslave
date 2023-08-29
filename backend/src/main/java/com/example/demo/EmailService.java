package com.example.demo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
 
    @Autowired
    private JavaMailSender mailSender;
 
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
 
        mailSender.send(message);
    }
}

//alternate implementation
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.mail.SimpleMailMessage;
// import org.springframework.mail.javamail.JavaMailSender;
// import org.springframework.stereotype.Service;

// @Service
// public class EmailService {

//     private final JavaMailSender javaMailSender;

//     @Autowired
//     public EmailService(JavaMailSender javaMailSender) {
//         this.javaMailSender = javaMailSender;
//     }

//     public void sendEmail(String to, String subject, String body) {
//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setTo(to);
//         message.setSubject(subject);
//         message.setText(body);
//         javaMailSender.send(message);
//     }
// }
