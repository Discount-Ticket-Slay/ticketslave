package com.example.demo;

import static org.junit.jupiter.api.Assertions.assertEquals;

import java.net.URI;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;

import com.ticketslave.backend.ticketcategory.TicketCategory;
import com.ticketslave.backend.ticketcategory.TicketCategoryRepository;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class TicketCategoryControllerTest {

    @LocalServerPort
	private int port;

	private final String basedUrl = "http://localhost:";

    @Autowired
    private TestRestTemplate restTemplate;

    @Autowired
	private TicketCategoryRepository tCat;

    @AfterEach
	void tearDown(){
		tCat.deleteAll();
	}

    @Test
	public void getBooks_Success() throws Exception {
		URI uri = new URI(basedUrl + port + "/ticketcategory");
		tCat.save(new TicketCategory("Testing", 10));
		
		// Need to use array with a ReponseEntity here
		ResponseEntity<TicketCategory[]> result = restTemplate.getForEntity(uri, TicketCategory[].class);
		TicketCategory[] tArr = result.getBody();
		
		assertEquals(200, result.getStatusCode().value());
		assertEquals(1, tArr.length);
	}
}
