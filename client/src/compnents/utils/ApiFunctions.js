import axios from "axios";

export const api= axios.create({
    baseURL:"http://localhost:8083"
})



export async function addRoom(photo,roomType,roomPrice) {
    const formData=new FormData()
    formData.append("photo",photo)
    formData.append("roomType",roomType)
    formData.append("roomPrice",roomPrice)

try{
    const response=await api.post("/api/v1/room/add",formData)
    if(response.status===201){
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

//Function to get all room types from database

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

    // Log the raw response to check its structure
    console.log("Raw API Response:", result);

    // Assuming result.data is already in the correct object format, no need to parse it
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
const response =await api.put("/room/update/${id}")
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
