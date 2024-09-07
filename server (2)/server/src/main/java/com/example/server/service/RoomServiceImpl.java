package com.example.server.service;

import com.example.server.dto.RoomDTO;
import com.example.server.entity.BookedRoom;
import com.example.server.entity.Room;
import com.example.server.exceptions.InternalServerException;
import com.example.server.exceptions.ResourceNotFoundException;
import com.example.server.repo.RoomRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;
import java.util.Optional;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepo roomRepo;

@Autowired
 private RoomService roomService;

    @Override
    public RoomDTO addNewRoom(MultipartFile file, String roomType, double roomPrice) throws IOException, SQLException {
        Room room = new Room();
        room.setRoomType(roomType);
        room.setRoomPrice(roomPrice);

        if (file != null && !file.isEmpty()) {
            Blob photoBlob = new SerialBlob(file.getBytes());
            room.setPhoto(photoBlob);
        }

        Room savedRoom = roomRepo.save(room);

        return new RoomDTO(
                savedRoom.getId(),
                savedRoom.getRoomType(),
                savedRoom.getRoomPrice(),
                savedRoom.isBooked(),
                savedRoom.getPhoto(),
                null
        );
    }

    @Override
    public List<String> getAllRoomTypes() {

        return roomRepo.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepo.findAll();
    }
/*
    @Override
    public byte[] getRoomPhotoByRoomId(int id) throws SQLException {
        Optional<Room> theRoom = roomRepo.findById(id);
        if (theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, room not found");
        }
        Room room = theRoom.get();
        Blob photoBlob = room.getPhoto();
      ;
        if (photoBlob != null) {
            return photoBlob.getBytes(1, Math.toIntExact(photoBlob.length()));
        }
        return new byte[0];
    }


*/
    @Override
    public byte[] getRoomPhotoByRoomId(int id) throws SQLException {
        Optional<Room> theRoom = roomRepo.findById(id);
        if (theRoom.isEmpty()) {
            throw new ResourceNotFoundException("Sorry, room not found");
        }
        Room room = theRoom.get();
        Blob photoBlob = room.getPhoto();
        if (photoBlob != null) {
            return photoBlob.getBytes(1, Math.toIntExact(photoBlob.length()));
        }
        return new byte[0];
    }

    @Override
    public void deleteRoom(int id) {
        Optional<Room> theRoom =roomRepo.findById(id);
        if(theRoom.isPresent()){
            roomRepo.deleteById(id);
        }
    }


    //to update rooms

    @Override
    public Room updateRoom(int id, String roomType, Double roomPrice, byte[] photoBytes) {
        Room room =roomRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("Room not found"));
        if(roomType!=null) room.setRoomType(roomType);
         if(roomPrice!=null) {
             room.setRoomPrice(roomPrice);
         }
         if(photoBytes!=null && photoBytes.length>0){
             try{
                 room.setPhoto(new SerialBlob(photoBytes));
         }catch(SQLException ex){
                 throw new InternalServerException("Error updating room");
             }
         }

        return roomRepo.save(room);
    }

    @Override
    public Optional<Room> getRoomById(int id) {
        return Optional.of(roomRepo.findById(id).get());

    }
}
  /*  @Override
    public PaginatedResponseRoomDTO getAllRooms(int page, int size) {
        Page<Room> rooms = roomRepo.findAll(PageRequest.of(page, size));
        return new PaginatedResponseRoomDTO(
                itemMapper.pageToList(rooms),
                rooms.getTotalElements()
        );
    }*/

 /*   @Override
    public PaginatedResponseRoomDTO getRoomRoomType(int page, int size, String roomType) {
        Page<Room> rooms=roomRepo.findAllByRoomTypeEquals(roomType, PageRequest.of(page, size));

        return new PaginatedResponseRoomDTO(
                itemMapper.pageToList(rooms),

                roomRepo.countAllByRoomTypeEquals(roomType)
        );
    }*/



