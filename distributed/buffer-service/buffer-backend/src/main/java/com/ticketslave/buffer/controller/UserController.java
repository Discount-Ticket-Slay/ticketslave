package com.ticketslave.buffer.controller;

import com.ticketslave.buffer.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/buffer/user")
public class UserController {

    private final JwtService jwtService;

    @Autowired
    public UserController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping("/email")
    public ResponseEntity<?> getEmailFromToken(HttpServletRequest request) {
        try {
            // Extract the token from the cookies
            String jwtToken = jwtService.extractTokenFromCookies(request);
            if (jwtToken != null && jwtService.verifyToken(jwtToken)) {
                // Extract the email from the token
                String email = jwtService.getEmailFromToken(jwtToken);
                if (email != null && !email.isEmpty()) {
                    return ResponseEntity.ok(email);
                } else {
                    return ResponseEntity.badRequest().body("Email not found in token");
                }
            } else {
                return ResponseEntity.status(401).body("Invalid or missing JWT token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An error occurred while extracting email from token");
        }
    }
}
