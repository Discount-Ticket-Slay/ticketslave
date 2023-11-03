package com.ticketslave.feed.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
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

import java.io.IOException;
import java.util.List;
import java.util.stream.Stream;

/* FILTER TO APPLY ONTO JWT */

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtService jwtService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    /*
     * Input: request, response, filterChain
     * Output: None
     * Description: This method filters incoming HTTP requests. It skips JWT
     * verification for certain paths,
     * extracts the JWT token from cookies, verifies the token, and sets the
     * authentication context if the token is valid.
     * Unauthorized requests are rejected.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (shouldSkipJwtVerification(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwtToken = jwtService.extractTokenFromCookies(request);
        System.out.println("jwtToken: " + jwtToken);

        if (isValidToken(jwtToken)) {
            setAuthenticationContext(jwtToken);
        } else {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }

    /*
     * Input: request
     * Output: boolean indicating if JWT verification should be skipped
     * Description: This method checks if the request path is among those that
     * should skip JWT verification
     */
    private boolean shouldSkipJwtVerification(HttpServletRequest request) {
        String path = request.getRequestURI();
        System.out.println("path: " + path);
        return path.equals("/feed/")
                || path.startsWith("/feed/#/feed")
                || path.startsWith("/feed/#/Event")
                || path.equals("/feed/auth/cognito-callback")
                || path.equals("/feed/health")
                || path.startsWith("/feed/events");
    }

    /*
     * Input: jwtToken
     * Output: boolean indicating if the token is valid
     * Description: This method verifies the JWT token
     */
    private boolean isValidToken(String jwtToken) {
        return jwtToken != null && jwtService.verifyToken(jwtToken);
    }

    /*
     * Input: jwtToken
     * Output: None
     * Description: This method sets the authentication context based on the JWT
     * token
     */
    private void setAuthenticationContext(String jwtToken) {
        String username = jwtService.getUsernameFromToken(jwtToken);
        List<String> roles = jwtService.getRolesFromToken(jwtToken);

        System.out.println("username: " + username);
        System.out.println("roles: " + roles);

        List<GrantedAuthority> authorities = roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Stream.toList());

        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
