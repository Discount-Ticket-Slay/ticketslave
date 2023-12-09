package com.example.payment.model;
import java.util.*;

public class EmailRequest {
    private String to;
    private Long purchaseID;
    private List<Long> ticketIdList;
    private int price;

    public EmailRequest() {
    }

    public EmailRequest(String to, Long purchaseID, int price, List<Long> ticketIdList) {
        this.to = to;
        this.purchaseID = purchaseID;
        this.price = price;
        this.ticketIdList = ticketIdList;

    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public void setPurchaseID(Long purchaseID){
        this.purchaseID = purchaseID;
    }

    public Long getPurchaseID(){
        return this.purchaseID;
    }

    public List<Long> getTicketIdList(){
        return this.ticketIdList;
    }

    public void setTicketIdList(List<Long> tList){
        this.ticketIdList = tList;
    }

    public int getPrice(){
        return this.price;
    }

    public void setPrice(int p){
        this.price = p;
    }

}

