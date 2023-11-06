package com.ticketslave.feed.security;

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
import org.springframework.web.client.HttpStatusCodeException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Base64;

import com.jayway.jsonpath.JsonPath;

@RestController
@RequestMapping("/feed/auth")
public class AuthenticationController {

    private final String USER_POOL_CLIENT_ID;
    private final String USER_POOL_CLIENT_SECRET;
    private static final String COGNITO_TOKEN_URL = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/token";
    private static final String REDIRECT_URI = "https://www.ticketslave.org/feed/auth/cognito-callback";
    private static final String HOME_PAGE_URL = "https://www.ticketslave.org/feed#/feed";
    private static final String ERROR_PAGE_URL = "https://www.google.com";

    @Autowired
    private JwtService jwtService;

    /*
     * Constructor: Initializes the AuthenticationController with user pool client
     * ID and secret from application.properties
     * Input: userPoolClientId, userPoolClientSecret
     * Output: None
     * Description: This constructor initializes the AuthenticationController with
     * the provided user pool client ID and secret
     */
    @Autowired
    public AuthenticationController(
            @Value("${user_pool_client_clientid}") String userPoolClientId,
            @Value("${user_pool_client_secret}") String userPoolClientSecret) {
        this.USER_POOL_CLIENT_ID = userPoolClientId;
        this.USER_POOL_CLIENT_SECRET = userPoolClientSecret;
    }

    /*
     * Endpoint: /auth/cognito-callback
     * Input: code, state, httpServletResponse
     * Output: None
     * Description: This method handles the callback from Cognito, exchanges the
     * code for a JWT token, and sets a cookie with the token
     */
    @GetMapping("/cognito-callback")
    public void handleCognitoCallback(@RequestParam("code") String code,
            @RequestParam(value = "state", required = false) String state, HttpServletResponse httpServletResponse)
            throws IOException {

        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = createHeadersForTokenExchange();
        MultiValueMap<String, String> params = createRequestBodyForTokenExchange(code);
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        try {
            ResponseEntity<String> response = restTemplate.exchange(COGNITO_TOKEN_URL, HttpMethod.POST, request,
                    String.class);

            processResponse(response, state, httpServletResponse);
        } catch (Exception e) {
            handleTokenExchangeError(e, httpServletResponse);
        }
    }

    /*
     * Input: jwtToken - A JWT token as a string
     * Output: User's email address extracted from the JWT token, or null if the
     * token is invalid or does not exist
     * Description: This method calls the getEmailFromToken method of the JwtService
     * to extract and return the user's email address from the provided JWT token.
     * If the token is invalid or does not exist, the method returns null.
     */
    public String returnUserEmail(String jwtToken) {
        if (jwtToken == null || jwtToken.isEmpty()) {
            return null; // Return null if the token does not exist or is empty
        }

        try {
            return jwtService.getEmailFromToken(jwtToken);
        } catch (Exception e) {
            return null; // Return null if there's an error in extracting the email (e.g., invalid token)
        }
    }

    /*
     * Input: None
     * Output: None
     * Description: This method creates the headers for the token exchange request
     */
    private HttpHeaders createHeadersForTokenExchange() {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Basic "
                + Base64.getEncoder().encodeToString((USER_POOL_CLIENT_ID + ":" + USER_POOL_CLIENT_SECRET).getBytes()));
        return headers;
    }

    /*
     * Input: code
     * Output: None
     * Description: This method creates the request body for the token exchange
     * request
     */
    private MultiValueMap<String, String> createRequestBodyForTokenExchange(String code) {
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("code", code);
        params.add("redirect_uri", REDIRECT_URI);
        return params;
    }

    /*
     * Input: response, state, httpServletResponse
     * Output: None
     * Description: This method processes the response from the token exchange
     * request
     */
    protected void processResponse(ResponseEntity<String> response, String state, HttpServletResponse httpServletResponse)
            throws IOException {
        if (response.getStatusCode().is2xxSuccessful()) {
            String jwtToken = JsonPath.read(response.getBody(), "$.id_token");
            setJwtCookie(httpServletResponse, jwtToken);
            redirectToHomePage(httpServletResponse);
        } else {
            redirectToErrorPage(httpServletResponse);
        }
    }

    /*
     * Input: httpServletResponse, jwtToken
     * Output: None
     * Description: This method sets the JWT token as a cookie
     */
    protected void setJwtCookie(HttpServletResponse httpServletResponse, String jwtToken) {
        Cookie jwtCookie = new Cookie("jwtToken", jwtToken);
        jwtCookie.setPath("/");
        jwtCookie.setHttpOnly(true); // Prevents JavaScript from accessing the cookie (XSS)
        jwtCookie.setSecure(true); // Ensures the cookie is only sent over HTTPS
        httpServletResponse.addCookie(jwtCookie);
    }

    /*
     * Input: httpServletResponse, state
     * Output: None
     * Description: This method redirects the user to the home page
     */
    private void redirectToHomePage(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect(HOME_PAGE_URL);
    }

    /*
     * Input: httpServletResponse, errorMessage
     * Output: None
     * Description: This method redirects the user to an error page
     */
    private void redirectToErrorPage(HttpServletResponse httpServletResponse) throws IOException {
        httpServletResponse.sendRedirect(ERROR_PAGE_URL);
    }

    /*
     * Input: e, httpServletResponse
     * Output: None
     * Description: This method handles errors from the token exchange request
     */
    private void handleTokenExchangeError(Exception e, HttpServletResponse httpServletResponse) throws IOException {
        System.out.println("Error: " + e.getMessage());
        redirectToErrorPage(httpServletResponse);
    }

}
