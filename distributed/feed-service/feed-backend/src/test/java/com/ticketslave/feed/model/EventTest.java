package com.ticketslave.feed.model;

import static org.junit.jupiter.api.Assertions.*;

import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import jakarta.validation.ConstraintViolation;

import java.util.Set;

class EventTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    void whenAllFieldsAreValid_thenNoConstraintViolations() {
        Event event = new Event("Concert", "The best concert of the year", "2023-12-31T20:00:00",
                "Madison Square Garden", "The Weeknd", 20000);

        Set<ConstraintViolation<Event>> violations = validator.validate(event);
        assertTrue(violations.isEmpty(), "No constraint violations should occur when all fields are valid");
    }

    @Test
    void whenEventNameIsNull_thenOneConstraintViolation() {
        Event event = new Event(null, "Description", "2023-12-31T20:00:00", "Venue", "Artist", 1000);

        Set<ConstraintViolation<Event>> violations = validator.validate(event);
        assertFalse(violations.isEmpty(), "There should be a constraint violation when the event name is null");
        assertEquals(1, violations.size());
    }

    @Test
    void whenStartDateTimeIsNull_thenConstraintViolationOccurs() {
        Event event = new Event("Concert", "The greatest show on earth.", null, "Madison Square Garden", "The Weeknd",
                20000);

        Set<ConstraintViolation<Event>> violations = validator.validate(event);

        assertFalse(violations.isEmpty(), "Validation should fail because start date and time is null.");
        assertEquals(1, violations.size(), "There should be exactly one constraint violation.");
        assertEquals("Start date and time cannot be null", violations.iterator().next().getMessage(),
                "The constraint violation message should match the expected message.");
    }

    @Test
    void whenVenueIsNull_thenConstraintViolationOccurs() {
        Event event = new Event("Concert", "The greatest show on earth.", "2023-06-01T20:00:00", null, "The Weeknd",
                20000);

        Set<ConstraintViolation<Event>> violations = validator.validate(event);

        assertFalse(violations.isEmpty(), "Validation should fail because venue is null.");
        assertEquals(1, violations.size(), "There should be exactly one constraint violation.");
        assertEquals("Venue cannot be null", violations.iterator().next().getMessage(),
                "The constraint violation message should match the expected message.");
    }

    @Test
    void whenArtistIsNull_thenConstraintViolationOccurs() {
        Event event = new Event("Concert", "The greatest show on earth.", "2023-06-01T20:00:00",
                "Madison Square Garden", null, 20000);

        Set<ConstraintViolation<Event>> violations = validator.validate(event);

        assertFalse(violations.isEmpty(), "Validation should fail because artist is null.");
        assertEquals(1, violations.size(), "There should be exactly one constraint violation.");
        assertEquals("Artist cannot be null", violations.iterator().next().getMessage(),
                "The constraint violation message should match the expected message.");
    }


    @Test
    void whenCapacityIsValid_thenNoConstraintViolations() {
        Event event = new Event("Concert", "The greatest show on earth.", "2023-06-01T20:00:00",
                "Madison Square Garden", "The Weeknd", 20000);

        Set<ConstraintViolation<Event>> violations = validator.validate(event);

        assertTrue(violations.isEmpty(), "Validation should pass with no constraint violations for capacity.");
    }

    @Test
    void testGettersAndSetters() {
        Event event = new Event();

        event.setEventId(1L);
        assertEquals(1L, event.getEventId());

        event.setEventName("Concert");
        assertEquals("Concert", event.getEventName());

        event.setEventDescription("Description");
        assertEquals("Description", event.getEventDescription());

        event.setStartDateTime("2023-12-31T20:00:00");
        assertEquals("2023-12-31T20:00:00", event.getStartDateTime());

        event.setVenue("Venue");
        assertEquals("Venue", event.getVenue());

        event.setArtist("Artist");
        assertEquals("Artist", event.getArtist());

        event.setCapacity(1000);
        assertEquals(1000, event.getCapacity());
    }

    @Test
    void whenCapacityIsDefault_thenItShouldBeMinusOne() {
        Event event = new Event();
        assertEquals(-1, event.getCapacity(), "Default capacity should be -1");
    }

    @Test
    void testToString() {
        Event event = new Event();
        event.setEventName("Concert");
        assertEquals("Concert", event.toString(), "toString should return the correct event name");
    }
}
