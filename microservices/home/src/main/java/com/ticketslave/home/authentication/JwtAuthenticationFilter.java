package com.ticketslave.home.authentication;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.util.Collections;
import java.util.stream.Collectors;
import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtService jwtService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        // Skip JWT verification for these paths
        String path = request.getRequestURI();
        if (path.equals("/")
                || path.startsWith("/#/feed")
                || path.startsWith("/#/Event")
                || path.equals("/auth/cognito-callback")
                || path.startsWith("/public/")) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = null;

        // Retrieve the jwt token from the request
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (cookie.getName().equals("jwtToken")) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        System.out.println("jwtToken: " + jwtToken);

        // Verify the jwt token
        if (jwtToken != null && jwtService.verifyToken(jwtToken)) {
            
            // update the authorisation header
            String username = jwtService.getUsernameFromToken(jwtToken);
            List<String> roles = jwtService.getRolesFromToken(jwtToken);

            System.out.println("username: " + username);
            System.out.println("roles: " + roles);

            List<GrantedAuthority> authorities = roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

            Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
            SecurityContextHolder.getContext().setAuthentication(authentication);


        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }
}
