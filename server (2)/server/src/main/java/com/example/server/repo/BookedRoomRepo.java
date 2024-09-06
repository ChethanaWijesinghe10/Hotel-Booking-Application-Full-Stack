package com.example.server.repo;

import com.example.server.entity.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface BookedRoomRepo extends JpaRepository<BookedRoom, Integer> {




  //  List<BookedRoom> findBookedRoomsId(int id);
}
