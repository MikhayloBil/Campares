import PropTypes from "prop-types";
import { CiMap } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { BsDiagram3 } from "react-icons/bs";
import { BsCupHot } from "react-icons/bs";
import css from "./CamperCard.module.css";
import { BsFuelPump } from "react-icons/bs";
import { LuWind } from "react-icons/lu";

function CamperCard({ camper }) {
  const handleShowMore = () => {
    window.open(`/catalog/${camper.id}`, "_blank");
  };

  return (
    <div className={css.camperCard}>
      {/* Відображення головного фото з галереї */}
      {camper.gallery && camper.gallery.length > 0 && (
        <img
          src={camper.gallery[0].thumb}
          alt={camper.name}
          className={css.camperImage}
        />
      )}
      <div className={css.camperContent}>
        {/* Назва та ціна */}
        <div className={css.camperName}>
          <h3>{camper.name}</h3>
          <p>Price: ${parseFloat(camper.price).toFixed(2)}</p>
        </div>

        {/* Локація та рейтинг */}
        <div className={css.camperLocation}>
          <div>
            <FaStar className={css.camperReviewsIcon} /> {camper.rating} (
            <span> {camper.reviews.length} Reviews)</span>
          </div>
          <div>
            <CiMap className={css.camperLocationIcon} />
            <span>{camper.location}</span>
          </div>
        </div>

        {/* Опис */}
        <p className={css.camperDescription}>{camper.description}</p>

        {/* Основні характеристики з іконками */}
        <div className={css.camperFeatures}>
          <p className={css.camperFeaturesP}>
            <BsDiagram3 /> {camper.transmission}
          </p>
          <p className={css.camperFeaturesP}>
            <BsFuelPump /> {camper.engine}
          </p>
          {camper.kitchen && (
            <p className={css.camperFeaturesP}>
              <BsCupHot /> Kitchen
            </p>
          )}
          <p className={css.camperFeaturesP}>
            <LuWind />
            AC
          </p>
        </div>

        {/* Кнопка для відкриття детальної інформації */}
        <button className={css.camperButton} onClick={handleShowMore}>
          Show more
        </button>
      </div>
    </div>
  );
}

CamperCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    location: PropTypes.string,
    rating: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        reviewer_name: PropTypes.string,
        reviewer_rating: PropTypes.number,
        comment: PropTypes.string,
      })
    ),
    description: PropTypes.string,
    transmission: PropTypes.string,
    engine: PropTypes.string,
    kitchen: PropTypes.bool,
    AC: PropTypes.bool,
    gallery: PropTypes.arrayOf(
      PropTypes.shape({
        thumb: PropTypes.string,
        original: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default CamperCard;
