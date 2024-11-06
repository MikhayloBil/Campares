import css from "./Header.module.css";
import logo from "../../assets/Logo.svg";

const Header = () => {
  return (
    <header className={css.header}>
      <div className={css.container}>
        <img src={logo} alt="Travel Tracks" className={css.logo} />
        <div className={css.buttons}>
          <button className={css.button}>Home</button>
          <button className={css.button}>Catalog</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
