package com.ticketslave.feed.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import org.springframework.security.core.Authentication;

import java.util.List;

@ExtendWith(MockitoExtension.class)
class JwtAuthenticationFilterTest {

    @Mock
    private JwtService jwtService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    // A subclass for testing purposes
    private static class JwtAuthenticationFilterForTest extends JwtAuthenticationFilter {
        public JwtAuthenticationFilterForTest(JwtService jwtService) {
            super(jwtService);
        }

        public void doFilterInternalPublic(HttpServletRequest request, HttpServletResponse response,
                FilterChain filterChain)
                throws Exception {
            doFilterInternal(request, response, filterChain);
        }
    }

    @InjectMocks
    private JwtAuthenticationFilterForTest jwtAuthenticationFilterForTest;

    @BeforeEach
    public void setUp() {
        // Make sure the security context is clear before each test
        SecurityContextHolder.clearContext();
    }

    @Test
    /* 
    * Input: HttpServletRequest, HttpServletResponse, FilterChain
    * Output: None
    * Description: This test verifies that the filter skips JWT verification for predefined paths.
    * It mocks a request to one of these paths, runs the filter, and asserts that the filter chain
    * continues without checking the JWT.
    */
    void whenPathShouldSkipJwtVerification_ShouldContinueFilterChain() throws Exception {
        when(request.getRequestURI()).thenReturn("/feed/events");

        jwtAuthenticationFilterForTest.doFilterInternalPublic(request, response, filterChain);

        verify(filterChain, times(1)).doFilter(request, response);
        verify(jwtService, never()).verifyToken(any());
    }

    @Test
    /*
     * Input: HttpServletRequest with invalid JWT token, HttpServletResponse,
     * FilterChain
     * Output: None
     * Description: This test checks the filter's response to an invalid JWT token.
     * It mocks the JWT extraction and validation process, simulating an invalid
     * token scenario.
     * It then asserts that the HttpServletResponse is set to the unauthorized
     * status and the filter chain
     * does not continue.
     */
    void whenJwtTokenInvalid_ShouldSetUnauthorizedStatus() throws Exception {
        String jwtToken = "invalidToken";
        when(request.getRequestURI()).thenReturn("/feed/some-protected-route");
        when(jwtService.extractTokenFromCookies(request)).thenReturn(jwtToken);
        when(jwtService.verifyToken(jwtToken)).thenReturn(false);

        jwtAuthenticationFilterForTest.doFilterInternalPublic(request, response, filterChain);

        verify(response, times(1)).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        verify(filterChain, never()).doFilter(request, response);
    }

    @Test
    /*
     * Input: HttpServletRequest with valid JWT token, HttpServletResponse,
     * FilterChain
     * Output: None
     * Description: This test ensures that when a valid JWT token is provided, the
     * filter
     * sets the SecurityContextHolder's Authentication based on the token's
     * credentials.
     * It verifies that the authentication object is correctly set up with the
     * username and roles.
     * It also checks that the filter chain is allowed to proceed.
     */
    void whenJwtTokenValid_ShouldSetSecurityContextAuthentication() throws Exception {
        String jwtToken = "validToken";
        String username = "user";
        List<String> roles = List.of("ROLE_USER");

        when(request.getRequestURI()).thenReturn("/feed/some-protected-route");
        when(jwtService.extractTokenFromCookies(request)).thenReturn(jwtToken);
        when(jwtService.verifyToken(jwtToken)).thenReturn(true);
        when(jwtService.getUsernameFromToken(jwtToken)).thenReturn(username);
        when(jwtService.getRolesFromToken(jwtToken)).thenReturn(roles);

        jwtAuthenticationFilterForTest.doFilterInternalPublic(request, response, filterChain);

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        assertNotNull(authentication);
        assertEquals(username, authentication.getName());
        assertEquals(roles.size(), authentication.getAuthorities().size());

        verify(filterChain, times(1)).doFilter(request, response);
    }

    @Test
    /*
     * Input: HttpServletRequest with valid JWT token, HttpServletResponse,
     * FilterChain
     * Output: None
     * Description: This test confirms that the filter chain continues to process
     * after a valid JWT token is found and the authentication context is set.
     * It ensures that the filter correctly processes a valid JWT token without
     * interrupting the flow of the request through the remaining filters.
     */
    void whenJwtTokenValid_ShouldContinueFilterChain() throws Exception {
        String jwtToken = "validToken";
        when(request.getRequestURI()).thenReturn("/feed/some-protected-route");
        when(jwtService.extractTokenFromCookies(request)).thenReturn(jwtToken);
        when(jwtService.verifyToken(jwtToken)).thenReturn(true);

        jwtAuthenticationFilterForTest.doFilterInternalPublic(request, response, filterChain);

        verify(filterChain, times(1)).doFilter(request, response);
    }

}
