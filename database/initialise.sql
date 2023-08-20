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