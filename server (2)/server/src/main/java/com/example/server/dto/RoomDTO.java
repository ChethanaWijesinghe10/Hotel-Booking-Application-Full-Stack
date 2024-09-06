package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

@Data
@NoArgsConstructor

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

    // Set photo as Base64 string for response
    public void setPhoto(String base64Photo) {
        // Optional: if you need to convert back from Base64
    }
}

