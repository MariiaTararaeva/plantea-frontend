import { useNavigate, useLocation } from "react-router-dom";
const SearchResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { searchResults } = location.state || { searchResults: [] };

  // Handle clicking a plant to navigate to its details
  const handlePlantClick = (plantId) => {
    navigate(`/plants/${plantId}`);
  };

  return (
    <div className="searchDiv">
      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          <h1 className="h1">Search Results:</h1>
          <div className="plant-grid">
            {searchResults.map((plant) => (
              <div
                key={plant._id}
                className="plant-card"
                onClick={() => handlePlantClick(plant._id)}
              >
                <img
                  src={plant.default_image?.thumbnail || "/placeholder.jpg"}
                  alt={plant.common_name || "Plant"}
                  className="plant-image"
                />
                <p>{plant.common_name || plant.scientific_name}</p>
                <p>
                  {plant.watering === "Average"
                    ? "💧💧"
                    : plant.watering === "Frequent"
                    ? "💧💧💧"
                    : plant.watering === "Minimum"
                    ? "💧"
                    : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;
