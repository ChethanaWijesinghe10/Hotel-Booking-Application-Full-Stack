import axios from "axios";

export const api= axios.create({
    baseURL:"http://localhost:8083"
})

export const getHeader = () => {
	const token = localStorage.getItem("token")
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json"
	}
}


export async function addRoom(photo,roomType,roomPrice) {
    const formData=new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

try{
    const response=await api.post("/api/v1/room/add",formData)
    if(response.status===200){
        return true
    }
    else {
      console.error(`Error: Unexpected status code ${response.status}`);
      return false;
  }
} catch (error) {
  console.error("Error adding room:", error);
  return false;
}
}

// to get all room types from database

export async function getRoomType() {
    try{
const response = await api.get("/api/v1/room/room-types")
return response.data
    }catch(error ){
        throw new Error("Error fetching room types")

    }
    
}


// get all rooms



export async function getAllRooms() {
  try {
    const result = await api.get("/api/v1/room/all-rooms");

    
    console.log("Raw API Response:", result);


    return Array.isArray(result.data) ? result.data : [];
  } catch (error) {
    console.error("Error fetching rooms:", error.response ? error.response.data : error.message);
    throw new Error("Error fetching rooms. Please try again later.");
  }
}


//to delete

export async function deleteRoom(id) {
  try {
    const result = await api.delete(`/api/v1/room/delete/${id}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room: ${error.message}`);
  }
}


//to update
 export async function updateRoom(id,roomData) {
  const formData =new FormData()
  formData.append("roomType",roomData.roomType)
formData.append("roomPrice",roomData.roomPrice)
formData.append("photo",roomData.photo)
//const response =await api.put("/api/v1/room/update/${id}")
const response = await api.put(`/api/v1/room/update/${id}`, formData);

return response 
  
}
 //get room by id

export async function getRoomById(id) {
  try{
    const result=await api.get(`/api/v1/room/room/${id}`)
    return result.data
  }catch(error){
throw new Error('Error fetching room ${error.message}')
  }
  
}



export async function bookRoom(id, booking) {
  try {
    const response = await api.post(`/api/v1/bookings/room/${id}/booking`, booking);
    return response.data;
  } catch (error) {
    console.error("Error booking room:", error.response ? error.response.data : error.message);
    throw error;
  }
}

//to get all bookings
export async function getAllBookings() {
	try {
		const result = await api.get("api/v1/bookings/all-bookings", {
			headers: getHeader()
		})
		return result.data
	} catch (error) {
		throw new Error(`Error fetching bookings : ${error.message}`)
	}
}
//get booking by the cnfirmation code 

export async function getBookingByConfirmationCode(confirmationCode) {
	try {
		const result = await api.get(`api/v1/bookings/confirmation/${confirmationCode}`)
		return result.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error find booking : ${error.message}`)
		}
	}
}

//to cancel user booking
export async function cancelBooking(id) {
	try {
		const result = await api.delete(`api/v1/bookings/booking/${id}/delete`)
		return result.data
	} catch (error) {
		throw new Error(`Error cancelling booking :${error.message}`)
	}
}