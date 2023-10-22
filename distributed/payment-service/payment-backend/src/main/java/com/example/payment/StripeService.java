package com.example.payment;
import com.example.payment.config.*;
import com.example.payment.dto.*;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import org.springframework.context.annotation.*;
import org.springframework.web.reactive.function.client.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class StripeService {
    @Value("${stripe.key.secret}")
    private String API_SECRET_KEY;

    @Autowired
    private RestTemplate RestTemplate;

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

    public String createCharge(String email, String token, Long purchaseId) {
        //grab PurchaseDTO microservice
        PurchaseDTO purchase = RestTemplate.getForObject("http://localhost:8081/purchases/" + purchaseId, 
        PurchaseDTO.class);
        String chargeId = null;
        try {
            Stripe.apiKey = API_SECRET_KEY;

            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("description", "Charge for " + email);
            chargeParams.put("currency", "usd");
            chargeParams.put("amount", purchaseDTO.getPrice());
            chargeParams.put("source", token);

            Charge charge = Charge.create(chargeParams);

            chargeId = charge.getId();

            //call email function from here?
            
        } catch (Exception e) {
            e.printStackTrace();
        }
        return chargeId;
    }
}
