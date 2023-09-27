package com.ticketslave.purchase;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication 
public class App {

	// to use .env file
	static {
        Dotenv dotenv = Dotenv.load();
    }

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}