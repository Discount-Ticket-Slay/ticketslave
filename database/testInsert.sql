insert into TicketTransaction (accountID, eventID, ticketID, transactionTime)
values (1, 1, 1, '2023-08-21 15:30:00');

insert into TicketTransaction (accountID, eventID, ticketID, transactionTime)
values (1, 2, 1, '2023-08-21 16:00:00');

insert into TicketTransaction (accountID, eventID, ticketID, transactionTime)
values (1, 2, 2, '2023-08-21 17:00:30');

select * from TicketTransaction;

insert into Event (EventID, EventName, StartDateTime, Venue, Artist, EventDescription)
values (1, "Taylor Swift Eras Tour", '2023-08-21 17:00:30', "Singapore National Stadium", "Taylor Swift", "Ur Mom");

insert into Event (EventID, EventName, StartDateTime, Venue, Artist, EventDescription)
values (2, "Twice 5th World Tour", '2023-08-21 17:30:30', "Singapore National Stadium", "Twice", "Momo to ur heart");

select * from Event;