package com.example.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "room")
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "room_id")
    private int id;

    @Column(name = "room_type", length = 100, nullable = false)
    private String roomType;

    @Column(name = "room_price", nullable = false)
    private double roomPrice;

    @Column(name = "is_booked", columnDefinition = "boolean default false")
    private boolean isBooked = false;

    @Lob
    @Column(name = "photo")
    private Blob photo;

    @OneToMany(mappedBy = "room", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BookedRoom> bookings = new ArrayList<>();

    public void addBooking(BookedRoom booking) {
        if (bookings == null) {
            bookings = new ArrayList<>();
        }
        bookings.add(booking);
        booking.setRoom(this);
        updateBookingStatus();
    }

  /*  public void removeBooking(BookedRoom booking) {
        if (bookings != null) {
            bookings.remove(booking);
            booking.setRoom(null);
            updateBookingStatus();
        }
    }
*/
    private void updateBookingStatus() {
        isBooked = !bookings.isEmpty();
    }
}
