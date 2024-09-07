
import React, { useState } from 'react';
import { addRoom } from '../utils/ApiFunctions';
import RoomTypeSelector from '../common/RoomTypeSelector';

const AddRoom = () => {
  const [newRoom, setNewRoom] = useState({
    photo: null,
    roomType: '',
    roomPrice: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

 
const handleRoomInputChange = (e) => {
  const { name, value } = e.target;
  setNewRoom((prevRoom) => ({
    ...prevRoom,
    [name]: value
  }));
};

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setNewRoom((prevRoom) => ({ ...prevRoom, photo: selectedImage }));
    setImagePreview(URL.createObjectURL(selectedImage));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await addRoom(newRoom.photo, newRoom.roomType, newRoom.roomPrice);
      if (success) {
        setSuccessMessage('New Room was added successfully');
        setNewRoom({ photo: null, roomType: '', roomPrice: '' });
        setImagePreview('');
        setErrorMessage('');
      } else {
        setErrorMessage('Error Adding Room');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, 3000);
  };

  return (
    <section className='container mt-5 mb-5'>
      <div className='row justify-content-center'>
        <div className='col-md-8 col-lg-6'>
          <h2 className='mt-5 mb-2'>Add a New Room</h2>
          {successMessage && (
            <div className='alert alert-success fade show'>{successMessage}</div>
          )}
          {errorMessage && (
            <div className='alert alert-danger fade show'>{errorMessage}</div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="roomType" className="form-label">Room Type</label>
              <div>
                <RoomTypeSelector
                  newRoom={newRoom}
                  handleRoomInputChange={handleRoomInputChange}
                />
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
              <button className='btn btn-outline-primary'>Save Room</button>
            </div>
          </form>
          {successMessage && <div className='alert alert-success mt-3'>{successMessage}</div>}
          {errorMessage && <div className='alert alert-danger mt-3'>{errorMessage}</div>}
        </div>
      </div>
    </section>
  );
};

export default AddRoom;
