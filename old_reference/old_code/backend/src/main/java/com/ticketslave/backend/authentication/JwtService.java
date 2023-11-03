package com.ticketslave.backend.authentication;

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
import java.util.Collections;
import java.util.List;
import java.math.BigInteger;

import javax.annotation.PostConstruct;


/* USE TO VERIFY THE JWT TOKEN */

@Service
public class JwtService {

    private RSAPublicKey publicKey; 

    @javax.annotation.PostConstruct // This ensures the method runs after the bean is initialized
    public void init() {
        try {
            RestTemplate restTemplate = new RestTemplate();
            String jwksUrl = "https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_n5rc4gEk3/.well-known/jwks.json";
            String jwks = restTemplate.getForObject(jwksUrl, String.class);

            JSONObject jwksJson = new JSONObject(jwks);
            JSONArray keys = jwksJson.getJSONArray("keys");
            JSONObject keyData = keys.getJSONObject(0);
            String modulusBase64 = keyData.getString("n");
            String exponentBase64 = keyData.getString("e");

            RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(
                new BigInteger(1, Base64.getUrlDecoder().decode(modulusBase64)),
                new BigInteger(1, Base64.getUrlDecoder().decode(exponentBase64))
            );

            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            publicKey = (RSAPublicKey) keyFactory.generatePublic(publicKeySpec);

        } catch (Exception e) {
            throw new RuntimeException("Failed to initialize JWT public key", e);
        }
    }

    public boolean verifyToken(String jwtToken) {
        try {
            Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(jwtToken);

            String username = claims.getBody().getSubject();
            System.out.println(username);
            return true;

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public String getUsernameFromToken(String jwtToken) {
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(jwtToken);
        
        return claims.getBody().get("cognito:username", String.class);
    }

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

    // get the email from the token
    public String getEmailFromToken(String jwtToken) {
        Jws<Claims> claims = Jwts.parserBuilder()
                .setSigningKey(publicKey)
                .build()
                .parseClaimsJws(jwtToken);
        
        return claims.getBody().get("email", String.class);
    }

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
