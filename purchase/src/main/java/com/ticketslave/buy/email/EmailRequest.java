package com.ticketslave.buy.email;

public class EmailRequest {
    private String to;
    private String purchaseID;

    public EmailRequest() {
    }

    public EmailRequest(String to, String purchaseID) {
        this.to = to;
        this.purchaseID = purchaseID;

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


}

