package com.example.payment.email;
public class EmailRequest {
    private String to;
    private String purchaseID;
    private List<Long> ticketIdList;

    public EmailRequest() {
    }

    public EmailRequest(String to, String purchaseID, List<Long> ticketIdList) {
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

    public void setPurchaseID(String purchaseID){
        this.purchaseID = purchaseID;
    }

    public String getPurchaseID(){
        return this.purchaseID;
    }

    public List<Long> getTicketIdList(){
        return this.ticketIdList;
    }

    public setTicketIdList(List<Long> tList){
        this.ticketIdList = tList;
    }

}

