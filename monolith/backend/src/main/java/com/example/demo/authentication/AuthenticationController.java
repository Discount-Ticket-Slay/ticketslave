package com.example.demo.authentication;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Base64;

import com.jayway.jsonpath.JsonPath;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    private final String userPoolClientId;
    private final String userPoolClientSecret;

    @Autowired
    public AuthenticationController(
            @Value("${user_pool_client_clientid}") String userPoolClientId,
            @Value("${user_pool_client_secret}") String userPoolClientSecret) {
        this.userPoolClientId = userPoolClientId;
        this.userPoolClientSecret = userPoolClientSecret;
    }

    // handle cognito call back (convert the code to a jwt token)
    @GetMapping("/cognito-callback")
    public void handleCognitoCallback(@RequestParam("code") String code,
            @RequestParam(value = "state", required = false) String state, HttpServletResponse httpServletResponse)
            throws IOException {

        RestTemplate restTemplate = new RestTemplate();

        // populate the required parameters for the token exchange
        String cognitoTokenUrl = "https://ticketslave.auth.ap-southeast-1.amazoncognito.com/oauth2/token";
        String redirectUri = "http://localhost:8080/auth/cognito-callback"; // for development
        // String redirectUri = "https://www.ticketslave.org/auth/cognito-callback"; // for production
        String grantType = "authorization_code";

        // create the headers for the token exchange
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization",
                "Basic " + Base64.getEncoder()
                        .encodeToString((userPoolClientId + ":" + userPoolClientSecret).getBytes()));

        // create the request body for the token exchange
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("code", code);
        params.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        // debugging statements
        System.out.println("Received code: " + code);
        System.out.println("headers: " + headers);
        System.out.println("request: " + request);

        // send the request to the cognito token url, should get a jwt back
        try {
            ResponseEntity<String> response = restTemplate.exchange(cognitoTokenUrl, HttpMethod.POST, request,
                String.class);

            if (response.getStatusCode().is2xxSuccessful()) {

            // get responseBody and extract out the jwtToken
            String responseBody = response.getBody();
            String jwtToken = JsonPath.read(responseBody, "$.id_token");

            System.out.println("jwtToken: " + jwtToken);

            Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
            jwtCookie.setPath("/"); // set to persist across all paths
            httpServletResponse.addCookie(jwtCookie);

            System.out.println("State parameter: " + state);

            // send redirect back to home page
            httpServletResponse.sendRedirect("http://localhost:8080/#/feed"); // for development
            // httpServletResponse.sendRedirect("https://www.ticketslave.org/#/feed"); // for production

            /* WIP FOR ROUTES */
            // // send redirect to any page where the request was called. If it was called from
            // if (state != null && !state.trim().isEmpty()) {
            //     httpServletResponse.sendRedirect(state); // redirect back to original page where this was called
            // } else {
            //     // Default behavior: redirect to home/feed
            //     httpServletResponse.sendRedirect("http://localhost:8080/#/feed");

            //     // httpServletResponse.sendRedirect("https://www.ticketslave.org/#/feed"); // production
            // }

        } else {
            // Failed to exchange code for tokens
            System.out.println("Failed to exchange code for tokens: " + response.getStatusCode());

            // Redirect or handle error as needed
            httpServletResponse.sendRedirect("https://www.google.com");
        }

        } catch (Exception e) {

            // Failed to exchange code for tokens
            System.out.println("Failed to exchange code for tokens: ");

            System.out.println(e);

            // Redirect or handle error as needed
            httpServletResponse.sendRedirect("https://www.google.com");

            System.out.println("Error: " + e);
        }
        
        
    }
}
