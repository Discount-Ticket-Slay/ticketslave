package com.ticketslave.home;

import java.util.Properties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class App {

	public static void main(String[] args) {

		// load environment variables
        Dotenv dotenv = Dotenv.load();
        Properties props = new Properties();
        dotenv.entries().forEach(entry -> props.setProperty(entry.getKey(), entry.getValue()));

		// run spring boot application
		SpringApplication application = new SpringApplication(App.class);
        application.setDefaultProperties(props);
        application.run(args);
	}

}
