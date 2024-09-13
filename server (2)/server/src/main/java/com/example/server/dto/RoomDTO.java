package com.example.server.dto;

import lombok.*;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor
@Getter
@Setter
public class RoomDTO {

    private int id;
    private String roomType;
    private double roomPrice;
    private boolean isBooked;
    private String photo; // Keep as Blob
    private List<BookedRoomDTO> bookings;

    // Constructor with Base64 encoded photo
    public RoomDTO(int id, String roomType, double roomPrice, boolean isBooked, Blob photo, List<BookedRoomDTO> bookings) throws SQLException {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
        this.isBooked = isBooked;
        this.photo = photo != null ? Base64.getEncoder().encodeToString(photo.getBytes(1, (int) photo.length())) : null;
        //   this.photo = photo.toString();
        this.bookings = bookings;
    }

    public RoomDTO(int id, String roomType, double roomPrice) {
        this.id = id;
        this.roomType = roomType;
        this.roomPrice = roomPrice;
    }

    // Set photo as Base64 string for response
    public void setPhoto(String base64Photo) {

    }
}

