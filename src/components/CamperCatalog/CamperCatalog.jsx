import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCampers } from "../../redux/operations";
import { setFilters } from "../../redux/slice";
import CamperCard from "../CamperCard/CamperCard";

function CamperCatalog() {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list);
  const filters = useSelector((state) => state.campers.filters);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCampers({ ...filters, page: currentPage }));
  }, [filters, currentPage, dispatch]);

  const handleFilterChange = (newFilters) => {
    setCurrentPage(1); // Скидаємо сторінку при зміні фільтра
    dispatch(setFilters(newFilters));
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {/* Фільтри для пошуку кемперів */}
      <div>
        <input
          type="text"
          placeholder="Search by name"
          onChange={(e) =>
            handleFilterChange({ ...filters, name: e.target.value })
          }
        />
        {/* Додайте інші фільтри, як-от вибір локації або тип кемпера */}
      </div>

      {/* Відображення кемперів */}
      <div>
        {Array.isArray(campers) && campers.length > 0 ? (
          campers.map((camper) => (
            <CamperCard key={camper.id} camper={camper} />
          ))
        ) : (
          <p>No campers available.</p>
        )}
      </div>

      {/* Кнопка для завантаження більше кемперів */}
      <button onClick={handleLoadMore}>Load More</button>
    </div>
  );
}

export default CamperCatalog;
