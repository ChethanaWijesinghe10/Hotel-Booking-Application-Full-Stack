
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("");

  const handleSelectChange = (e) => {
    const selectRoomType = e.target.value.toLowerCase();;
    setFilter(selectRoomType);
    if (selectRoomType === "") {
      setFilteredData(data); // Reset filter
    } else {
      const filteredRooms = data.filter((room) =>
        room.roomType.toLowerCase().includes(selectRoomType.toLowerCase())
      );
      setFilteredData(filteredRooms);
    }
  };

  const clearFilter = () => {
    setFilter("");
    setFilteredData(data);
  };

  const roomTypes = ["", ...new Set(data.map((room) => room.roomType))];

  return (
    <div className='input-group mb-3'>
      <span className='input-group-text' id="room-type-filter">Filter rooms by type</span>
      <select className='form-select' value={filter} onChange={handleSelectChange}>
        <option value="">Select a room type to filter....</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>{type}</option>
        ))}
      </select>
      <button className='btn btn-hotel' type="button" onClick={clearFilter}>Clear Filter</button>
    </div>
  );
};

export default RoomFilter;
