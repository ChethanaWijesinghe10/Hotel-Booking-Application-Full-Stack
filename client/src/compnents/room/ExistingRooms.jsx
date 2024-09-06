
import React, { useEffect, useState } from 'react';
import { deleteRoom, getAllRooms } from '../utils/ApiFunctions';
import RoomPaginator from '../common/RoomPaginator';
import RoomFilter from '../common/RoomFilter';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col } from 'react-bootstrap';
import { FaTrashAlt,FaEye,FaEdit, } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ExistingRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      console.log("API Response:", result);
      if (Array.isArray(result)) {
        setRooms(result);
        setFilteredRooms(result);
      } else {
        throw new Error("API did not return an array of rooms");
      }
    } catch (error) {
      setErrorMessage(`Error fetching rooms: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoomType === '') {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter((room) => room.roomType === selectedRoomType);
      setFilteredRooms(filtered);
    }
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


const handleDelete =async(id)=>{
  try{
  const result=await deleteRoom(id)
  if(result ===""){
    setSuccessMessage("Room No ${id} was deleted")
    fetchRooms() 
  }else{
    console.error("Error deleting room: ${result.message }")
  }
  }catch(error){
    setErrorMessage(error.message)
  }
  setTimeout(()=>{
    setSuccessMessage("")
    setErrorMessage("")
  },3000)
}






  const calculateTotalPages = (filteredRooms, roomsPerPage) => {
    const totalRooms = filteredRooms.length > 0 ? filteredRooms.length : rooms.length;
    return Math.ceil(totalRooms / roomsPerPage);
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);

  return (
    <>
 
      {isLoading ? (
        <p>Loading existing rooms...</p>
      ) : errorMessage ? (
        <p>Error: {errorMessage}</p>
      ) : (
        <>
          <section className='mt-5 mb-5 container'>
            <div className='d-flex justify-content-center mb-3 mt-5'>
              <h2>Existing Rooms</h2>
            </div>
            <Col md={6} className='mb-3 mb-md-0'>
              <RoomFilter data={rooms} setFilteredData={setFilteredRooms} />
            </Col>
            <table className='table table-bordered table-hover'>
              <thead>
                <tr className='text-center'>
                  <th>ID</th>
                  <th>Room Type</th>
                  <th>Room Price</th>
                  <th>Room Photo</th> 
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentRooms.map((room) => (
                  <tr key={room.id} className='text-center'>
                    <td>{room.id}</td>
                    <td>{room.roomType}</td>
                    <td>{room.roomPrice}</td>
                  
                    <td>
                      {room.photo ? (
                        <img
                          src={`data:image/jpeg;base64,${room.photo}`}
                          alt="Room"
                          style={{ width: '100px', height: 'auto' }}
                        />
                      ) : (
                        <p>No Photo Available</p>
                      )}
                    </td>
                    <td className='gap-2'>
                    <Link to={`/edit-room/${room.id}`} >
                    <span className='btn btn-info btn-sm'>
                      <FaEye/>
                      </span> 
                    <span className='btn btn-warning btn-sm'>
                      <FaEdit/>
                      </span> 
                     </Link>    
              
                      <button className='btn btn-danger btn-sm'
                      onClick={()=>handleDelete(room.id)} >
                        <FaTrashAlt/>
                  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoomPaginator
              currentPage={currentPage}
              totalPages={calculateTotalPages(filteredRooms, roomsPerPage)}
              onPageChange={handlePaginationClick}
            />
          </section>
        </>
      )}
    
    </>
  );
};

export default ExistingRooms;
