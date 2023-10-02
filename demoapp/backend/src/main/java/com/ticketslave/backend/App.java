package com.ticketslave.backend;

import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class App {

	public static void main(String[] args) {

        Properties props = new Properties();
    
        // Attempt to load environment variables from .env file
        try {
            Dotenv dotenv = Dotenv.load();
            dotenv.entries().forEach(entry -> props.setProperty(entry.getKey(), entry.getValue()));
        } catch (Exception e) {
            
            System.out.println("If you're seeing this locally, the .env file is missing and the application will not run");

            // Load environment variables directly from the system (GHA secrets)
            System.getenv().forEach((key, value) -> props.setProperty(key, value));
        }
    
        // Run Spring Boot application
        SpringApplication application = new SpringApplication(App.class);
        application.setDefaultProperties(props);
        application.run(args);
    }
    

}
