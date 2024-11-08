import { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Імпортуйте PropTypes для валідації
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { setFilters } from "../../redux/slice";
import CamperCard from "../CamperCard/CamperCard";
import { CiMap } from "react-icons/ci";
import { BsDiagram3, BsFuelPump, BsCupHot } from "react-icons/bs";
import { LuWind } from "react-icons/lu";
import css from "./CamperCatalog.module.css";

function CamperCatalog({ camper = {} }) {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list);
  const filters = useSelector((state) => state.campers.filters);
  const [visibleCampers, setVisibleCampers] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (newFilters) => {
    setVisibleCampers(4);
    dispatch(setFilters(newFilters));
  };

  const handleLoadMore = () => {
    setVisibleCampers((prevVisible) => prevVisible + 4);
  };

  return (
    <div className={css.content}>
      <div className={css.filters}>
        <div className={css.filterLabel}>Location</div>
        <div className={css.inputWrapper}>
          <CiMap className={css.camperLocationIcon} />
          <input
            className={css.input}
            type="text"
            placeholder="Kyiv, Ukraine"
            value={filters.location || ""}
            onChange={(e) =>
              handleFilterChange({ ...filters, location: e.target.value })
            }
          />
        </div>

        <p className={css.camperP}>Filters</p>
        <div className={css.camperFeatures}>
          {camper.transmission && (
            <p className={css.camperFeaturesP}>
              <BsDiagram3 /> {camper.transmission}
            </p>
          )}
          {camper.engine && (
            <p className={css.camperFeaturesP}>
              <BsFuelPump /> {camper.engine}
            </p>
          )}
          {camper.kitchen && (
            <p className={css.camperFeaturesP}>
              <BsCupHot /> Kitchen
            </p>
          )}
          {camper.ac && (
            <p className={css.camperFeaturesP}>
              <LuWind /> AC
            </p>
          )}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={filters.AC || false}
              onChange={(e) =>
                handleFilterChange({ ...filters, AC: e.target.checked })
              }
            />
            AC
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.kitchen || false}
              onChange={(e) =>
                handleFilterChange({ ...filters, kitchen: e.target.checked })
              }
            />
            Kitchen
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.bathroom || false}
              onChange={(e) =>
                handleFilterChange({ ...filters, bathroom: e.target.checked })
              }
            />
            Bathroom
          </label>
        </div>
      </div>

      <div className={css.camperGrid}>
        {Array.isArray(campers) && campers.length > 0 ? (
          campers
            .slice(0, visibleCampers)
            .map((camper) => <CamperCard key={camper.id} camper={camper} />)
        ) : (
          <p>No campers available.</p>
        )}

        {visibleCampers < campers.length && (
          <button className={css.camperButton} onClick={handleLoadMore}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
}

// Визначте propTypes для валідації
CamperCatalog.propTypes = {
  camper: PropTypes.shape({
    transmission: PropTypes.string,
    engine: PropTypes.string,
    kitchen: PropTypes.bool,
    ac: PropTypes.bool,
  }),
};

export default CamperCatalog;
