import dbMovies from "../data/moviesData";
import { v4 as uuid4 } from "uuid";
import storageService from "../services/storageService";
import { useNavigate } from "react-router-dom";

const MovieDetails = ({ movie, setMovies }) => {
  const [selectedTime, setSelectedTime] = useState("");
  const [ticketsAmount, setTicketsAmount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const TICKET_PRICE = 10;

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setTotalPrice(10);
    setTicketsAmount(1);
  };
  const handleAddTicket = (e) => {
    const numOfTickets = +e.target.value;
    setTicketsAmount(numOfTickets);
    setTotalPrice(numOfTickets * TICKET_PRICE);
  };
  const handleBooking = (e) => {
    e.preventDefault();

    const newBooking = {
      id: uuid4(),
      movieTitle: movie.title,
      selectedTime,
      ticketsAmount,
      totalPrice,
    };
    storageService.saveBooking(newBooking);
    const updatedBookingsList = storageService.getBookings()
    setMovies(updatedBookingsList)
    navigate("/history");
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Intl.DateTimeFormat("en-US", options).format(
      new Date(dateString)
    );
  };

  return (
    <div className="movie-container">
      <h2>{movie.title}</h2>
      <p>Description: {movie.description}</p>
      <p>Duration: {movie.duration}</p>
      <p>Rating: {movie.rating}</p>
      <h3>Showtimes: </h3>
      <ul>
        {movie.showtimes.map((time, index) => (
          <li key={index} onClick={()=>handleTimeSelect(time)}>
            {formatDate(time)}
          </li>
        ))}
      </ul>
     {selectedTime && ( 
     <form onSubmit={handleBooking} className="booking-container"> 
        <label>Number Of Tickets: 
        <input
          type="number"
          value={ticketsAmount}
          onChange={handleAddTicket}
          min={1}
          required
        ></input>
        </label>
        <p>Total Price: {totalPrice}</p>
        <button>Confirm Booking</button>
      </form> )} 
    </div>
  );
};

export default MovieDetails;
