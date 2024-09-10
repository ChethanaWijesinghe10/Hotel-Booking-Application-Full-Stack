package com.example.server.controller;

import com.example.server.dto.BookedRoomDTO;
import com.example.server.dto.RoomDTO;
import com.example.server.entity.BookedRoom;
import com.example.server.entity.Room;
import com.example.server.exceptions.InvalidBookingRequestException;
import com.example.server.exceptions.ResourceNotFoundException;
import com.example.server.service.BookingService;
import com.example.server.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/bookings")
@CrossOrigin
public class BookingController {
@Autowired
    BookingService bookingService;
@Autowired
    RoomService roomService;
@GetMapping(path="/all-bookings")
    public ResponseEntity<List<BookedRoomDTO>>getAllBookings(){
        List<BookedRoom> bookings=bookingService.getAllBookings();
        List<BookedRoomDTO> bookedRoomDTOS=new ArrayList<>();
        for(BookedRoom booking:bookings){
            BookedRoomDTO bookedRoomDTO=getBookingDTO(booking);
            bookedRoomDTOS.add(bookedRoomDTO);
        }
        return ResponseEntity.ok(bookedRoomDTOS);
    }


@GetMapping(path = "/confirmation/{bookingConfirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable  String bookingConfirmationCode){
    try{
        BookedRoom booking=bookingService.findByBookingConfirmationCode(bookingConfirmationCode);
        BookedRoomDTO bookedRoomDTO =getBookingDTO(booking);
     return  ResponseEntity.ok(bookedRoomDTO);
    }catch(ResourceNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
    }

    private BookedRoomDTO getBookingDTO(BookedRoom booking) {
    Room theRoom= roomService.getRoomById(booking.getRoom().getId()).get();
        RoomDTO room=new RoomDTO(theRoom.getId(), theRoom.getRoomType(), theRoom.getRoomPrice() );
        return new BookedRoomDTO(booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestName(),
                booking.getGuestEmail(),
                booking.getNoOfAdults(),
                booking.getNoOfChildren(),
                booking.getTotalNoOfGuests(),
                booking.getBookingConfirmationCode()

        );
    }

    @PostMapping(path = "/room/{id}/booking")
    public ResponseEntity<?> saveBooking(@PathVariable int id,
                                         @RequestBody BookedRoom bookingRequest){
    try{
    String confirmationCode= bookingService.saveBooking(id,bookingRequest);
    return ResponseEntity.ok("Room Booked Successfully,Your booking confirmation code is : "+ confirmationCode);
    }catch (InvalidBookingRequestException ex) {
        return  ResponseEntity.badRequest().body(ex.getMessage());
    }

    }


    //cancel booking
@DeleteMapping(path="/booking/{bookingId}/delete")
    public void cancelBooking(@PathVariable int bookingId){
    bookingService.cancelBooking(bookingId);

    }
}
