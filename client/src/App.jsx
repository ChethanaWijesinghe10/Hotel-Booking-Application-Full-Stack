
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

function App() {
  

  return (
    <>
   <Router>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/existing-rooms" element={<ExistingRooms/>} />

<Route path="/edit-room/:id" element={<EditRoom />} />
<Route path="/add-room" element={<AddRoom/>} />
        </Routes>
        </Router>
    </>
  )
}

export default App
