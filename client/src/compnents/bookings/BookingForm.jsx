/*import React from 'react'
import { useState,useEffect } from 'react'
import moment from 'moment'
import { bookRoom } from '../utils/ApiFunctions'
import { useParams,useNavigate } from 'react-router-dom'
import { Form,FormControl } from 'react-bootstrap'
import BookingSummary from './BookingSummary'
const BookingForm = () => {

    const [validated, setValidated] = useState(false)
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [errorMessage, setErrorMessage] = useState("")
	const [roomPrice, setRoomPrice] = useState(0)
   const [booking,setBooking]=useState({
    guestName:"",
    guestEmail:"",
    checkInDate:"",
    checkOutDate:"",
    noOfAdults:"",
    noOfChildren:"",

   })
    const handleInputChange = (e) => {
		const { name, value } = e.target
		setBooking({ ...booking, [name]: value })
		setErrorMessage("")
	}

  const[roomInfo,setRoomInfo]=useState({
    photo:"",
    roomType:"",
    roomPrice:""
  })

  const { id } = useParams()
  const navigate = useNavigate()

  const getRoomPriceById = async (id) => {
    try {
        const response = await getRoomById(id)
        setRoomPrice(response.roomPrice)
    } catch (error) {
        throw new Error(error)
    }
}


useEffect(() => {
    getRoomPriceById(id)
}, [id])

const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate)
    const checkOutDate = moment(booking.checkOutDate)
    const diffInDays = checkOutDate.diff(checkInDate, "days")
    const paymentPerDay = roomPrice ? roomPrice : 0
    return diffInDays * paymentPerDay
}  


const isGuestCountValid = () => {
    const adultCount = parseInt(booking.noOfAdults)
    const childrenCount = parseInt(booking.noOfChildren)
    const totalCount = adultCount + childrenCount
    return totalCount >= 1 && adultCount >= 1
}



const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
        setErrorMessage("Check-out date must be after check-in date")
        return false
    } else {
        setErrorMessage("")
        return true
    }
}


const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
        e.stopPropagation()
    } else {
        setIsSubmitted(true)
    }
    setValidated(true)
}


const handleBooking=async ()=>{
    try{
const bookingConfirmationCode=await bookRoom(id,booking)
setIsSubmitted(true)
navigate(`/booking-success`,{state:{message:bookingConfirmationCode}})
    }catch(error){
        setErrorMessage(error.message)
    }
        navigate("/",{state:{error:errorMessage}})
       
}


    return (
    <>
    <div className="container mb-5">
				<div className="row">
					<div className="col-md-6">
						<div className="card card-body mt-5">
							<h4 className="card-title">Reserve Room</h4>

							<Form noValidate validated={validated} onSubmit={handleSubmit}>
								<Form.Group>
									<Form.Label htmlFor="guestName" className="hotel-color">
										Fullname
									</Form.Label>
									<FormControl
										required
										type="text"
										id="guestName"
										name="guestName"
										value={booking.guestName}
										placeholder="Enter your fullname"
										onChange={handleInputChange}
									/>
									<Form.Control.Feedback type="invalid">
										Please enter your fullname.
									</Form.Control.Feedback>
								</Form.Group>

								<Form.Group>
									<Form.Label htmlFor="guestEmail" className="hotel-color">
										Email
									</Form.Label>
									<FormControl
										required
										type="email"
										id="guestEmail"
										name="guestEmail"
										value={booking.guestEmail}
										placeholder="Enter your email"
										onChange={handleInputChange}
										//disabled
									/>
									<Form.Control.Feedback type="invalid">
										Please enter a valid email address.
									</Form.Control.Feedback>
								</Form.Group>

								<fieldset style={{ border: "2px" }}>
									<legend>Lodging Period</legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="checkInDate" className="hotel-color">
												Check-in date
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkInDate"
												name="checkInDate"
												value={booking.checkInDate}
												placeholder="check-in-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select a check in date.
											</Form.Control.Feedback>
										</div>

										<div className="col-6">
											<Form.Label htmlFor="checkOutDate" className="hotel-color">
												Check-out date
											</Form.Label>
											<FormControl
												required
												type="date"
												id="checkOutDate"
												name="checkOutDate"
												value={booking.checkOutDate}
												placeholder="check-out-date"
												min={moment().format("MMM Do, YYYY")}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select a check out date.
											</Form.Control.Feedback>
										</div>
										{errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
									</div>
								</fieldset>

								<fieldset style={{ border: "2px" }}>
									<legend>Number of Guest</legend>
									<div className="row">
										<div className="col-6">
											<Form.Label htmlFor="noOfAdults" className="hotel-color">
												Adults
											</Form.Label>
											<FormControl
												required
												type="number"
												id="noOfAdults"
												name="noOfAdults"
												value={booking.noOfAdults}
												min={1}
												placeholder="0"
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Please select at least 1 adult.
											</Form.Control.Feedback>
										</div>
										<div className="col-6">
											<Form.Label htmlFor="noOfChildren" className="hotel-color">
												Children
											</Form.Label>
											<FormControl
												required
												type="number"
												id="noOfChildren"
												name="noOfChildren"
												value={booking.noOfChildren}
												placeholder="0"
												min={0}
												onChange={handleInputChange}
											/>
											<Form.Control.Feedback type="invalid">
												Select 0 if no children
											</Form.Control.Feedback>
										</div>
									</div>
								</fieldset>

								<div className="fom-group mt-2 mb-2">
									<button type="submit" className="btn btn-hotel">
										Continue
									</button>
								</div>
							</Form>
						</div>
					</div>

					<div className="col-md-4">
						{isSubmitted && (
							<BookingSummary
								booking={booking}
								payment={calculatePayment()}
								onConfirm={handleBooking}
								isFormValid={validated}
							/>
						)}
					</div>
				</div>
			</div>
      
    </>
  )
}

export default BookingForm
*/
/*
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestName: '',
    guestEmail: '',
    checkInDate: '',
    checkOutDate: '',
    noOfAdults: '',
    noOfChildren: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage('');
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const getRoomPriceById = async (id) => {
    try {
      const response = await getRoomById(id);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      throw new Error(error);
    }
  };

  useEffect(() => {
    getRoomPriceById(id);
  }, [id]);

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const paymentPerDay = roomPrice || 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.noOfAdults);
    const childrenCount = parseInt(booking.noOfChildren);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage('Check-out date must be after check-in date');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleBooking = async () => {
    try {
      const bookingConfirmationCode = await bookRoom(id, booking);
      setIsSubmitted(true);
      navigate(`/booking-success`, { state: { message: bookingConfirmationCode } });
    } catch (error) {
      setErrorMessage(error.message);
      navigate('/', { state: { error: errorMessage } });
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4 className="card-title">Reserve Room</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestName" className="hotel-color">
                  Fullname
                </Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={booking.guestName}
                  placeholder="Enter your fullname"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your fullname.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail" className="hotel-color">
                  Email
                </Form.Label>
                <FormControl
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset style={{ border: '2px' }}>
                <legend>Lodging Period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="checkInDate" className="hotel-color">
                      Check-in date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-in date.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="checkOutDate" className="hotel-color">
                      Check-out date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-out date.
                    </Form.Control.Feedback>
                  </div>
                  {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                </div>
              </fieldset>

              <fieldset style={{ border: '2px' }}>
                <legend>Number of Guests</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="noOfAdults" className="hotel-color">
                      Adults
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="noOfAdults"
                      name="noOfAdults"
                      value={booking.noOfAdults}
                      min={1}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select at least 1 adult.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="noOfChildren" className="hotel-color">
                      Children
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="noOfChildren"
                      name="noOfChildren"
                      value={booking.noOfChildren}
                      min={0}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Select 0 if no children.
                    </Form.Control.Feedback>
                  </div>
                </div>
              </fieldset>

              <div className="form-group mt-2 mb-2">
                <button type="submit" className="btn btn-hotel">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-md-4">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleBooking}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
*//*
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestName: '',
    guestEmail: '',
    checkInDate: '',
    checkOutDate: '',
    noOfAdults: '',
    noOfChildren: '',
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomPrice = async () => {
      try {
        const response = await getRoomById(id);
        setRoomPrice(response.roomPrice);
      } catch (error) {
        console.error("Error fetching room price:", error);
      }
    };
    fetchRoomPrice();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking(prevBooking => ({ ...prevBooking, [name]: value }));
    setErrorMessage('');
  };

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const paymentPerDay = roomPrice || 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.noOfAdults, 10);
    const childrenCount = parseInt(booking.noOfChildren, 10);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage('Check-out date must be after check-in date');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleBooking = async () => {
    try {
      const bookingConfirmationCode = await bookRoom(id, booking);
      setIsSubmitted(true);
      navigate(`/booking-success`, { state: { message: bookingConfirmationCode } });
    } catch (error) {
      console.error("Error booking room:", error);
      setErrorMessage(error.message);
      navigate('/', { state: { error: error.message } });
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4 className="card-title">Reserve Room</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestName" className="hotel-color">
                  Fullname
                </Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={booking.guestName}
                  placeholder="Enter your fullname"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your fullname.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail" className="hotel-color">
                  Email
                </Form.Label>
                <FormControl
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset style={{ border: '2px' }}>
                <legend>Lodging Period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="checkInDate" className="hotel-color">
                      Check-in date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-in date.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="checkOutDate" className="hotel-color">
                      Check-out date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-out date.
                    </Form.Control.Feedback>
                  </div>
                  {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                </div>
              </fieldset>

              <fieldset style={{ border: '2px' }}>
                <legend>Number of Guests</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="noOfAdults" className="hotel-color">
                      Adults
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="noOfAdults"
                      name="noOfAdults"
                      value={booking.noOfAdults}
                      min={1}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select at least 1 adult.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="noOfChildren" className="hotel-color">
                      Children
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="noOfChildren"
                      name="noOfChildren"
                      value={booking.noOfChildren}
                      min={0}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Select 0 if no children.
                    </Form.Control.Feedback>
                  </div>
                </div>
              </fieldset>

              <div className="form-group mt-2 mb-2">
                <button type="submit" className="btn btn-hotel">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-md-4">
          {isSubmitted && (
            <BookingSummary
              booking={booking}
              payment={calculatePayment()}
              onConfirm={handleBooking}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
*/
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { bookRoom, getRoomById } from '../utils/ApiFunctions';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, FormControl } from 'react-bootstrap';
import BookingSummary from './BookingSummary';

