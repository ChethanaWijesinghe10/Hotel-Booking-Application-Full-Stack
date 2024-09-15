import React from 'react'
import { Container } from 'react-bootstrap'

const Parallax = () => {
  return (
    <div className='parallax mb-5'>
      <Container className='text-center px-5 py-5 justify-content-center'>
        <div className='animated-texts bounceIn'>
        <h1>Welcome to <span className='hotel-color'>Luxe Haven Resort</span></h1>
    <h3>Experience unparalleled luxury at Luxe Haven Resort, where sophisticated comfort meets breathtaking natural beauty. Enjoy spacious rooms with modern amenities, exquisite dining options, and a serene spa and wellness center. </h3>
        </div>
      </Container>
    </div>
  )
}

export default Parallax
