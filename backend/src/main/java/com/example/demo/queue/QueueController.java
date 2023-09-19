package com.example.demo.queue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.Channel;

@RestController
@RequestMapping("/queue")
public class QueueController {

    private final MessageProducer messageProducer;

    @Autowired
    public QueueController(MessageProducer messageProducer) {
        this.messageProducer = messageProducer;
    }

    @PostMapping("/send")
    public String sendMessageToQueue(@RequestBody String message) {
        System.out.println("something is happening");
        System.out.println(message);
        try {
            // Send the message using the MessageProducer
            messageProducer.send("hello testing");
            return "Message sent to the queue: " + message;
        } catch (Exception e) {
            return "Failed to send message: " + e.getMessage();
        }
    }
}

