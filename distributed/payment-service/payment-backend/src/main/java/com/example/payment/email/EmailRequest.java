package com.example.payment.email;
import java.util.*;

public class EmailRequest {
    private String to;
    private Long purchaseID;
    private List<Long> ticketIdList;

    public EmailRequest() {
    }

    public EmailRequest(String to, Long purchaseID, List<Long> ticketIdList) {
        this.to = to;
        this.purchaseID = purchaseID;
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

}

