package com.ticketslave.backend.booking;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class BookingService {

    private boolean timerExpired = false;

    // Set the timer duration in milliseconds (e.g., 10 minutes)
    private static final long TIMER_DURATION = 20000;

    public void startTimer() {
        // Start the timer by setting a flag or using a timer thread
        // For simplicity, we'll use a timer flag here
        System.out.println("timer has started");
        new Thread(() -> {
            try {
                Thread.sleep(TIMER_DURATION);
                System.out.println("timer has expired bro");
                timerExpired = true;
            } catch (InterruptedException e) {
                // Handle any exceptions that may occur during sleep
            }
        }).start();
    }

    public boolean isTimerExpired() {
        return timerExpired;
    }

    public void resetTimer(){
        timerExpired = false;
    }
}