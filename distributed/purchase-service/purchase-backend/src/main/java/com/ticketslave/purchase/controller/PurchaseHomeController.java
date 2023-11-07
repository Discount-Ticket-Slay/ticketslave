package com.ticketslave.purchase.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.ticketslave.purchase.model.*;
import com.ticketslave.purchase.service.*;
import jakarta.servlet.http.HttpServletRequest;

import java.util.Map;

@Controller
@RequestMapping("/purchase")
public class PurchaseHomeController {

    /*
     * Endpoint: /purchase
     * Input: None
     * Output: String "index"
     * Description: This method returns the home page view using Thymeleaf
     */
    @GetMapping()
    public String home() {
        return "index";
    } 


}
