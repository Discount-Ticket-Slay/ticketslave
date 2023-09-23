# Build Stage (Maven) - import base image (latest)
FROM maven as build

# Copying the source code
WORKDIR /workspace/app
COPY pom.xml .

# Downloading the dependencies, make use of the cache
RUN mvn dependency:go-offline
COPY src src

# Run the application (-DskipTests to skip database test as it would not be available yet)
RUN mvn clean package -DskipTests

# for debugging
RUN ls -l /workspace/app/target/

# Runtime Stage
FROM eclipse-temurin:17

# Create a directory to hold the application
WORKDIR /opt/app

# Copy the JAR file from the build stage
COPY --from=build /workspace/app/target/home-1.3.jar .

# Copy the .env file into the container
COPY .env .env

# run the application
CMD ["java", "-jar", "home-1.3.jar"]
