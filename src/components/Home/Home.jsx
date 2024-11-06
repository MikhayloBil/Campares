import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const handleViewNowClick = () => {
    navigate("/catalog");
  };

  return (
    <div>
      <h1>Campers of your dreams</h1>
      <h2>You can find everything you want in our catalog</h2>
      <button onClick={handleViewNowClick}>View Now</button>
    </div>
  );
}

export default HomePage;
