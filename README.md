# buyTicket
ability to buy a ticket

## User Stories to Tackle (sprint 0)
- [ ] As a ticket buyer, I want to receive a confirmation email after a successful purchase.
- [ ] As a ticket buyer, I want to be able to purchase tickets across different seating categories in the same purchase.


## To Do (backend)
- [x] Initialise Spring Boot Project w mySQL DB access
- [x] Initialise a mySQL DB
- [ ] ER Diagram for DB
- [ ] Update application.properties to connect to mySQL DB
- [ ] Update DB using update.sql (after purchase)
- [ ] Use placeholder user (to connect to actual users afterwards)
- [ ] Create a Ticket Entity, Repository, Service, Controller
- [ ] Create a TicketPurchase Entity, Repository, Service, Controller
- [ ] Pull user information from DB (use placeholder first)
- [ ] Use email API to send confirmation email upon successful purchase
- [ ] Dockerize the application (afterwards)

## To Do (frontend)
- [ ] Initialise a Svelte project with Bootstrap and other necessary dependencies
- [ ] Create a layout using HTML to represent the ticket purchasing page
- [ ] Display seating categories
- [ ] Create interactive components to allow users to select seats
- [ ] Implement a shopping cart where selected seats are displayed
- [ ] Implement a login/user authentication feature to link purchases with user accounts
- [ ] Integrate a payment gateway or simulate a payment process for testing
- [ ] Confirm purchase with user
- [ ] Integrate an email service (eg. SendGrid) to send confirmation emails
- [ ] Customise the appearance of the UI elements (perhaps use swal)
- [ ] Test whole process of buying
- [ ] Implement error handling for scenarios like failed payments or network errors (provide error messages)
- [ ] Make sure app is accessible by following WCAG guidelines
- [ ] Deploy Svelte app to the production environment
