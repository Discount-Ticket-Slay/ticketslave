package com.ticketslave.feed.authentication;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.ticketslave.feed.security.AuthenticationController;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class AuthenticationControllerTest {

    @Mock
    private HttpServletResponse httpServletResponse;

    @InjectMocks
    private AuthenticationController authenticationController;

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
