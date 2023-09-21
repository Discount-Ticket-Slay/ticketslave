package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class App {

	static {
        Dotenv dotenv = Dotenv.load();
    }

	public static void main(String[] args) {
		SpringApplication.run(App.class, args);
	}

}