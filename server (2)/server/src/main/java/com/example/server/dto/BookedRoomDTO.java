package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookedRoomDTO {
    private int bookingId;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private String guestEmail;
    private int noOfAdults;
    private int noOfChildren;
    private int totalNoOfGuests;
    private String bookingConfirmationCode;

    public BookedRoomDTO(int bookingId, LocalDate checkInDate, LocalDate checkOutDate, String bookingConfirmationCode) {
    }
}
