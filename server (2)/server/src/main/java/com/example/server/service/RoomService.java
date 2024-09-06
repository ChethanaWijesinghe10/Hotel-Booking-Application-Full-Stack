package com.example.server.service;

import com.example.server.dto.RoomDTO;
import com.example.server.dto.paginated.PaginatedResponseRoomDTO;
import com.example.server.entity.Room;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

public interface RoomService {
    RoomDTO addNewRoom(MultipartFile file, String roomType, double roomPrice) throws IOException, SQLException;

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(int id) throws SQLException;

    void deleteRoom(int id);

    Room updateRoom(int id, String roomType, double roomPrice, byte[] photoBytes);


    // PaginatedResponseRoomDTO getAllRooms(int page, int size);

    //PaginatedResponseRoomDTO getRoomRoomType(int page, int size, String roomType);
}
