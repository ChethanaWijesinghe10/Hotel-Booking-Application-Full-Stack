
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
      console.log('Booking Object:', booking); 
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
      <p>Total Number of Guests: <strong>{parseInt(booking.noOfAdults || 0) + parseInt(booking.noOfChildren || 0)}</strong></p>


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
