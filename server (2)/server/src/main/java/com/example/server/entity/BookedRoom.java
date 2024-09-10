package com.example.server.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "booked_room")
public class BookedRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "booking_id")
    private int bookingId;

    @Column(name = "checkin_date", nullable = false)
    private LocalDate checkInDate;

    @Column(name = "checkout_date", nullable = false)
    private LocalDate checkOutDate;

    @Column(name = "guest_name", length = 225, nullable = false)
    private String guestName;

    @Column(name = "guest_email", length = 225, nullable = false)
    private String guestEmail;

    @Column(name = "no_of_adults", nullable = false)
    private int noOfAdults;

    @Column(name = "no_of_children", nullable = false)
    private int noOfChildren;

    @Column(name = "total_no_of_guests", nullable = false)
    private int totalNoOfGuests;

    @Column(name = "booking_confirmation_code", length = 225, nullable = false)
    private String bookingConfirmationCode;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id", nullable = false)
    private Room room;


    public void calculateTotalNumberOfGuest(){
        this.totalNoOfGuests = this.noOfAdults+ noOfChildren;
    }

    public void setNumOfAdults(int numOfAdults) {
        noOfAdults = numOfAdults;
        calculateTotalNumberOfGuest();
    }

    public void setNumOfChildren(int numOfChildren) {
        noOfChildren = numOfChildren;
        calculateTotalNumberOfGuest();
    }

    public void setBookingConfirmationCode(String bookingConfirmationCode) {
        this.bookingConfirmationCode = bookingConfirmationCode;
    }
}
