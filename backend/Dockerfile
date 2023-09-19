# Build Stage (Maven) - import base image (latest)
FROM maven as build

# Copying the source code
WORKDIR /workspace/app
COPY pom.xml .

# Downloading the dependencies, make use of the cache
RUN mvn dependency:go-offline
COPY src src

# run the application
RUN mvn clean package

# Runtime Stage
FROM eclipse-temurin:11

# create a directory to hold the application
WORKDIR /opt/app

# copy the jar file from the build stage
COPY --from=build /workspace/app/target/buyticket.jar .

# run the application
CMD ["java", "-jar", "buyticket.jar"]
