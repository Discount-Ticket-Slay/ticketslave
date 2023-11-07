package com.example.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class PaymentApplication {


	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load();
		SpringApplication.run(PaymentApplication.class, args);
	}

}
