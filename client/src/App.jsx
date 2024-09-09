
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
        </Routes>
        </Router>
        <Footer/>
    </>
  )
}

export default App
