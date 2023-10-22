# Use the official Maven image for the build stage
FROM maven:3.8.1-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and src directory into the image
COPY pom.xml ./pom.xml
COPY src ./src

# Build the project
RUN mvn clean package -DskipTests

# Start a new stage for running the application
FROM eclipse-temurin:17-jre

# Set the working directory
WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/buffer.jar /app/buffer.jar

# Expose the port the app runs on
EXPOSE 8082

# Run the application
CMD ["java", "-jar", "buffer.jar"]