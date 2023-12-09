package com.example.payment.controller;
import com.example.payment.dto.*;
import com.example.payment.model.Response;
import com.example.payment.service.StripeService;
import com.example.payment.config.*;
import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.DependsOn;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@Controller
@RequestMapping("/payments")
public class PaymentController {

    @Value("${stripe.key.public}")
    private String API_PUBLIC_KEY;

    //@Autowired
    private StripeService stripeService;

    //@Autowired
    public PaymentController (StripeService stripeService) {
        this.stripeService = stripeService;
    }

	@GetMapping("/")
	public String index() {
		return "index";
	}

	// @GetMapping("/charge")
	// public String chargePage(Model model) {
	// 	model.addAttribute("stripePublicKey", API_PUBLIC_KEY);
	// 	return "charge";
	// }

    //INCOMPLETE: Need to configure so it can accept new input amount 
    @PostMapping("/create-charge") 
    public @ResponseBody Response createCharge(String email, String token, Long purchaseId) {
    
        
        if (token == null) {
            return new Response(false, "Stripe payment token is missing. Please try again later.");
        }
        //Arbitrary amount for now, 9.99 USD
        String chargeId = stripeService.createCharge(email, token, purchaseId); 
 
        if (chargeId == null) {
            return new Response(false, "Error occurred while trying to charge");
        }

        return new Response(true, "Success! Your charge ID is " + chargeId);
    }
}
