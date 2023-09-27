package com.yuezhen.security.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import java.util.function.Function;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Collections;

import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetails;

import javax.crypto.SecretKey;

// Annotate the class with @Service to indicate it's a Spring service component
@Service
public class JwtService {

    // The secret key for JWT signing and validation
    private static final String SECRET_KEY = "0ERiYynM2tR4xKaI3qBxjL4rLnhvjcopTUdCiQ5WzbE10M9eNNfBD2ER5fK8LR8y";

    /**
     * Extracts the username from the JWT token.
     *
     * @param token the JWT token
     * @return the username stored in the JWT token's "subject" claim
     */
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Generates a JWT token with extra claims and user details.
     *
     * @param extraClaims A map containing any additional claims that should be
     *                    included in the token
     * @param userDetails The UserDetails object containing information about the
     *                    user, such as the username
     * @return A compact JWT string
     */
    public String generateToken(Map<String, Object> extraClaims, UserDetails userDetails) {
        // Initialize the JWT builder
        return Jwts.builder()
                .setClaims(extraClaims) // Add any extra claims to the JWT token
                .setSubject(userDetails.getUsername()) // Set the "subject" claim with the username from the UserDetails
                                                       // object
                .setIssuedAt(new Date(System.currentTimeMillis())) // Set the "issued at" claim with the current time in
                                                                   // milliseconds
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // Set the
                                                                                           // expiration date for the
                                                                                           // token to 24 hours from now
                .signWith(getSignInKey()) // Sign the JWT with the signing key
                .compact(); // Create a compact representation of the JWT
    }

    // validate if this token belong to this user
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    public boolean isTokenExpired(String token) {
        final Date expiration = extractExpiration(token);
        return expiration.before(new Date());
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    /**
     * Extracts all claims from the JWT token.
     *
     * @param token the JWT token
     * @return a Claims object containing all the claims of the JWT token
     */
    private Claims extractAllClaims(String token) {
        // Build a JWT parser and set the signing key for validation
        return Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /**
     * Generates and returns the signing key for JWT.
     *
     * @return the SecretKey for JWT signing
     */
    private SecretKey getSignInKey() {
        // Decode the base64 secret key and prepare it for HMAC SHA
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String getUsernameFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    
    public List<String> getRolesFromToken(String token) {
        List<?> roles = extractClaim(token, claims -> claims.get("cognito:groups", List.class));
    
        if (roles.stream().allMatch(item -> item instanceof String)) {
            return (List<String>) roles;
        }
        
        return Collections.emptyList();
    }
    
}
