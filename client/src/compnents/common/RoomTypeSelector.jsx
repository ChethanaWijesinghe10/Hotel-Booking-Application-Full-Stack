
import React, { useEffect, useState } from 'react';
import { getRoomType } from '../utils/ApiFunctions';
import AddRoom from '../room/AddRoom';
const RoomTypeSelector = ({ handleRoomInputChange, newRoom }) => {
  console.log("RoomTypeSelector rendered");
  console.log("Received newRoom:", newRoom);

  const [roomTypes, setRoomTypes] = useState(['Single', 'Double', 'Suite', 'Family Suite']);
  const [showNewRoomTypeInput, setShowNewRoomTypeInput] = useState(false);
  const [newRoomType, setNewRoomType] = useState('');


  useEffect(() => {
    const fetchRoomTypes = async () => {
      try {
        const data = await getRoomType();
        setRoomTypes(data);
      } catch (error) {
        console.error("Error fetching room types:", error);
      }
    };

    fetchRoomTypes();
  }, []);

  const handleNewRoomTypeInputChange = (e) => {
    setNewRoomType(e.target.value);
  };


const handleAddNewRoomType = () => {
  if (newRoomType && !roomTypes.includes(newRoomType)) {
    const updatedRoomTypes = [...roomTypes, newRoomType];
    setRoomTypes(updatedRoomTypes);
    setNewRoomType('');
    setShowNewRoomTypeInput(false);
    handleRoomInputChange({
      target: { name: 'roomType', value: newRoomType },
    });
  }
};

  return (
    <>
      {roomTypes.length > 0 && (
        <div>
          <select
            id="roomType"
            name="roomType"
            value={newRoom?.roomType || ''}  
            onChange={(e) => {
              if (e.target.value === 'Add New') {
                setShowNewRoomTypeInput(true);
              } else {
                handleRoomInputChange(e);
                setShowNewRoomTypeInput(false);
              }
            }}
            className="form-select"
          >
            <option value="">Select a room type</option>
            <option value="Add New">Add New</option>
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
          {showNewRoomTypeInput && (
            <div className="input-group mt-2">
              <input
                className="form-control"
                type="text"
                placeholder="Enter a new room type"
                value={newRoomType}
                onChange={handleNewRoomTypeInputChange}
              />
              <button
                className="btn btn-outline-primary"
                type="button"
                onClick={handleAddNewRoomType}
              >
                Add
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default RoomTypeSelector;
