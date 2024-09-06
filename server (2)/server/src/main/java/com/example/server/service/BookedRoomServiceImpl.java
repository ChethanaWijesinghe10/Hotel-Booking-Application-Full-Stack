package com.example.server.service;

import com.example.server.dto.BookedRoomDTO;
import com.example.server.entity.BookedRoom;
import com.example.server.entity.Room;
import com.example.server.repo.BookedRoomRepo;
import com.example.server.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookedRoomServiceImpl implements BookedRoomService{
    @Autowired
    private BookedRoomRepo bookedRoomRepo;

    @Autowired
    private RoomRepo roomRepo;

    @Override
    public BookedRoomDTO addBooking(int roomId, LocalDate checkInDate, LocalDate checkOutDate, String guestName, String guestEmail, int noOfAdults, int noOfChildren) throws Exception {
        Room room = roomRepo.findById(roomId).orElseThrow(() -> new Exception("Room not found"));
        BookedRoom booking = new BookedRoom();
        booking.setCheckInDate(checkInDate);
        booking.setCheckOutDate(checkOutDate);
        booking.setGuestName(guestName);
        booking.setGuestEmail(guestEmail);
        booking.setNoOfAdults(noOfAdults);
        booking.setNoOfChildren(noOfChildren);
        booking.setTotalNoOfGuests(noOfAdults + noOfChildren);
        booking.setBookingConfirmationCode(generateBookingCode());
        room.addBooking(booking);
        roomRepo.save(room);
        return new BookedRoomDTO(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestName()
        );
    }

    @Override
    public List<BookedRoom> getAllBookingsById(int id) {
        return null;
    }

  /*  @Override
    public List<BookedRoom> getAllBookingsById(int id) {
        return bookedRoomRepo.findBookedRoomsId(id);
    }
*/



    private String generateBookingCode() {
        return "BOOK" + System.currentTimeMillis(); // Simple booking code generation
    }
    }
