package com.ticketslave.home.authentication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    @Autowired
    private final JwtAuthenticationFilter jwtAuthFilter;

    @Bean // Annotate the method to indicate it's a Spring bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF (Cross-Site Request Forgery) protection
                .csrf(csrf -> csrf.disable())

                // Configure authorization rules
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/", "/#/feed", "/#/Event", "/auth/cognito-callback", "/public/**")
                        .permitAll() // Allow access to the home page and login page
                    
                        // .anyRequest() // For any other request, require authentication
                        // .authenticated())

                        // temporarily allow all
                        .anyRequest().permitAll())

                // Configure session management
                .sessionManagement(session -> session
                        // Set session management policy to stateless
                        // This ensures Spring Security will not create a session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Add custom JWT authentication filter before the default
                // UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // Build the HttpSecurity object
        return http.build();
    }

}