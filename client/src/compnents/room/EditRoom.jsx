import React, { useEffect } from 'react'
import { getRoomById, updateRoom } from '../utils/ApiFunctions';
import { useParams } from 'react-router-dom';

const EditRoom = () => {
  const [room, setRoom] = useState({
    photo: null,
    roomType: '',
    roomPrice: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const{id} =useParams()
  
  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    setRoom({ ...newRoom, photo: selectedImage });
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleRoomInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === 'roomPrice') {
      if (!isNaN(value)) {
        value = parseInt(value);
      } else {
        value = '';
      }
    }
    setRoom({ ...newRoom, [name]: value });
  };


 useEffect (()=>{
  const fetchRoom = async ()=>{
    try{
      const roomData =await getRoomById(id)
      setRoom(roomData)
      setImagePreview(roomData.photo)

    } catch(error){
      console.error(error)
    }
  }
  fetchRoom()
 },[id])



 const handleSubmit =async (event)=>{
  event.preventDefault()
  try{
    const response =await updateRoom(id,room)
    if(response.status ===200){
      setSuccessMessage("Room updated successfully.")
      const updatedRoomData=await getRoomById(id)
      setRoom(updatedRoomData)
      setImagePreview(updatedRoomData.photo)
      setErrorMessage("")
    }else{
      setErrorMessage("Error updating room")
    }
  }catch(error){
    console.error(error)
    setErrorMessage(error.message)
  }
 } 

 return (
  <section className='container mt-5 mb-5'>
    <div className='row justify-content-center'>
      <div className='col-md-8 col-lg-6'>
        <h2 className='mt-5 mb-2'>Edit Room</h2>
        {successMessage && (
          <div className='alert alert-success fade show'>{successMessage}</div>
        )}

{errorMessage&& (
          <div className='alert alert-danger fade show'>{errorMessage}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="roomType" className="form-label">Room Type</label>
            <div>
              <RoomTypeSelector handleRoomInputChange={handleRoomInputChange} newRoom={newRoom} />
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='roomPrice' className='form-label'>Room Price</label>
            <input
              className='form-control'
              required
              id='roomPrice'
              name='roomPrice'
              type='number'
              value={newRoom.roomPrice}
              onChange={handleRoomInputChange}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='photo' className='form-label'>Photo</label>
            <input
              className='form-control'
              required
              id='photo'
              name='photo'
              type='file'
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt='Preview room photo'
                style={{ maxWidth: '400px', maxHeight: '400px' }}
                className='mb-3'
              />
            )}
          </div>
          <div className='d-grid d-md-flex mt-2'>
            <button className='btn btn-outline-primary ml-5'>Edit Room</button>
          </div>
        </form>
        {successMessage && <div className='alert alert-success mt-3'>{successMessage}</div>}
        {errorMessage && <div className='alert alert-danger mt-3'>{errorMessage}</div>}
      </div>
    </div>
  </section>
);
};




export default EditRoom
