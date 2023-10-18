package com.example.payment;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.payment.StripeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Controller
//@RequestMapping("/payments")
public class PaymentController {

    @Value("${stripe.key.public}")
    private String API_PUBLIC_KEY;

    //@Autowired
    private StripeService stripeService;

    public PaymentController (StripeService stripeService) {
        this.stripeService = stripeService;
    }

	@GetMapping("/")
	public String homepage() {
		return "homepage";
	}

	@GetMapping("/charge")
	public String chargePage(Model model) {
		model.addAttribute("stripePublicKey", API_PUBLIC_KEY);
		return "charge";
	}

    //INCOMPLETE: Need to configure so it can accept new input amount 
    @PostMapping("/create-charge") 
    public @ResponseBody Response createCharge(String email, String token) {
        if (token == null) {
            return new Response(false, "Stripe payment token is missing. Please try again later.");
        }
        //Arbitrary amount for now, 9.99 USD
        String chargeId = stripeService.createCharge(email, token, 999); 
        
        if (chargeId == null) {
            return new Response(false, "Error occurred while trying to charge");
        }

        return new Response(true, "Success! Your charge ID is " + chargeId);
    }
}
