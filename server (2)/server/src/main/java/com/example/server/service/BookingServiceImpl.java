package com.example.server.service;

import com.example.server.dto.BookedRoomDTO;
import com.example.server.entity.BookedRoom;
import com.example.server.entity.Room;
import com.example.server.exceptions.InvalidBookingRequestException;
import com.example.server.repo.BookingRepo;
import com.example.server.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepo bookedRoomRepo;

    @Autowired
    private RoomRepo roomRepo;

   /* @Override
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
    }*/


@Autowired
RoomService roomService;


    @Override
    public List<BookedRoom> getAllBookingsById(int id) {
        return bookedRoomRepo.findByRoomId(id);
    }

    @Override
    public BookedRoom findByBookingConfirmationCode(String bookingConfirmationCode) {
        return bookedRoomRepo.findByBookingConfirmationCode(bookingConfirmationCode);
    }

    @Override
    public List<BookedRoom> getAllBookings() {
        return bookedRoomRepo.findAll();
    }

    /*@Override
    public String saveBooking(int id, BookedRoom bookingRequest) {
       if(bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())){
           throw new InvalidBookingRequestException("Check-in date must come before check-out date");
       }
       Room room= roomService.getRoomById(id).get();
       List<BookedRoom> existingBookings=room.getBookings();
       boolean roomIsAvailable =roomIsAvailable(bookingRequest,existingBookings);
       if(roomIsAvailable){
           room.addBooking(bookingRequest);
           bookedRoomRepo.save(bookingRequest);
       }
       else{
           throw new InvalidBookingRequestException("Sorry,This room is not available for selected dates.!");
       }
        return bookingRequest.getBookingConfirmationCode() ;
    }*/


    @Override
    public String saveBooking(int id, BookedRoom bookingRequest) {
        // Validate the check-in and check-out dates
        if (bookingRequest.getCheckOutDate().isBefore(bookingRequest.getCheckInDate())) {
            throw new InvalidBookingRequestException("Check-in date must come before check-out date");
        }

        // Fetch the room by ID
        Room room = roomService.getRoomById(id).orElseThrow(() -> new InvalidBookingRequestException("Room not found"));

        // Check room availability for the given dates
        List<BookedRoom> existingBookings = room.getBookings();
        boolean roomIsAvailable = roomIsAvailable(bookingRequest, existingBookings);

        if (roomIsAvailable) {
            // Generate a unique confirmation code
            String confirmationCode = UUID.randomUUID().toString();
            bookingRequest.setBookingConfirmationCode(confirmationCode); // Set the generated code

            // Add the booking to the room and save the booking
            room.addBooking(bookingRequest);
            bookedRoomRepo.save(bookingRequest);

            return confirmationCode; // Return the generated confirmation code
        } else {
            throw new InvalidBookingRequestException("Sorry, this room is not available for selected dates!");
        }
    }

   /* private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
        return existingBookings.stream()
                .noneMatch(existingBooking ->
                        bookingRequest.getCheckInDate().equals(existingBooking.getCheckInDate())
                                || bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckOutDate())
                                || (bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckInDate())
                                && bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckOutDate()))
                                || (bookingRequest.getCheckInDate().isBefore(existingBooking.getCheckInDate())

                                && bookingRequest.getCheckOutDate().isAfter(existingBooking.getCheckOutDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(existingBooking.getCheckInDate()))

                                || (bookingRequest.getCheckInDate().equals(existingBooking.getCheckOutDate())
                                && bookingRequest.getCheckOutDate().equals(bookingRequest.getCheckInDate()))
                );
    }
*/
   private boolean roomIsAvailable(BookedRoom bookingRequest, List<BookedRoom> existingBookings) {
       return existingBookings.stream()
               .noneMatch(existingBooking ->
                       // Check if the new booking overlaps with an existing booking
                       !(bookingRequest.getCheckOutDate().isBefore(existingBooking.getCheckInDate()) ||
                               bookingRequest.getCheckInDate().isAfter(existingBooking.getCheckOutDate()))
               );
   }

    @Override
    public void cancelBooking(int id) {
bookedRoomRepo.deleteById(id);
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
