package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookedRoomDTO {
    private int id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private String guestName;
    private String guestEmail;
    private int noOfAdults;
    private int noOfChildren;
    private int totalNoOfGuests;
    private String bookingConfirmationCode;

    public BookedRoomDTO(int id, LocalDate checkInDate, LocalDate checkOutDate, String bookingConfirmationCode) {
        this.id=id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