const BookingForm = () => {
  const [validated, setValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roomPrice, setRoomPrice] = useState(0);
  const [booking, setBooking] = useState({
    guestName: '',
    guestEmail: '',
    checkInDate: '',
    checkOutDate: '',
    noOfAdults: '',
    noOfChildren: '',
  });

  const { id } = useParams();  // Room ID from URL params
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomPrice = async () => {
      try {
        const response = await getRoomById(id);
        if (response) {
          setRoomPrice(response.roomPrice);
          // Optionally set booking ID here if needed
        }
      } catch (error) {
        console.error("Error fetching room price:", error);
      }
    };
    fetchRoomPrice();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking(prevBooking => ({ ...prevBooking, [name]: value }));
    setErrorMessage('');
  };

  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, 'days');
    const paymentPerDay = roomPrice || 0;
    return diffInDays * paymentPerDay;
  };

  const isGuestCountValid = () => {
    const adultCount = parseInt(booking.noOfAdults, 10);
    const childrenCount = parseInt(booking.noOfChildren, 10);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  const isCheckOutDateValid = () => {
    if (!moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))) {
      setErrorMessage('Check-out date must be after check-in date');
      return false;
    } else {
      setErrorMessage('');
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false || !isGuestCountValid() || !isCheckOutDateValid()) {
      e.stopPropagation();
    } else {
      setIsSubmitted(true);
    }
    setValidated(true);
  };

  const handleBooking = async () => {
    try {
      const bookingConfirmationCode = await bookRoom(id, booking);  // Ensure id and booking are correct
      setIsSubmitted(true);
      navigate(`/booking-success`, { state: { message: bookingConfirmationCode } });
    } catch (error) {
      console.error("Error booking room:", error);
      setErrorMessage(error.message);
      navigate('/', { state: { error: error.message } });
    }
  };

  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-md-6">
          <div className="card card-body mt-5">
            <h4 className="card-title">Reserve Room</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="guestName" className="hotel-color">
                  Fullname
                </Form.Label>
                <FormControl
                  required
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={booking.guestName}
                  placeholder="Enter your fullname"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter your fullname.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="guestEmail" className="hotel-color">
                  Email
                </Form.Label>
                <FormControl
                  required
                  type="email"
                  id="guestEmail"
                  name="guestEmail"
                  value={booking.guestEmail}
                  placeholder="Enter your email"
                  onChange={handleInputChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <fieldset style={{ border: '2px' }}>
                <legend>Lodging Period</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="checkInDate" className="hotel-color">
                      Check-in date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkInDate"
                      name="checkInDate"
                      value={booking.checkInDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-in date.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="checkOutDate" className="hotel-color">
                      Check-out date
                    </Form.Label>
                    <FormControl
                      required
                      type="date"
                      id="checkOutDate"
                      name="checkOutDate"
                      value={booking.checkOutDate}
                      min={moment().format('YYYY-MM-DD')}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select a check-out date.
                    </Form.Control.Feedback>
                  </div>
                  {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
                </div>
              </fieldset>

              <fieldset style={{ border: '2px' }}>
                <legend>Number of Guests</legend>
                <div className="row">
                  <div className="col-6">
                    <Form.Label htmlFor="noOfAdults" className="hotel-color">
                      Adults
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="noOfAdults"
                      name="noOfAdults"
                      value={booking.noOfAdults}
                      min={1}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please select at least 1 adult.
                    </Form.Control.Feedback>
                  </div>
                  <div className="col-6">
                    <Form.Label htmlFor="noOfChildren" className="hotel-color">
                      Children
                    </Form.Label>
                    <FormControl
                      required
                      type="number"
                      id="noOfChildren"
                      name="noOfChildren"
                      value={booking.noOfChildren}
                      min={0}
                      onChange={handleInputChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Select 0 if no children.
                    </Form.Control.Feedback>
                  </div>
                </div>
              </fieldset>

              <div className="form-group mt-2 mb-2">
                <button type="submit" className="btn btn-hotel">
                  Continue
                </button>
              </div>
            </Form>
          </div>
        </div>

        <div className="col-md-4">
          {isSubmitted && (
            <BookingSummary
              booking={{ ...booking, id }}  // Pass booking ID if needed
              payment={calculatePayment()}
              onConfirm={handleBooking}
              isFormValid={validated}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
