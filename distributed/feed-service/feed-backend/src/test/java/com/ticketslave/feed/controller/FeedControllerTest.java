package com.ticketslave.feed.controller;

import com.ticketslave.feed.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.mock.web.MockHttpServletRequest;
import java.util.Collections;
import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import jakarta.servlet.http.HttpServletRequest;

@ExtendWith(MockitoExtension.class)
class FeedControllerTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private KafkaTemplate<String, String> kafkaTemplate;

    @InjectMocks
    private FeedController feedController;

    private MockHttpServletRequest request;

    @BeforeEach
    public void setUp() {
        request = new MockHttpServletRequest();
        request.setCookies(new jakarta.servlet.http.Cookie("jwtToken", "dummy-token"));
    }

    /* Endpoint: /getUserEmail
     * Input: HttpServletRequest
     * Output: ResponseEntity<String>
     * Description: Test that verifies the user's email is returned when the JWT token is valid
     */
    @Test
    void getUserEmail_ReturnsEmail_WhenTokenIsValid() {
        // Arrange
        when(jwtService.extractTokenFromCookies(any(HttpServletRequest.class))).thenReturn("dummy-token");
        when(jwtService.verifyToken("dummy-token")).thenReturn(true);
        when(jwtService.getEmailFromToken("dummy-token")).thenReturn("user@example.com");

        // Act
        ResponseEntity<String> response = feedController.getUserEmail(request);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("user@example.com", response.getBody());
    }

    /* Endpoint: /getUserEmail
     * Input: HttpServletRequest
     * Output: ResponseEntity<String>
     * Description: Test that checks the response is unauthorized when the JWT token is invalid
     */
    @Test
    void getUserEmail_ReturnsUnauthorized_WhenTokenIsInvalid() {
        // Arrange
        when(jwtService.extractTokenFromCookies(any(HttpServletRequest.class))).thenReturn("invalid-token");
        when(jwtService.verifyToken("invalid-token")).thenReturn(false);

        // Act
        ResponseEntity<String> response = feedController.getUserEmail(request);

        // Assert
        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid or missing JWT token.", response.getBody());
    }

    /* Endpoint: /getUserEmail
     * Input: HttpServletRequest
     * Output: ResponseEntity<String>
     * Description: Test that ensures a server error response is returned if the service throws an exception
     */
    @Test
    void getUserEmail_ReturnsServerError_WhenServiceThrowsException() {
        // Arrange
        when(jwtService.extractTokenFromCookies(any(HttpServletRequest.class))).thenReturn("dummy-token");
        when(jwtService.verifyToken("dummy-token")).thenThrow(new RuntimeException("Service exception"));

        // Act
        ResponseEntity<String> response = feedController.getUserEmail(request);

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertTrue(response.getBody().contains("An error occurred while processing the JWT token."));
    }

    /* Endpoint: /feed/queue
     * Input: payload (Map<String, String> containing user ID)
     * Output: ResponseEntity<String>
     * Description: Test to ensure the user is queued for tickets and returns the appropriate response
     */
    @Test
    void queueForTickets_ReturnsQueuedStatus_WhenUserIdIsProvided() {
        // Arrange
        Map<String, String> payload = Collections.singletonMap("userId", "12345");

        // Act
        ResponseEntity<String> response = feedController.queueForTickets(payload);

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Queued", response.getBody());
        verify(kafkaTemplate).send("buffered-queue", "12345");
    }

}
