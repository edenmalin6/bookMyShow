import storageService from "../services/storageService";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const bookings = storageService.getBookings();
  const navigate = useNavigate();

  const goBackBtn = () => {
    navigate(-1);
  };
  console.log(bookings);
  return (
    <div className="history-page">
      <h1>Your Booking History</h1>
      <button onClick={goBackBtn}>Back To Movies</button>
      {bookings.map((booking) => (
        <div className="booking-container" key={booking.id}>
          <p>Movie Title: {booking.movieTitle}</p>
          <p>Screening Time: {booking.selectedTime}</p>
          <p>Tickets Amount: {booking.ticketsAmount}</p>
          <p>Total Price: {booking.totalPrice}</p>
        </div>
      ))}
    </div>
  );
};

export default HistoryPage;
