# Fair Ticketing System Web Application (TicketSlave)

## Introduction
A web application that implements a fair ticketing system for concert events. The application allows users to buy and sell tickets for events. The application also allows event organizers to create events and sell tickets for their events but with limited support.

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Architecture](#architecture)
- [Queuing Process](#queuing-process)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Members](#contact)

## Features
- **User Account Creation and Authentication**: Secure user registration and login processes.
- **Event Creation and Management**: Intuitive tools for organizers to create and manage event details.
- **Queueing System for Ticket Sales**: Fair and transparent ticket allocation system to prevent scalping.

## Technologies
### Backend
- Java Maven Spring Boot (Spring Security, Spring Data JPA, Spring Web)
- JUnit 5 (Mockito)
- Docker
- Apache Kafka
- Websockets

### Frontend
- Svelte
- Tailwind CSS

### Others
- AWS (S3, ECS, RDS, MSK, Cognito)
- Terraform
- Github Actions
- SonarCloud
- Stripe API

## Architecture
## Directory Structure

```plaintext
.
├── buffer-service
│   ├── buffer-backend
│   └── buffer-frontend
├── Deployment (organised using Terraform Modules)
│   ├── api_gateway
│   ├── cloudfront
│   ├── ecr
│   ├── ecs
│   ├── elb
│   ├── msk
│   ├── network
│   └── rds
├── feed-service
│   ├── feed-backend
│   └── feed-frontend
├── payment-service
│   ├── payment-backend
│   └── payment-frontend
├── purchase-service
│   ├── purchase-backend
│   └── purchase-frontend
└── queue-service
    ├── queue-backend
    └── queue-frontend
```

### Architecture Diagram
![Architecture Diagram](https://github.com/Discount-Ticket-Slay/ticketslave/assets/74541329/70612180-1083-476d-aee4-bfab7a48e9ff)

## Queuing Process
![Queuing Process](https://github.com/Discount-Ticket-Slay/ticketslave/assets/74541329/1200728c-c950-4877-89ce-ece347295a67)
The queuing algorithm operates in two distinct phases:
1. **Buffering and Shuffling**: Initially, all incoming user requests are collected in a buffer. This collection phase is followed by a shuffling process where each user is assigned a random queue number.
2. **Sequential Processing**: After shuffling, users are redirected to the queue service. Here, they are processed in a first-come, first-served manner, determined by their randomly assigned queue numbers. This approach ensures fairness by randomizing the order of service, rather than strictly processing requests in the order they were received.

## Setup and Installation
### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Backend Setup
1. Ensure .env file is present with all the relevant environment variables. (not committed for security reasons)
2. From the root directory, start all services:
    ```bash
    docker-compose up
    ```
    
### Frontend Setup
1. For each service, navigate to the frontend folder:
    ```bash
    cd [ServiceName]-service/[ServiceName]-frontend
    ```

2. Install dependencies and build the project:
    ```bash
    npm install && npm run build
    ```

3. After building, copy the `index.html` file generated into the corresponding backend service to point to the correct JavaScript file. (e.g. `index.html` generated in `feed-service/feed-frontend/build/_app` should be copied to `feed-service/feed-backend/src/main/resources/templates`)

4. Uploaded the folder named `_app` to AWS S3. This will be the version served by the application.

5. Modify the source links in index.html to point to the correct S3 bucket and folder.

## Usage
### Upload newly built image to AWS ECR
1. Ensure you have the AWS CLI installed and configured with the correct credentials.
2. Ensure you have Docker installed and running.
3. From the root directory, run the following command:
     ```bash
    sh push_to_ecr.sh
    ```
### Deploy AWS Infrastructure
1. Ensure you have the AWS CLI installed and configured with the correct credentials.
2. Ensure .env file is present with all the relevant environment variables. (not committed for security reasons)
3. From the root directory, run the following command:
     ```bash
    sh deploy.sh
    ```

## Members
- [Yue Zhen](https://github.com/smithquaz)
- [Mikhail](https://github.com/mikmik01)
- [Ryan Lim](https://github.com/Ryanljk)
- [Teng Wee](https://github.com/tengwee12)
- [Linus](https://github.com/Innumii)
- [Melanie](https://github.com/melly19)
