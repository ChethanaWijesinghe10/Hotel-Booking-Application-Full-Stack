/*import React from 'react'
import moment from 'moment'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom' 
import { Button } from 'react-bootstrap'

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const checkInDate = moment(booking.checkInDate)
	const checkOutDate = moment(booking.checkOutDate)
	const numberOfDays = checkOutDate.diff(checkInDate, "days")
	const [isBookingConfirmed, setIsBookingConfirmed] = useState(false)
	const [isProcessingPayment, setIsProcessingPayment] = useState(false)
	const navigate = useNavigate()

    
    const handleConfirmBooking = () => {
		setIsProcessingPayment(true)
		setTimeout(() => {
			setIsProcessingPayment(false)
			setIsBookingConfirmed(true)
			onConfirm()
		}, 3000)
	}


    useEffect(() => {
		if (isBookingConfirmed) {
			navigate("/booking-success")
		}
	}, [isBookingConfirmed, navigate])




  return (
    <div className='card card-body mt-5'>
     <h4 className="card-title hotel-color">Reservation Summary</h4>
				<p>
					Name: <strong>{booking.guestName}</strong>
				</p>
				<p>
					Email: <strong>{booking.guestEmail}</strong>
				</p>
				<p>
					Check-in Date: <strong>{moment(booking.checkInDate).format("MMM Do YYYY")}</strong>
				</p>
				<p>
					Check-out Date: <strong>{moment(booking.checkOutDate).format("MMM Do YYYY")}</strong>
				</p>
				<p>
					Number of Days Booked: <strong>{numberOfDays}</strong>
				</p>  

                <div>
                <h5 className="hotel-color">Number of Guest</h5>
					<strong>
						Adult{booking.noOfAdults > 1 ? "s" : ""} : {booking.noOfAdults}
					</strong>
					<strong>
						<p>Children : {booking.noOfChildren}</p>
					</strong> 
                    </div> 
                 
				{payment > 0 ? (
					<>
						<p>
							Total payment: <strong>${payment}</strong>
						</p>

						{isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Booking Confirmed, redirecting to payment...
									</>
								) : (
									"Confirm Booking & proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
					</>
				) : (
					<p className="text-danger">Check-out date must be after check-in date.</p>
				)}    
    </div>
  )
}

export default BookingSummary
*//*
import React from 'react';
import moment from 'moment';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, "days");

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  // Log check-in, check-out dates, and payment
  console.log("Check-in Date:", checkInDate.format("MMM Do YYYY"));
  console.log("Check-out Date:", checkOutDate.format("MMM Do YYYY"));
  console.log("Number of Days:", numberOfDays);
  console.log("Payment Value:", payment);

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4 className="card-title hotel-color">Reservation Summary</h4>
      <p>Name: <strong>{booking.guestName}</strong></p>
      <p>Email: <strong>{booking.guestEmail}</strong></p>
      <p>Check-in Date: <strong>{checkInDate.format("MMM Do YYYY")}</strong></p>
      <p>Check-out Date: <strong>{checkOutDate.format("MMM Do YYYY")}</strong></p>
      <p>Number of Days Booked: <strong>{numberOfDays}</strong></p>

      <div>
        <h5 className="hotel-color">Number of Guests</h5>
        <strong>Adult{booking.noOfAdults > 1 ? "s" : ""} : {booking.noOfAdults}</strong>
        <strong><p>Children : {booking.noOfChildren}</p></strong>
      </div>

      {payment > 0 && numberOfDays > 0 ? (
        <>
          <p>Total payment: <strong>${payment}</strong></p>

          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                  Booking Confirmed, redirecting to payment...
                </>
              ) : (
                "Confirm Booking & proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger">Check-out date must be after check-in date.</p>
      )}
    </div>
  );
};

export default BookingSummary;
*/


/*import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { bookRoom } from '../utils/ApiFunctions';
const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, 'days');

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
 */
