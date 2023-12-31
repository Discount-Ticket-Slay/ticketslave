package com.example.payment.service;
import com.example.payment.config.*;
import com.example.payment.controller.EmailController;
import com.example.payment.dto.*;
import com.example.payment.model.*;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.DependsOn;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import reactor.netty.channel.AbortedException;


@Service
public class StripeService {
    @Value("${stripe.key.secret}")
    private String API_SECRET_KEY;

    @Autowired
    private RestTemplate RestTemplate;

    @Autowired
    private EmailController EmailController;

    private final String BASE_URL = "https://www.ticketslave.org/purchase/purchases/";

    public String createCustomer(String email, String token) {
        String id = null;

        try {
            Stripe.apiKey = API_SECRET_KEY;
            Map<String, Object> customerParams = new HashMap<>();
            customerParams.put("description", "Customer for "+ email);
            customerParams.put("email", email);
            customerParams.put("source", token);

            Customer customer = Customer.create(customerParams);
            id = customer.getId();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return id;
    }

    //completes payment transaction
    public String createCharge(String email, String token, Long purchaseId) throws AbortedException{
        //grab PurchaseDTO microservice
        PurchaseDTO purchase = RestTemplate.getForObject(BASE_URL + purchaseId, 
        PurchaseDTO.class);
        String chargeId = null;

        try {
            Stripe.apiKey = API_SECRET_KEY;

            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("description", "Charge for " + email);
            chargeParams.put("currency", "usd");

            if (purchase.getPrice() < 0) {
                throw new AbortedException("No tickets in cart");
            }

            chargeParams.put("amount", purchase.getPrice());
            chargeParams.put("source", token);

            Charge charge = Charge.create(chargeParams);

            chargeId = charge.getId();

            //Send req back to Purchase microservice to complete purchase transaction and update database
            ResponseEntity<String> responseEntity = RestTemplate.exchange(BASE_URL + purchaseId,
            HttpMethod.PUT,
            null,
            String.class);
            if (!responseEntity.getStatusCode().is2xxSuccessful()) {
                throw new AbortedException(responseEntity.getBody());
            }

            //call email function from here
            List<Long> ticketList = purchase.getTicketIds();
            Long purchaseID = purchase.getPurchaseId();
            String userEmail = purchase.getUserEmail();
            int price = purchase.getPrice();
            EmailRequest emailRequest = new EmailRequest(userEmail,purchaseID,price,ticketList);
            EmailController.sendEmail(emailRequest);
            
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return chargeId;
    }
}
