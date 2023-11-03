package com.ticketslave.feed.authentication;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.ticketslave.feed.security.AuthenticationController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import static org.mockito.Mockito.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.ArgumentMatchers.eq;

@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    @Mock
    private RestTemplate restTemplate;

    @Mock
    private HttpServletResponse httpServletResponse;

    @InjectMocks
    private AuthenticationController authenticationController;

    @BeforeEach
    void setUp() {
        String userPoolClientId = "yourUserPoolClientId";
        String userPoolClientSecret = "yourUserPoolClientSecret";
        authenticationController = new AuthenticationController(userPoolClientId, userPoolClientSecret);
    }

    @Test
    void handleCognitoCallback_SuccessfulExchange_ShouldSetCookieAndRedirectToHomePage() throws IOException {
        // Arrange
        String mockCode = "mockCode";
        String mockToken = "mockJwtToken";
        ResponseEntity<String> mockResponse = ResponseEntity.ok("{\"id_token\":\"" + mockToken + "\"}");

        when(restTemplate.exchange(any(), any(), any(), eq(String.class))).thenReturn(mockResponse);

        // Act
        authenticationController.handleCognitoCallback(mockCode, null, httpServletResponse);

        // Assert
        verify(httpServletResponse).addCookie(
                argThat(cookie -> "jwtToken".equals(cookie.getName()) && mockToken.equals(cookie.getValue())));
        verify(httpServletResponse).sendRedirect("mockHomePageUrl");
    }

    @Test
    void handleCognitoCallback_ExceptionDuringExchange_ShouldRedirectToErrorPage() throws IOException {
        // Arrange
        String mockCode = "mockCode";

        // Act
        authenticationController.handleCognitoCallback(mockCode, null, httpServletResponse);

        // Assert
        verify(httpServletResponse).sendRedirect("https://www.google.com");
    }
}
