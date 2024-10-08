package com.example.server.controller;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.Base64;
import java.util.List;
import java.util.ArrayList;

import com.example.server.dto.BookedRoomDTO;
import com.example.server.dto.RoomDTO;
import com.example.server.entity.BookedRoom;
import com.example.server.entity.Room;
import com.example.server.exceptions.ResourceNotFoundException;
import com.example.server.repo.BookingRepo;
import com.example.server.service.BookingService;
import com.example.server.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.Base64.*;

@RestController
@RequestMapping("/api/v1/room")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private BookingService bookedRoomService;
    @Autowired
    private BookingRepo bookedRoomRepo;


    @PostMapping("/add")
    public ResponseEntity<?> addNewRoom(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam("roomType") String roomType,
            @RequestParam("roomPrice") double roomPrice) {

        if (roomType == null || roomType.trim().isEmpty()) {
            return ResponseEntity.badRequest().body("Room type is required.");
        }
        if (roomPrice <= 0) {
            return ResponseEntity.badRequest().body("Room price must be greater than zero.");
        }

        try {
            RoomDTO roomDTO = roomService.addNewRoom(photo, roomType, roomPrice);
            return ResponseEntity.ok(roomDTO);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error processing file: " + e.getMessage());
        } catch (SQLException e) {
            return ResponseEntity.status(500).body("Error saving room: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @GetMapping("/room-types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }



   @GetMapping(path = "/all-rooms")
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        try {
            List<Room> rooms = roomService.getAllRooms();
            List<RoomDTO> roomDTOS = new ArrayList<>();

            for (Room room : rooms) {
                RoomDTO roomDTO = getRoomDTO(room);
                byte[] photoByte = roomService.getRoomPhotoByRoomId(room.getId());

                if (photoByte != null && photoByte.length > 0) {
                    String base64Photo = getEncoder().encodeToString(photoByte);
                    roomDTO.setPhoto(base64Photo);
                } else {
                    roomDTO.setPhoto(null); // Handle case where photo is not available
                }

                roomDTOS.add(roomDTO);
            }

            return ResponseEntity.ok(roomDTOS);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }

    private RoomDTO getRoomDTO(Room room) throws SQLException {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getId());
        if (bookings == null) {
            bookings = new ArrayList<>();
        }

        List<BookedRoomDTO> bookingInfo = bookings.stream()
                .map(booking -> new BookedRoomDTO(
                        booking.getBookingId(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(),
                        booking.getBookingConfirmationCode(), booking.getGuestEmail(), booking.getNoOfAdults(), booking.getNoOfChildren(), booking.getTotalNoOfGuests(), booking.getBookingConfirmationCode(), room.getRoomType(), room.getId()))
                .collect(Collectors.toList());

        return new RoomDTO(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                room.getPhoto(),
                bookingInfo);
    }

    public List<BookedRoom> getAllBookingsByRoomId(int id) {

        return bookedRoomService.getAllBookingsById(id);
    }

    //to delete room

    @DeleteMapping(path = "delete/{id}")
    public ResponseEntity<Void> deleteRoom(@PathVariable("id") int id){
        roomService.deleteRoom(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    //to update
    @PutMapping(path = "/update/{id}")
    public ResponseEntity<RoomDTO> updateRoom(@PathVariable int id,
                                              @RequestParam(required = false) String roomType,
                                              @RequestParam(required = false) Double roomPrice,
                                              @RequestParam(required = false) MultipartFile photo ) throws SQLException, IOException {
byte[] photoBytes =photo!=null && !photo.isEmpty()?
        photo.getBytes() : roomService.getRoomPhotoByRoomId(id);
        Blob photoBlob = photoBytes!=null && photoBytes.length>0 ?new SerialBlob(photoBytes):null;
    Room theRoom =roomService.updateRoom(id,roomType,roomPrice,photoBytes);
          theRoom.setPhoto(photoBlob);
          RoomDTO roomDTO =getRoomDTO(theRoom);
          return  ResponseEntity.ok(roomDTO);
    }
@GetMapping(path = "/room/{id}")
 public ResponseEntity<Optional<RoomDTO>>  getRoomById(@PathVariable int id){
Optional<Room> theRoom =roomService.getRoomById(id);
return theRoom.map(room ->{
    RoomDTO roomDTO = null;
    try {
        roomDTO = getRoomDTO(room);
    } catch (SQLException e) {
        throw new RuntimeException(e);
    }
    return  ResponseEntity.ok(Optional.of(roomDTO));
} ).orElseThrow(()->new ResourceNotFoundException("Room not found"));
 }


    @GetMapping("/available-rooms")
    public ResponseEntity<List<RoomDTO>> getAvailableRooms(
            @RequestParam("checkInDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam("checkOutDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate checkOutDate,
            @RequestParam("roomType") String roomType) throws SQLException {
        List<Room> availableRooms = roomService.getAvailableRooms(checkInDate, checkOutDate, roomType);
        List<RoomDTO> roomResponses = new ArrayList<>();
        for (Room room : availableRooms){
            byte[] photoBytes = roomService.getRoomPhotoByRoomId(room.getId());
            if (photoBytes != null && photoBytes.length > 0){
                String photoBase64 = Base64.getEncoder().encodeToString(photoBytes);

                RoomDTO roomResponse = getRoomDTO(room);
                roomResponse.setPhoto(photoBase64);
                roomResponses.add(roomResponse);
            }
        }
        if(roomResponses.isEmpty()){
            return ResponseEntity.noContent().build();
        }else{
            return ResponseEntity.ok(roomResponses);
        }
    }



}
