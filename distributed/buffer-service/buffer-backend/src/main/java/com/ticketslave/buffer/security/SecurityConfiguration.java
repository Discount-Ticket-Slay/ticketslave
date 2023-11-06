package com.ticketslave.buffer.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

	@Bean
	@Autowired
	public SecurityFilterChain securityFilterChain(final JwtAuthenticationFilter jwtAuthFilter, HttpSecurity http)
			throws Exception {
		http
			.cors(customizer -> customizer.configurationSource(corsConfigurationSource()))
			.csrf(csrf -> csrf.disable()) // Disable CSRF (Cross-Site Request Forgery) protection

			// Configure authorization rules
			.authorizeHttpRequests(auth -> auth
					.anyRequest().permitAll())

			// Configure session management
			.sessionManagement(session -> session
					.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

			// Add custom JWT authentication filter before the default
			// UsernamePasswordAuthenticationFilter
			.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		// Build the HttpSecurity object
		return http.build();
	}

	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Collections.singletonList("*")); // Specify the allowed origins
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        
		// This allow us to expose the headers
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}