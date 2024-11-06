import PropTypes from "prop-types";

function CamperCard({ camper }) {
  const handleShowMore = () => {
    window.open(`/catalog/${camper.id}`, "_blank");
  };

  return (
    <div>
      <h3>{camper.name}</h3>
      <p>Price: {parseFloat(camper.price).toFixed(2)}</p>
      <button onClick={handleShowMore}>Show more</button>
    </div>
  );
}

CamperCard.propTypes = {
  camper: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default CamperCard;
