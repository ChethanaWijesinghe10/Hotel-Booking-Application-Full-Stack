
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [showAccount,setShowAccount]=useState(false)
  
  const handleAccountClick=()=>{
    setShowAccount(!showAccount)
  }
    return (
        <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
            <div className='container-fluid'>
            <Link to={"/"} className='hotel-color'>
            Luxe Haven Resort
     </Link>


                <button className='navbar-toggler' 
                    type='button'
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarScroll"
                    aria-controls='navbarScroll'
                    aria-expanded="false"
                    aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div className='collapse navbar-collapse' id="navbarScroll">
                    <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                                Browse all rooms
                            </NavLink>
                        </li>

                     

                        
                    </ul>

                    <ul className='d-flex navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className="nav-link" to={"/find-booking"}>Find My Bookings</NavLink>
                        </li>

                        <li className='nav-item dropdown'>
                            <a className={'nav-link dropdown-toggle  ${showAccount ? "show" :""}'}
                               href='#' 
                               id='navbarAccountDropdown' 
                               role='button' 
                               data-bs-toggle='dropdown' 
                               aria-expanded='false'
                               onClick={handleAccountClick}>
                                {" "}
                                Account
                                <i className='bi bi-person-circle ms-2'></i> 
                            </a>

                            <ul className='dropdown-menu' aria-labelledby='navbarAccountDropdown'>
                                <li>
                                    <Link to={"/admin"} className="dropdown-item">
                                       Admin
                                    </Link>
                                </li>
                                <li>
                                    <Link to={"/"} className="dropdown-item">
                                        User
                                    </Link>
                                </li>
                               
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;
