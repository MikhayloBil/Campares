import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchCamperById } from "../../redux/services";
import css from "./CampersDetails.module.css";

function CamperDetails() {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCamperById(id);
        setCamper(data);
      } catch (error) {
        console.error("Error fetching camper details:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!camper) return <p>Loading...</p>;

  return (
    <div>
      <section>
        <h1>{camper.name}</h1>
        <p>Price: {camper.price}</p>
        <p>Average Rating: {camper.rating}</p>
        <p>Location: {camper.location}</p>
        {camper.gallery && camper.gallery.length > 0 && (
          <div className={css.gallery}>
            {camper.gallery.map((photo, index) => (
              <img
                className={css.img}
                key={index}
                src={photo.thumb}
                alt={`${camper.name} ${index + 1}`}
              />
            ))}
          </div>
        )}
        <p>Description: {camper.description}</p>
      </section>
      <section>
        <h2>Features</h2>
        {/* Перелік особливостей */}
      </section>
      <section>
        <h2>Reviews</h2>
        {/* Відгуки */}
      </section>
      <section>
        <h2>Vehicle Details</h2>
        <p>Length: {camper.length} m</p>
        <p>Width: {camper.width} m</p>
        <p>Height: {camper.height} m</p>
        <p>Tank Capacity: {camper.tank} L</p>
        <p>Consumption: {camper.consumption} L/100km</p>
      </section>
      <section>
        <h2>Booking Form</h2>
        <form>
          <label>
            Name*:
            <input type="text" name="name" required />
          </label>
          <label>
            Email*:
            <input type="email" name="email" required />
          </label>
          <label>
            Booking Date*:
            <input type="date" name="date" required />
          </label>
          <label>
            Comment:
            <textarea name="comment" />
          </label>
          <button type="submit">Send</button>
        </form>
      </section>
    </div>
  );
}

export default CamperDetails;
