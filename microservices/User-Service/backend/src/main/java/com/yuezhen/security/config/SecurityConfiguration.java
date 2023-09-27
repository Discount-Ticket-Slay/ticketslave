package com.yuezhen.security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
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

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean // Annotate the method to indicate it's a Spring bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Disable CSRF (Cross-Site Request Forgery) protection
                .csrf(csrf -> csrf.disable())

                // Configure authorization rules
                .authorizeHttpRequests(auth -> auth
                        // Allow all requests that have an "api/v1/auth" header
                        .requestMatchers("/api/v1/auth/**")
                        .permitAll()
                        // For any other request, require authentication
                        .anyRequest()
                        .authenticated())

                // Configure session management
                .sessionManagement(session -> session
                        // Set session management policy to stateless
                        // This ensures Spring Security will not create a session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))

                // Add custom authentication provider
                .authenticationProvider(authenticationProvider)

                // Add custom JWT authentication filter before the default
                // UsernamePasswordAuthenticationFilter
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        // Build the HttpSecurity object
        return http.build();
    }

}