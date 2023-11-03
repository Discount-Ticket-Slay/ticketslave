package com.ticketslave.feed.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.*;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.test.util.ReflectionTestUtils;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.Cookie;

@ExtendWith(MockitoExtension.class)
public class AuthenticationControllerTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private RestTemplate restTemplate;

    private AuthenticationController authenticationController;

    private MockHttpServletResponse response;
    private String code = "code";
    private static final String COGNITO_TOKEN_URL = "https://cs203cry.auth.ap-southeast-1.amazoncognito.com/oauth2/token";
    private static final String REDIRECT_URI = "https://www.ticketslave.org/feed/auth/cognito-callback";
    private static final String HOME_PAGE_URL = "https://www.ticketslave.org/feed/";
    private static final String ERROR_PAGE_URL = "https://www.google.com";

    @BeforeEach
    public void setUp() {
        authenticationController = new AuthenticationController("yourUserPoolClientId", "yourUserPoolClientSecret");
        ReflectionTestUtils.setField(authenticationController, "jwtService", jwtService);
        response = new MockHttpServletResponse();
    }

    /*
     * Input: code, state, httpServletResponse
     * Output: None
     * Description: This test checks if handleCognitoCallback method redirects to the error page
     * when Cognito returns an error.
     */
    @Test
    void handleCognitoCallback_CognitoError_ShouldRedirectToErrorPage() throws Exception {
        authenticationController.handleCognitoCallback(code, null, response);
        assertEquals(HttpStatus.FOUND.value(), response.getStatus());
        assertEquals(ERROR_PAGE_URL, response.getRedirectedUrl());
    }

    /*
     * Input: valid jwtToken
     * Output: userEmail
     * Description: This test verifies that returnUserEmail returns the correct email when a valid JWT token is provided.
     */
    @Test
    void returnUserEmail_ValidToken_ShouldReturnEmail() {
        String jwtToken = "jwtToken";
        String userEmail = "user@example.com";
        when(jwtService.getEmailFromToken(jwtToken)).thenReturn(userEmail);
        String result = authenticationController.returnUserEmail(jwtToken);
        assertEquals(userEmail, result);
    }

    /*
     * Input: invalidJwtToken
     * Output: null
     * Description: This test ensures that returnUserEmail returns null when an invalid JWT token is used.
     */
    @Test
    void returnUserEmail_InvalidToken_ShouldReturnNull() {
        String invalidJwtToken = "invalidToken";
        when(jwtService.getEmailFromToken(invalidJwtToken)).thenThrow(new RuntimeException("Invalid token"));
        String result = authenticationController.returnUserEmail(invalidJwtToken);
        assertNull(result);
    }

    /*
     * Input: null
     * Output: null
     * Description: This test checks that returnUserEmail returns null when null token is passed.
     */
    @Test
    void returnUserEmail_NullToken_ShouldReturnNull() {
        String result = authenticationController.returnUserEmail(null);
        assertNull(result);
    }

    /*
     * Input: responseEntity (with a successful status), state, httpServletResponse
     * Output: None
     * Description: This test verifies that processResponse redirects to the home page and sets a cookie
     * when the ResponseEntity contains a successful status.
     */
    @Test
    void processResponse_SuccessfulResponse_ShouldRedirectToHomePage() throws Exception {
        String jwtToken = "jwtToken";
        ResponseEntity<String> responseEntity = ResponseEntity.ok("{\"id_token\":\"" + jwtToken + "\"}");
        authenticationController.processResponse(responseEntity, null, response);
        assertEquals(HOME_PAGE_URL, response.getRedirectedUrl());
        Cookie jwtCookie = response.getCookie("jwtToken");
        assertNotNull(jwtCookie);
        assertEquals(jwtToken, jwtCookie.getValue());
    }

    /*
     * Input: responseEntity (with an error status), state, httpServletResponse
     * Output: None
     * Description: This test checks if processResponse redirects to the error page when the ResponseEntity
     * has an error status.
     */
    @Test
    void processResponse_ErrorResponse_ShouldRedirectToErrorPage() throws Exception {
        ResponseEntity<String> responseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        authenticationController.processResponse(responseEntity, null, response);
        assertEquals(ERROR_PAGE_URL, response.getRedirectedUrl());
    }

    /*
     * Input: httpServletResponse, jwtToken
     * Output: None
     * Description: This test verifies that setJwtCookie correctly adds a cookie to the response.
     */
    @Test
    void setJwtCookie_ShouldAddCookieToResponse() {
        String jwtToken = "jwtToken";
        authenticationController.setJwtCookie(response, jwtToken);
        Cookie jwtCookie = response.getCookie("jwtToken");
        assertNotNull(jwtCookie);
        assertEquals(jwtToken, jwtCookie.getValue());
        assertTrue(jwtCookie.getSecure());
        assertTrue(jwtCookie.isHttpOnly());
        assertEquals("/", jwtCookie.getPath());
    }
}
