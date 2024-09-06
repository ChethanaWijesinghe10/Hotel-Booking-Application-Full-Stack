package com.example.server.repo;

import com.example.server.entity.BookedRoom;
import com.example.server.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@EnableJpaRepositories
public interface RoomRepo extends JpaRepository<Room,Integer> {
    @Query("SELECT DISTINCT r.roomType FROM Room r")
    List<String> findDistinctRoomTypes();
    Optional<Room> findById(int id);



 //   Page<Room> findAllByRoomTypeEquals(String roomType, Pageable pageable);

  Page<Room> findAllByRoomTypeEquals(String roomType, Pageable pageable);


}
