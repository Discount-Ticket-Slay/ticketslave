-- make new schema 
create schema if not exists TicketDB;

-- use the particular db schema (set default)
use TicketDB;

-- tickettransaction table (not complete - require other tables) 
create table if not exists TicketTransaction (
	accountID int,
    eventID int,
    ticketID int,
    transactionTime datetime,
    primary key (accountID, eventID, ticketID)
);

-- drop table TicketTransaction; 

create table if not exists Event (
	EventID int primary key not null,
    EventName varchar(100),
    StartDateTime datetime,
    Venue varchar(100),
	Artist varchar(100),
    EventDescription varchar(1000)
);