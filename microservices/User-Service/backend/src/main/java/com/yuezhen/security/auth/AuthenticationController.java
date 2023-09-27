package com.yuezhen.security.auth;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.Cookie;

import com.jayway.jsonpath.JsonPath;

import java.util.Base64;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import com.yuezhen.security.auth.AuthenticationResponse;
import com.yuezhen.security.auth.AuthenticationRequest;
import com.yuezhen.security.auth.RegisterRequest;
import com.yuezhen.security.auth.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    // redirect to aws cognito login page
    @GetMapping("/register")
    public void register(HttpServletResponse httpServletResponse) throws IOException {

        System.out.println("rerouting to cognito login page");

        String cognitoUrl = "https://cryingfrom203.auth.ap-southeast-1.amazoncognito.com/" +
                            "login?client_id=152p8ncvrvcr4fq6gs3n297htd&" + 
                            "response_type=code&scope=email+openid+phone&" + 
                            "redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2Fv1%2Fauth%2Fcognito-callback";

        httpServletResponse.sendRedirect(cognitoUrl);
    }

    /* WORK IN PROGRESS */
    // handle cognito call back (convert the code to a jwt token)
    @GetMapping("/cognito-callback")
    public void handleCognitoCallback(@RequestParam("code") String code, HttpServletResponse httpServletResponse)
            throws IOException {
        System.out.println("Received code: " + code);

        RestTemplate restTemplate = new RestTemplate();

        // Replace these with your own Cognito settings
        String cognitoTokenUrl = "https://cryingfrom203.auth.ap-southeast-1.amazoncognito.com/oauth2/token";
        String clientId = "152p8ncvrvcr4fq6gs3n297htd";
        String clientSecret = "1mb2elneupnarg8p2h99a95t3714p0f4e5cup3d34u85uh71qrin";
        String redirectUri = "http://localhost:8080/api/v1/auth/cognito-callback";
        String grantType = "authorization_code";

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization",
                "Basic " + Base64.getEncoder().encodeToString((clientId + ":" + clientSecret).getBytes()));

        System.out.println("headers: " + headers);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", grantType);
        params.add("code", code);
        params.add("redirect_uri", redirectUri);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        System.out.println("request: " + request);

        ResponseEntity<String> response = restTemplate.exchange(cognitoTokenUrl, HttpMethod.POST, request,
                String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            
            // get responseBody and extract out the jwtToken
            String responseBody = response.getBody();
            String jwtToken = JsonPath.read(responseBody, "$.id_token");

            System.out.println("jwtToken: " + jwtToken);
            
            // httpServletResponse.setHeader("Authorisation", jwtToken);

            Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
            jwtCookie.setPath("/"); // set to persist across all paths
            httpServletResponse.addCookie(jwtCookie);

            // Redirect to home page
            httpServletResponse.sendRedirect("http://localhost:8080/api/v1/controller");

        } else {
            // Failed to exchange code for tokens
            System.out.println("Failed to exchange code for tokens: " + response.getStatusCode());

            // Redirect or handle error as needed
            httpServletResponse.sendRedirect("http://localhost:8080/api/v1/some-error-route");
        }
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authenticationService.register(request));
    }

    @PostMapping("/authenticate")
    @ResponseBody
    public ResponseEntity<AuthenticationResponse> register(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }
}
