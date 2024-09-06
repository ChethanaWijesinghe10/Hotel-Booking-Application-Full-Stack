package com.example.server.controller;

import java.sql.Blob;
import java.util.Base64;
import java.util.List;
import java.util.ArrayList;

import com.example.server.dto.BookedRoomDTO;
import com.example.server.dto.RoomDTO;
import com.example.server.entity.BookedRoom;
import com.example.server.entity.Room;
import com.example.server.repo.BookedRoomRepo;
import com.example.server.service.BookedRoomService;
import com.example.server.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.SQLException;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/room")
@CrossOrigin
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Autowired
    private BookedRoomService bookedRoomService;
    @Autowired
    private BookedRoomRepo bookedRoomRepo;


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
                    String base64Photo = Base64.getEncoder().encodeToString(photoByte);
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
                        booking.getBookingConfirmationCode()))
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
                                              @RequestParam(required = false) double roomPrice,
                                              @RequestParam(required = false) MultipartFile photo ) throws SQLException, IOException {
byte[] photoBytes =photo!=null && !photo.isEmpty()?
        photo.getBytes() : roomService.getRoomPhotoByRoomId(id);
        Blob photoBlob = photoBytes!=null && photoBytes.length>0 ?new SerialBlob(photoBytes):null;
    Room theRoom =roomService.updateRoom(id,roomType,roomPrice,photoBytes);
          theRoom.setPhoto(photoBlob);
          RoomDTO roomDTO =getRoomDTO(theRoom);
          return  ResponseEntity.ok(roomDTO);
    }

}



   /* @GetMapping(path = "/all-rooms")
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        try {
            List<Room> rooms = roomService.getAllRooms();
            List<RoomDTO> roomDTOS = new ArrayList<>();

            for (Room room : rooms) {
                RoomDTO roomDTO = getRoomDTO(room);
                byte[] photoByte = roomService.getRoomPhotoByRoomId(room.getId());

                if (photoByte != null && photoByte.length > 0) {
                    String base64Photo = Base64.getEncoder().encodeToString(photoByte);
                    roomDTO.setPhoto(base64Photo);
                } else {
                    roomDTO.setPhoto(null); // Handle case where photo is not available
                }

                roomDTOS.add(roomDTO);
            }

            return ResponseEntity.ok(roomDTOS);
        } catch (SQLException e) {
            // Return an empty list with an appropriate status code in case of SQL error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        } catch (Exception e) {
            // Return an empty list with an appropriate status code in case of a general error
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ArrayList<>());
        }
    }*/


   /* private RoomDTO getRoomDTO(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getRoomId());
        List<BookedRoomDTO> bookingInfo = (bookings != null ? bookings : new ArrayList<>())
                .stream()
                .map(booking -> new BookedRoomDTO(
                        booking.getBookingId(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(),
                        booking.getBookingConfirmationCode()))
                .toList();

        return new RoomDTO(
                room.getRoomId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                room.getPhoto(),
                bookingInfo);
    }*/
/*
    @GetMapping(path = "/all-rooms")
    public ResponseEntity<List<RoomDTO>> getAllRooms() throws SQLException {
        try {
            List<Room> rooms = roomService.getAllRooms();
            List<RoomDTO> roomDTOS = new ArrayList<>();

            for (Room room : rooms) {
                RoomDTO roomDTO = getRoomDTO(room);
                byte[] photoByte = roomService.getRoomPhotoByRoomId(room.getId());

                if (photoByte != null && photoByte.length > 0) {
                    String base64Photo = Base64.getEncoder().encodeToString(photoByte);
                    roomDTO.setPhoto(base64Photo);
                } else {
                    roomDTO.setPhoto(null); // Handle case where photo is not available
                }

                roomDTOS.add(roomDTO);
            }

            return ResponseEntity.ok(roomDTOS);
        } /*catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error retrieving room photos: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred: " + e.getMessage());
        }*/// catch (SQLException e){
           // throw new RuntimeException(e)
        //}


   /* private RoomDTO getRoomDTO(Room room) {
        List<BookedRoom> bookings = getAllBookingsByRoomId(room.getRoomId());
        List<BookedRoomDTO> bookingInfo = bookings.stream()
                .map(booking -> new BookedRoomDTO(
                        booking.getBookingId(),
                        booking.getCheckInDate(),
                        booking.getCheckOutDate(),
                        booking.getBookingConfirmationCode()))
                .collect(Collectors.toList()); // Make sure to collect the results into a list

        return new RoomDTO(
                room.getRoomId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                room.getPhoto(),
                bookingInfo);
    }*/



    


   /* @GetMapping(path = {"/get-all-item-by-room-type"},
            params={"page","size","roomType"}
    )
    public ResponseEntity<StandardResponse> getAllRoomsByRoomType(
            @RequestParam (value = "page") int page,

            @RequestParam(value = "size")  int size,
            @RequestParam(value = "roomType") String roomType
    ){


        PaginatedResponseRoomDTO paginatedResponseRoomDTO  =roomService.getRoomRoomType(page,size,roomType);
        return new ResponseEntity<StandardResponse>(
                new StandardResponse(200,"Success",paginatedResponseRoomDTO),
                HttpStatus.OK
        );

    }*/
