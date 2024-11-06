import { useNavigate } from "react-router-dom";
import css from "./Home.module.css";

function HomePage() {
  const navigate = useNavigate();

  const handleViewNowClick = () => {
    navigate("/catalog");
  };

  return (
    <div className={css.container}>
      <div className={css.context}>
        <h1 className={css.h1}>Campers of your dreams</h1>
        <h2 className={css.h2}>
          You can find everything you want in our catalog
        </h2>
        <button className={css.button} onClick={handleViewNowClick}>
          View Now
        </button>
      </div>
    </div>
  );
}

export default HomePage;
