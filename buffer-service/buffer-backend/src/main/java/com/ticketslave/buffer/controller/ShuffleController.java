package com.ticketslave.buffer.controller;

import com.ticketslave.buffer.security.JwtService;
import com.ticketslave.buffer.service.ShuffleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/buffer")
public class ShuffleController {

    private final JwtService jwtService;
    private final ShuffleService shuffleService;

    @Value("${ADMIN_EMAIL}")
    private String adminEmail;

    @Autowired
    public ShuffleController(JwtService jwtService, ShuffleService shuffleService) {
        this.jwtService = jwtService;
        this.shuffleService = shuffleService;
    }

    /*
     * Input: HttpServletRequest
     * Output: ResponseEntity<String>
     * Description: Endpoint to trigger the randomisation process. It checks for
     * admin privileges
     * before proceeding. Unauthorized or non-admin users receive an appropriate
     * response.
     */
    @GetMapping("/trigger-randomiser")
    public ResponseEntity<String> triggerRandomiser(HttpServletRequest request) {
        System.out.println("Backend: Triggering randomiser");
        return processRequest(request, () -> {
            shuffleService.processAndSendUserId();
            return "Randomisation process triggered.";
        });
    }

    /*
     * Input: HttpServletRequest
     * Output: ResponseEntity<Boolean>
     * Description: Endpoint to check if the requesting user is an admin.
     * It returns true if the user is an admin, false otherwise.
     */
    @GetMapping("/isAdmin")
    public ResponseEntity<Boolean> isAdmin(HttpServletRequest request) {
        return processRequest(request, () -> true, false);
    }

    /*
     * Input: HttpServletRequest, onSuccess action, onFailureResponse
     * Output: ResponseEntity<T>
     * Description: Processes a request to verify if the user is authenticated and
     * an admin,
     * then performs the onSuccess action if they are, or returns the
     * onFailureResponse otherwise.
     */
    private <T> ResponseEntity<T> processRequest(HttpServletRequest request, PrivilegedAction<T> onSuccess,
            T onFailureResponse) {
        String jwtToken = jwtService.extractTokenFromCookies(request);
        if (jwtToken == null || !jwtService.verifyToken(jwtToken)) {
            return ResponseEntity.status(401).body(onFailureResponse);
        }

        String userEmail = jwtService.getEmailFromToken(jwtToken);
        if (userEmail.equals(adminEmail)) {
            return ResponseEntity.ok(onSuccess.execute());
        } else {
            return onFailureResponse != null ? ResponseEntity.ok(onFailureResponse)
                    : ResponseEntity.status(403).build();
        }
    }

    /*
     * Input: HttpServletRequest, onSuccess action
     * Output: ResponseEntity<T>
     * Description: Overloaded processRequest method to provide a default null
     * response
     * for onFailureResponse.
     */
    private <T> ResponseEntity<T> processRequest(HttpServletRequest request, PrivilegedAction<T> onSuccess) {
        return processRequest(request, onSuccess, null);
    }

    @FunctionalInterface
    private interface PrivilegedAction<T> {
        T execute();
    }
}
