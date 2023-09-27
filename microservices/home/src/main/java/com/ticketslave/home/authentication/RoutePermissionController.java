package com.ticketslave.home.authentication;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/route-permission")
public class RoutePermissionController {

    private final JwtService jwtService;

    @Autowired
    public RoutePermissionController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @GetMapping
    public ResponseEntity<?> checkRoutePermission(
            @RequestParam String route,
            @RequestHeader("Authorization") String authorizationHeader,
            @AuthenticationPrincipal UserDetails userDetails) {

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);
            if (jwtService.verifyToken(token) && userHasPermissionForRoute(route, userDetails)) {
                return ResponseEntity.ok().build();
            }
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
    }

    private boolean userHasPermissionForRoute(String route, UserDetails userDetails) {

        // Placeholder to potentially implement further route-specific checks

        // For demonstration purposes, let's print out the user details and route.
        System.out.println("userDetails: " + userDetails);
        System.out.println("route: " + route);

        // For now, always return true, but you can adjust this as needed.
        return true;
    }
}
