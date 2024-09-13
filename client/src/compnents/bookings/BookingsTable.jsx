

/*import React, { useState, useEffect } from 'react';
import { parseISO } from "date-fns";
import DateSlider from '../common/DateSlider';

const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState([]);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    console.log("Booking Info:", bookingInfo);
    setFilteredBookings(bookingInfo || []);
  }, [bookingInfo]);
  
  
  return (
    <section className="p-4">
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>Booking ID</th>
            
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guests</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <tr key={booking?.id || index}>
                <td>{index + 1}</td>
                
               
                <td>{booking?.room?.id || 'N/A'}</td>
<td>{booking?.room?.roomType || 'N/A'}</td>

                <td>{booking?.checkInDate || 'N/A'}</td>
                <td>{booking?.checkOutDate || 'N/A'}</td>
                <td>{booking?.guestName || 'N/A'}</td>
                <td>{booking?.guestEmail || 'N/A'}</td>
                <td>{booking?.noOfAdults || 'N/A'}</td>
                <td>{booking?.noOfChildren || 'N/A'}</td>
                <td>{(booking?.noOfAdults || 0) + (booking?.noOfChildren || 0)}</td>

                <td>{booking?.bookingConfirmationCode || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => booking?.id && handleBookingCancellation(booking.id)}
                    disabled={!booking?.id}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No bookings found for the selected dates</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default BookingsTable;*/
import React, { useState, useEffect } from 'react';
import { parseISO } from "date-fns";
import DateSlider from '../common/DateSlider';
import { cancelBooking } from '../utils/ApiFunctions';
const BookingsTable = ({ bookingInfo, handleBookingCancellation }) => {
  const [filteredBookings, setFilteredBookings] = useState([]);

  const filterBookings = (startDate, endDate) => {
    let filtered = bookingInfo;
    if (startDate && endDate) {
      filtered = bookingInfo.filter((booking) => {
        const bookingStartDate = parseISO(booking.checkInDate);
        const bookingEndDate = parseISO(booking.checkOutDate);
        return (
          bookingStartDate >= startDate &&
          bookingEndDate <= endDate &&
          bookingEndDate > startDate
        );
      });
    }
    setFilteredBookings(filtered);
  };

  useEffect(() => {
    console.log("Booking Info:", bookingInfo);
    setFilteredBookings(bookingInfo || []);
  }, [bookingInfo]);

  return (
    <section className="p-4">
      <DateSlider onDateChange={filterBookings} onFilterChange={filterBookings} />
      <table className="table table-bordered table-hover shadow">
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Room ID</th>
            <th>Room Type</th>
            <th>Check-In Date</th>
            <th>Check-Out Date</th>
            <th>Guest Name</th>
            <th>Guest Email</th>
            <th>Adults</th>
            <th>Children</th>
            <th>Total Guests</th>
            <th>Confirmation Code</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking, index) => (
              <tr key={booking?.id || index}>
                <td>{index + 1}</td>
                <td>{booking?.room?.id || 'N/A'}</td>
               
                <td>{booking?.room?.roomType || 'N/A'}</td>
                <td>{booking?.checkInDate || 'N/A'}</td>
                <td>{booking?.checkOutDate || 'N/A'}</td>
                <td>{booking?.guestName || 'N/A'}</td>
                <td>{booking?.guestEmail || 'N/A'}</td>
                <td>{booking?.noOfAdults || 'N/A'}</td>
                <td>{booking?.noOfChildren || 'N/A'}</td>
                <td>{(booking?.noOfAdults || 0) + (booking?.noOfChildren || 0)}</td>
                <td>{booking?.bookingConfirmationCode || 'N/A'}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => booking?.id && handleBookingCancellation(booking.id)}
             
                  >
                    Cancel
                  </button>


                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="13">No bookings found for the selected dates</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
};

export default BookingsTable;
