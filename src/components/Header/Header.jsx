import { Link, useLocation } from "react-router-dom";
import css from "./Header.module.css";
import logo from "../../assets/Logo.svg";

const Header = () => {
  const location = useLocation();

  // Визначаємо фон на основі шляху
  const headerStyle =
    location.pathname === "/"
      ? { backgroundColor: "transparent" }
      : { backgroundColor: "rgba(247, 247, 247, 1)" };

  return (
    <header className={css.header} style={headerStyle}>
      <div className={css.container}>
        <img src={logo} alt="Travel Tracks" className={css.logo} />
        <div className={css.buttons}>
          <Link to="/" className={css.button}>
            Home
          </Link>
          <Link to="/catalog" className={css.button}>
            Catalog
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
