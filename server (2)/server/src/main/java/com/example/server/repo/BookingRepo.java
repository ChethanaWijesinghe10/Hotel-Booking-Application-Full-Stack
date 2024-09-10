package com.example.server.repo;

import com.example.server.entity.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface BookingRepo extends JpaRepository<BookedRoom, Integer> {




    //List<BookedRoom> findBookedRoomsId(int id);
    List<BookedRoom> findByRoomId(int id);
    BookedRoom findByBookingConfirmationCode(String bookingConfirmationCode);
}
