package com.example.server.exceptions;

public class InvalidBookingRequestException extends RuntimeException {
    public  InvalidBookingRequestException(String message){
        super(message);
    }
}
