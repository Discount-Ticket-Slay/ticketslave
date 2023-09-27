// Import necessary packages and classes
package com.yuezhen.security.config;

import java.io.IOException;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;

import lombok.RequiredArgsConstructor;

@Component // Annotate class as a Spring Component
@RequiredArgsConstructor // Use Lombok to inject dependencies via constructor
// Extend OncePerRequestFilter to ensure this filter is applied once per request
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    // Declare dependency on JwtService & UserDetailsService
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    // Override the doFilterInternal method to customise the filter operation
    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        // skip redirection if the request is for the login page
        if (request.getRequestURI().equals("/api/v1/auth/register")) {
            filterChain.doFilter(request, response);
            return;
        }

        // skip redirection if the request is for the cognito callback page
        if (request.getRequestURI().equals("/api/v1/auth/cognito-callback")) {
            filterChain.doFilter(request, response);
            return;
        }

        // // Retrieve the Authorisation header from the request
        // String authHeader = request.getHeader("Authorisation");
        // final String jwt;
        // final String userEmail;

        // System.out.println("hello");
        // System.out.println(response);
        // System.out.println(request.getHeader("Authorisation"));

        // System.out.println("authHeader: " + authHeader);

        // // check the cookie for jwt token
        // Cookie[] cookies = request.getCookies();
        // if (cookies != null) {
        // for (Cookie cookie : cookies) {
        // System.out.println("cookie: " + cookie.getName());
        // if (cookie.getName().equals("jwt")) {
        // authHeader = cookie.getValue();
        // System.out.println("cookie value: " + authHeader);
        // }
        // }
        // }

        // Initialize variables to hold the possible JWT token values
        String headerToken = request.getHeader("Authorisation");
        String cookieToken = null;

        // Check the cookie for JWT token
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                System.out.println("cookie: " + cookie.getName());
                if (cookie.getName().equals("jwtToken")) {
                    cookieToken = cookie.getValue();
                    System.out.println("cookie value: " + cookieToken);
                    break; // exit the loop if we've found what we're looking for
                }
            }
        }

        // Use a ternary operator to decide which token to use
        final String authHeader = (cookieToken != null) ? cookieToken : headerToken;

        // Continue with the rest of the code
        final String jwt;
        final String userEmail;
        System.out.println("hello");
        System.out.println(response);
        System.out.println("authHeader: " + authHeader);

        /* THERE IS CURRENTLY A BUG HERE WHERE AUTHHEADER WILL ALWAYS BE NULL */
        /* THIS IS WHY IT WILL NEVER LOGIN */
        // Check if the Authorization header exists and does not start with "Bearer"
        if (authHeader == null) {

            // redirect to aws cognito login page
            response.sendRedirect("http://localhost:8080/api/v1/auth/register");
            return;
        }

        System.out.println("hello secure");

        jwt = authHeader; // Extract the JWT from the Authorization header
        userEmail = jwtService.extractUsername(jwt); // Extract the username (email) from the JWT

        System.out.println("userEmail: " + userEmail);

        // Check if the email is not null and the context does not have authentication
        // data
        if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

            System.out.println("hello user details");

            // Validate the JWT
            if (jwtService.isTokenValid(jwt, userDetails)) {

                System.out.println("hello jwt service done");

                // Create and populate authentication token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());

                // Generate additional authentication details from the request
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                // Update the security context with the authentication token
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }

        // Continue with the next filter in the filter chain
        filterChain.doFilter(request, response);
    }
}
