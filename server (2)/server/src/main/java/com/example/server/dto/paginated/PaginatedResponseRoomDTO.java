package com.example.server.dto.paginated;

import com.example.server.dto.RoomDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@AllArgsConstructor
@NoArgsConstructor
@Data
public class PaginatedResponseRoomDTO {
    private List<RoomDTO> list;
    private  long dataCount;
}
