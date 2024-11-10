import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { setFilters } from "../../redux/slice";
import CamperCard from "../CamperCard/CamperCard";
import { CiMap } from "react-icons/ci";
import {
  BsDiagram3,
  BsGrid1X2,
  BsCupHot,
  BsTv,
  BsGrid,
  BsGrid3X3Gap,
} from "react-icons/bs";
import { LuWind } from "react-icons/lu";
import { PiShower } from "react-icons/pi";
import css from "./CamperCatalog.module.css";

function CamperCatalog() {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list);
  const filters = useSelector((state) => state.campers.filters);
  const [visibleCampers, setVisibleCampers] = useState(4);

  // Локальний стан для фільтрів
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [filters, dispatch]);

  const handleFilterChange = (key, value) => {
    setLocalFilters((prevFilters) => ({ ...prevFilters, [key]: value }));
  };

  const handleSearch = () => {
    dispatch(setFilters(localFilters)); // Оновлюємо фільтри в Redux
    setVisibleCampers(4); // Скидаємо кількість видимих елементів
  };

  const handleLoadMore = () => {
    setVisibleCampers((prevVisible) => prevVisible + 4);
  };

  const vehicleFeatures = [
    { name: "AC", icon: <LuWind />, key: "ac" },
    { name: "Automatic", icon: <BsDiagram3 />, key: "transmission" },
    { name: "Kitchen", icon: <BsCupHot />, key: "kitchen" },
    { name: "Bathroom", icon: <PiShower />, key: "bathroom" },
    { name: "TV", icon: <BsTv />, key: "tv" },
  ];

  const vehicleTypes = [
    { name: "Van", icon: <BsGrid1X2 />, key: "van" },
    { name: "Fully Integrated", icon: <BsGrid />, key: "fullyIntegrated" },
    { name: "Alcove", icon: <BsGrid3X3Gap />, key: "alcove" },
  ];

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
            value={localFilters.location || ""}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          />
        </div>

        <p className={css.camperP}>Filters</p>

        {/* Vehicle Equipment */}
        <div className={css.camperFeatures}>
          <h3 className={css.camperFeaturesH}>Vehicle equipment</h3>
          <div className={css.featuresGrid}>
            {vehicleFeatures.map((feature) => (
              <button
                key={feature.key}
                className={`${css.featureButton} ${
                  localFilters[feature.key] ? css.active : ""
                }`}
                onClick={() =>
                  handleFilterChange(feature.key, !localFilters[feature.key])
                }
              >
                {feature.icon} {feature.name}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle Type */}
        <div className={css.camperFeatures}>
          <h3 className={css.camperFeaturesH}>Vehicle type</h3>
          <div className={css.featuresGrid}>
            {vehicleTypes.map((feature) => (
              <button
                key={feature.key}
                className={`${css.featureButton} ${
                  localFilters[feature.key] ? css.active : ""
                }`}
                onClick={() =>
                  handleFilterChange(feature.key, !localFilters[feature.key])
                }
              >
                {feature.icon} {feature.name}
              </button>
            ))}
          </div>
        </div>

        {/* Кнопка пошуку */}
        <button className={css.searchButton} onClick={handleSearch}>
          Search
        </button>
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

export default CamperCatalog;
