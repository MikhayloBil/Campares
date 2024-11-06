import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCamperDetails } from "../../redux/operations";
import PropTypes from "prop-types";

function CampersDetails({ id }) {
  const dispatch = useDispatch();
  const camperDetails = useSelector((state) => state.campers.camperDetails);
  const [bookingData, setBookingData] = useState({ name: "", date: "" });
  const [successMessage, setSuccessMessage] = useState("");

  const handleBooking = (e) => {
    e.preventDefault();
    setSuccessMessage("Booking successful!");
  };

  useEffect(() => {
    dispatch(fetchCamperDetails(id));
  }, [id, dispatch]);

  return camperDetails ? (
    <div>
      <h2>{camperDetails.name}</h2>
      <h3>Reviews</h3>
      {camperDetails.reviews.map((review) => (
        <div key={review.id}>
          <p>{review.comment}</p>
          <p>Rating: {"★".repeat(review.rating)}</p>
        </div>
      ))}

      <h3>Book this Camper</h3>
      <form onSubmit={handleBooking}>
        <input
          type="text"
          value={bookingData.name}
          onChange={(e) =>
            setBookingData({ ...bookingData, name: e.target.value })
          }
          placeholder="Your Name"
          required
        />
        <input
          type="date"
          value={bookingData.date}
          onChange={(e) =>
            setBookingData({ ...bookingData, date: e.target.value })
          }
          required
        />
        <button type="submit">Book Now</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
    </div>
  ) : null;
}
CampersDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CampersDetails;