/*const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };
*/
/*const handleConfirmBooking = async () => {
	setIsProcessingPayment(true);
	try {
		console.log('Booking Object:', booking);
	  const bookingResponse = await bookRoom(booking.id, booking);
	  if (bookingResponse) {
		navigate('/booking-success', { state: { message: 'Your booking was successful!' } });
	  }
	} catch (error) {
	  console.error("Error confirming booking:", error);
	  setIsProcessingPayment(false);
	  navigate('/booking-success', { state: { error: 'Failed to book room. Please try again later.' } });
	}
  };
  */
 
 
  /*const handleConfirmBooking = async () => {
  setIsProcessingPayment(true);
  try {
    console.log('Booking Object:', booking); // Debugging line to check the booking object
    if (!booking.id) {
      throw new Error("Booking ID is undefined");
    }
    const bookingResponse = await bookRoom(booking.id, booking);
    if (bookingResponse) {
      setIsBookingConfirmed(true);
      onConfirm();
    }
  } catch (error) {
    console.error("Error confirming booking:", error);
    setIsProcessingPayment(false);
  }
};

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate('/booking-success');
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4 className="card-title hotel-color">Reservation Summary</h4>
      <p>Name: <strong>{booking.guestName}</strong></p>
      <p>Email: <strong>{booking.guestEmail}</strong></p>
      <p>Check-in Date: <strong>{checkInDate.format('MMM Do YYYY')}</strong></p>
      <p>Check-out Date: <strong>{checkOutDate.format('MMM Do YYYY')}</strong></p>
      <p>Number of Days Booked: <strong>{numberOfDays}</strong></p>
      <p>Number of Adults: <strong>{booking.noOfAdults}</strong></p>
      <p>Number of Children: <strong>{booking.noOfChildren}</strong></p>

      {payment > 0 && numberOfDays > 0 ? (
        <>
          <p>Total payment: <strong>${payment}</strong></p>
          {isProcessingPayment ? (
            <p>Processing payment...</p>
          ) : (
            <Button
              onClick={handleConfirmBooking}
              className="btn btn-hotel"
              disabled={!isFormValid}
            >
              Confirm Booking
            </Button>
          )}
        </>
      ) : (
        <p className="text-danger">Check-out date must be after check-in date.</p>
      )}
    </div>
  );
};

export default BookingSummary;
*/
/*
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { bookRoom } from '../utils/ApiFunctions';

const BookingSummary = ({ booking = {}, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, 'days');

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);
    try {
      console.log('Booking Object:', booking); // Debugging line to check the booking object
      if (!booking.id) {
        throw new Error("Booking ID is undefined");
      }
      const bookingResponse = await bookRoom(booking.id, booking);
      if (bookingResponse) {
        setIsBookingConfirmed(true);
        onConfirm();
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      setIsProcessingPayment(false);
    }
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate('/booking-success');
    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4 className="card-title hotel-color">Reservation Summary</h4>
      <p>Name: <strong>{booking.guestName}</strong></p>
      <p>Email: <strong>{booking.guestEmail}</strong></p>
      <p>Check-in Date: <strong>{checkInDate.format('MMM Do YYYY')}</strong></p>
      <p>Check-out Date: <strong>{checkOutDate.format('MMM Do YYYY')}</strong></p>
      <p>Number of Days Booked: <strong>{numberOfDays}</strong></p>
      <p>Number of Adults: <strong>{booking.noOfAdults}</strong></p>
      <p>Number of Children: <strong>{booking.noOfChildren}</strong></p>

      {payment > 0 && numberOfDays > 0 ? (
        <>
          <p>Total payment: <strong>${payment}</strong></p>
          {isProcessingPayment ? (
            <p>Processing payment...</p>
          ) : (
            <Button
              onClick={handleConfirmBooking}
              className="btn btn-hotel"
              disabled={!isFormValid}
            >
              Confirm Booking
            </Button>
          )}
        </>
      ) : (
        <p className="text-danger">Check-out date must be after check-in date.</p>
      )}
    </div>
  );
};

export default BookingSummary;
*/
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { bookRoom } from '../utils/ApiFunctions';

const BookingSummary = ({ booking = {}, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numberOfDays = checkOutDate.diff(checkInDate, 'days');

  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    setIsProcessingPayment(true);
    try {
      console.log('Booking Object:', booking); // Debugging line to check the booking object
      if (!booking.id) {
        throw new Error("Booking ID is undefined");
      }
      const bookingResponse = await bookRoom(booking.id, booking);
      if (bookingResponse) {
        setIsBookingConfirmed(true);
        onConfirm();
      }
    } catch (error) {
      console.error("Error confirming booking:", error);
      setIsProcessingPayment(false);
    }
  };

  useEffect(() => {
    if (isBookingConfirmed) {
		console.log('Navigating to /booking-success');
      navigate('/booking-success');

    }
  }, [isBookingConfirmed, navigate]);

  return (
    <div className="card card-body mt-5">
      <h4 className="card-title hotel-color">Reservation Summary</h4>
      <p>Name: <strong>{booking.guestName}</strong></p>
      <p>Email: <strong>{booking.guestEmail}</strong></p>
      <p>Check-in Date: <strong>{checkInDate.format('MMM Do YYYY')}</strong></p>
      <p>Check-out Date: <strong>{checkOutDate.format('MMM Do YYYY')}</strong></p>
      <p>Number of Days Booked: <strong>{numberOfDays}</strong></p>
      <p>Number of Adults: <strong>{booking.noOfAdults}</strong></p>
      <p>Number of Children: <strong>{booking.noOfChildren}</strong></p>

      {payment > 0 && numberOfDays > 0 ? (
        <>
          <p>Total payment: <strong>${payment}</strong></p>
         
		  {isFormValid && !isBookingConfirmed ? (
							<Button variant="success" onClick={handleConfirmBooking}>
								{isProcessingPayment ? (
									<>
										<span
											className="spinner-border spinner-border-sm mr-2"
											role="status"
											aria-hidden="true"></span>
										Booking Confirmed, redirecting to payment...
									</>
								) : (
									"Confirm Booking & proceed to payment"
								)}
							</Button>
						) : isBookingConfirmed ? (
							<div className="d-flex justify-content-center align-items-center">
								<div className="spinner-border text-primary" role="status">
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						) : null}
        </>
      ) : (
        <p className="text-danger">Check-out date must be after check-in date.</p>
      )}
    </div>
  );
};

export default BookingSummary;
