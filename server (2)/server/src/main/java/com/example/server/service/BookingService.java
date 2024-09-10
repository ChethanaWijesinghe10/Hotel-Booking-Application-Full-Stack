package com.example.server.service;

import com.example.server.dto.BookedRoomDTO;
import com.example.server.entity.BookedRoom;

import java.time.LocalDate;
import java.util.List;

public interface BookingService {
   // BookedRoomDTO addBooking(int roomId, LocalDate checkInDate, LocalDate checkOutDate, String guestName, String guestEmail, int noOfAdults, int noOfChildren) throws Exception;

    List<BookedRoom> getAllBookingsById(int id);

    BookedRoom findByBookingConfirmationCode(String bookingConfirmationCode);

    List<BookedRoom> getAllBookings();

    String saveBooking(int id, BookedRoom bookingRequest);

    void cancelBooking(int bookingId);

    //  List<BookedRoom> getAllBookingsByRoomId(int roomId);
}
