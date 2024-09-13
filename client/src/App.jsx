
import React from 'react'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import "react-bootstrap"
import "bootstrap"
import './index.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from './compnents/home/Home'
import EditRoom from './compnents/room/EditRoom'
import ExistingRooms from './compnents/room/ExistingRooms'
import AddRoom from './compnents/room/AddRoom'
import NavBar from './compnents/layout/NavBar'
import Footer from './compnents/layout/Footer'
import RoomFilter from './compnents/common/RoomFilter'
import RoomListing from './compnents/room/RoomListing'
import Admin from './compnents/admin/Admin'
import Checkout from './compnents/bookings/Checkout'
import BookingSuccess from './compnents/bookings/BookingSuccess'
import Bookings from './compnents/bookings/Bookings'
import FindBooking from './compnents/bookings/FindBooking'
function App() {
  

  return (
    <>
   <Router>
    <NavBar/>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/existing-rooms" element={<ExistingRooms/>} />
<Route path="/edit-room/:id" element={<EditRoom />} />
<Route path="/add-room" element={<AddRoom/>} />
<Route path="/browse-all-rooms" element={<RoomListing/>} />

<Route path="/admin" element={<Admin/>} />

<Route path="/book-room/:id" element={<Checkout/>} />

<Route path="/booking-success" element={<BookingSuccess/>} />
<Route path="/existing-bookings" element={<Bookings/>} />
<Route path="/find-booking" element={<FindBooking/>} />
        </Routes>
        </Router>
        <Footer/>
    </>
  )
}

export default App
