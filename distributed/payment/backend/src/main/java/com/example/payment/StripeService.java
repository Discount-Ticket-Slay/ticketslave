package com.example.payment;

import java.util.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.stripe.Stripe;
import com.stripe.model.Charge;
import com.stripe.model.Customer;

@Service
public class StripeService {
    @Value("${stripe.key.secret}")
    private String API_SECRET_KEY;

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

    public String createCharge(String email, String token, int amount) {
        String chargeId = null;
        try {
            Stripe.apiKey = API_SECRET_KEY;

            Map<String, Object> chargeParams = new HashMap<>();
            chargeParams.put("description", "Charge for " + email);
            chargeParams.put("currency", "usd");
            chargeParams.put("amount", amount);
            chargeParams.put("source", token);

            Charge charge = Charge.create(chargeParams);

            chargeId = charge.getId();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return chargeId;
    }
}
