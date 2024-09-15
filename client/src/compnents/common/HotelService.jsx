import React from 'react'
import { Container,Row,Col,Card} from 'react-bootstrap'
import { FaClock, FaCocktail, FaParking, FaTshirt, FaUtensils, FaWifi,FaSnowflake} from 'react-icons/fa'

 
const HotelService = () => {
  return (
    <>
    <Container className='mb-2' >
        <h1 title={"Our Services"}/>
        <Row>
<h4 className='text-center'>
    Services at <span className='hotel-color'>Luxe Haven </span>Resort
    <span className='gap-2'>
        <FaClock/>  - 24 Hour Front Desk
    </span>
</h4>
        </Row>
        <hr/>
<Row xs={1} md={2} lg={3} className='g-4 mt-2'>
    <Col>
    <Card>
     <Card.Body>
       <Card.Title className='hotel-color'>
        <FaWifi/>WiFi
        </Card.Title> 
        <Card.Text>
            Stay Connected with high-speed internet access
        </Card.Text>
        </Card.Body>   
    </Card>
    </Col>


    <Col>
    <Card>
     <Card.Body>
       <Card.Title className='hotel-color'>
        <FaUtensils/>Breakfast
        </Card.Title> 
        <Card.Text>
           Gte your breakfast 
        </Card.Text>
        </Card.Body>   
    </Card>
    </Col>



    <Col>
    <Card>
     <Card.Body>
       <Card.Title className='hotel-color'>
        <FaCocktail/>Mini-Bar
        </Card.Title> 
        <Card.Text>
           Gte your drinks
        </Card.Text>
        </Card.Body>   
    </Card>
    </Col>


    
    <Col>
    <Card>
     <Card.Body>
       <Card.Title className='hotel-color'>
        <FaTshirt   />Laundry
        </Card.Title> 
        <Card.Text>
      Keeps your clothes clean and fresh with our service
        </Card.Text>
        </Card.Body>   
    </Card>
    </Col>


    
    <Col>
    <Card>
     <Card.Body>
       <Card.Title className='hotel-color'>
        <FaParking  />Parking
        </Card.Title> 
        <Card.Text>
     Park your clothes
        </Card.Text>
        </Card.Body>   
    </Card>
    </Col>


    <Col>
    <Card>
     <Card.Body>
       <Card.Title className='hotel-color'>
        <FaSnowflake  />Air Conditioning
        </Card.Title> 
        <Card.Text>
 Stay cool and comfort
        </Card.Text>
        </Card.Body>   
    </Card>
    </Col>
</Row>
        </Container> 
    </>
  )
}

export default HotelService
