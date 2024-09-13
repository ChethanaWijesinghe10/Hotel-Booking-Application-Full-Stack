package com.example.server.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor

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
    private String roomType;
    private Double roomPrice;
    private RoomDTO room;
    public BookedRoomDTO(int id, LocalDate checkInDate, LocalDate checkOutDate, String bookingConfirmationCode, String guestEmail, int noOfAdults, int noOfChildren, int totalNoOfGuests, String confirmationCode, String roomType, int roomId) {
        this.id=id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.bookingConfirmationCode = bookingConfirmationCode;
    }




    public BookedRoomDTO(int id, LocalDate checkInDate, LocalDate checkOutDate, String guestName,
                         String guestEmail, int noOfAdults, int noOfChildren, int totalNoOfGuests,
                         String bookingConfirmationCode, String roomType) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.noOfAdults = noOfAdults;
        this.noOfChildren = noOfChildren;
        this.totalNoOfGuests = totalNoOfGuests;
        this.bookingConfirmationCode = bookingConfirmationCode;
        this.roomType = roomType;

    }





    public BookedRoomDTO(int id, LocalDate checkInDate, LocalDate checkOutDate, String guestName,
                         String guestEmail, int noOfAdults, int noOfChildren, int totalNoOfGuests,
                         String bookingConfirmationCode, RoomDTO room) {
        this.id = id;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guestName = guestName;
        this.guestEmail = guestEmail;
        this.noOfAdults = noOfAdults;
        this.noOfChildren = noOfChildren;
        this.totalNoOfGuests = totalNoOfGuests;
        this.bookingConfirmationCode = bookingConfirmationCode;
        this.room = room;  // Assign RoomDTO here
        this.roomType = room.getRoomType();  // Get roomType from RoomDTO
        this.roomPrice = room.getRoomPrice();  // Get roomPrice from RoomDTO
    }

}
