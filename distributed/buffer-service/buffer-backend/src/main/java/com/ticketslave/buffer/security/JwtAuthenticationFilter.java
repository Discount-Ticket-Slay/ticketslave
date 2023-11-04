package com.ticketslave.buffer.security;

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
import java.util.stream.Collectors;

/* FILTER TO APPLY ONTO JWT */

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtService jwtService;
    private static final String COGNITO_LOGIN_PAGE = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=38vedjrqldlotkn6g9glq0sq9n&response_type=code&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fwww.ticketslave.org%2Ffeed%2Fauth%2Fcognito-callback";

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
     * Unauthorized requests are rejected and redirected to the login page
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        if (shouldSkipJwtVerification(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {

            String jwtToken = jwtService.extractTokenFromCookies(request);
            System.out.println("jwtToken: " + jwtToken);

            if (isValidToken(jwtToken)) {
                setAuthenticationContext(jwtToken);
            } else {
                // If token is not valid, we also redirect to the login page
                System.out.println("Token is not valid. Redirecting to login.");
                response.sendRedirect(COGNITO_LOGIN_PAGE);
                return;
            }
        } catch (Exception e) {
            // Handle the exception and redirect to the login page
            System.out.println("Exception occurred while validating token: " + e.getMessage());
            response.sendRedirect(COGNITO_LOGIN_PAGE);
            return;
        }

        // Continue with the filter chain if all is well
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
        return path.equals("/buffer/health");
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
                .collect(Collectors.toList());

        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

}
