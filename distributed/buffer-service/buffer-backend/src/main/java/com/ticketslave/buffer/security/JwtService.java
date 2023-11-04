package com.ticketslave.buffer.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.json.JSONArray;
import org.json.JSONObject;

import java.security.KeyFactory;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.math.BigInteger;
import java.util.Collections;
import java.util.List;

import javax.annotation.PostConstruct;

/* USE TO VERIFY THE JWT TOKEN */

@Service
public class JwtService {

    private RSAPublicKey publicKey;

    /*
     * Input: None
     * Output: None
     * Description: This method initialises the service by fetching and setting up
     * the RSA public key
     */
    @javax.annotation.PostConstruct // This ensures the method runs after the bean is initialized
    public void init() {
        try {
            RestTemplate restTemplate = new RestTemplate();

            // URL to fetch the JSON Web Key Set (JWKS) as a string
            String jwksUrl = "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_n5rc4gEk3/.well-known/jwks.json";
            String jwks = restTemplate.getForObject(jwksUrl, String.class);

            // Parse the JSON Web Key Set (JWKS) string to obtain the public key
            JSONObject jwksJson = new JSONObject(jwks);
            JSONArray keys = jwksJson.getJSONArray("keys");
            JSONObject keyData = keys.getJSONObject(0);

            // Extract the modulus and exponent from the key data
            String modulusBase64 = keyData.getString("n");
            String exponentBase64 = keyData.getString("e");

            // Create the RSA public key specification
            RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(
                    new BigInteger(1, Base64.getUrlDecoder().decode(modulusBase64)),
                    new BigInteger(1, Base64.getUrlDecoder().decode(exponentBase64)));

            // Generate the RSA public key
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            publicKey = (RSAPublicKey) keyFactory.generatePublic(publicKeySpec);

        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize JWT public key", e);
        }
    }

    /*
     * Input: jwtToken
     * Output: boolean indicating if the token is valid
     * Description: This method verifies the JWT token using the public key
     */
    public boolean verifyToken(String jwtToken) {
        try {

            // Parsing and verifying the token
            Jws<Claims> claims = Jwts.parserBuilder()
                    .setSigningKey(publicKey)
                    .build()
                    .parseClaimsJws(jwtToken);

            String username = claims.getBody().getSubject();
            System.out.println("Username: " + username);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    /*
     * Input: jwtToken
     * Output: email from the token
     * Description: This method extracts the email from the JWT token
     */
    public String getEmailFromToken(String jwtToken) {
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(jwtToken);

        return claims.getBody().get("email", String.class);
    }

    /*
     * Input: jwtToken
     * Output: Username from the token
     * Description: This method extracts the username from the JWT token
     */
    public String getUsernameFromToken(String jwtToken) {
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(jwtToken);

        return claims.getBody().get("cognito:username", String.class);
    }

    /*
     * Input: jwtToken
     * Output: List of roles from the token
     * Description: This method extracts the roles from the JWT token
     */
    public List<String> getRolesFromToken(String jwtToken) {
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(jwtToken);

        List<String> roles;

        try {
            roles = claims.getBody().get("cognito:groups", List.class);
        } catch (Exception e) {
            roles = Collections.emptyList();
        }

        return roles;
    }

    /*
     * Input: request
     * Output: JWT Token
     * Description: This method extracts the JWT token from the user's cookies
     */
    public String extractTokenFromCookies(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwtToken".equals(cookie.getName())) { // note: cookie is named jwtToken
                    return cookie.getValue();
                }
            }
        }
        return null;
    }

}