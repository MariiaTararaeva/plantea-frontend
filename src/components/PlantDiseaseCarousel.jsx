import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/PlantD.css";

function PlantDiseaseCarousel() {
  const [diseases, setDiseases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch random diseases
    fetch(`${import.meta.env.VITE_API_URL}/api/plantdiseases/?count=5`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setDiseases(data);
      })
      .catch((err) => console.error("Error fetching diseases:", err));
  }, []);

  const handleCardClick = (diseaseId) => {
    // later, navigate to a detail page: /disease/:id
    navigate(`/diseases/${diseaseId}`);
  };

  return (
    <div className="disease-carousel-container">
      {diseases.map((disease) => {
        // Grab at least one image to show on the front
        const firstImage =
          disease.images?.[0]?.thumbnail ||
          disease.images?.[0]?.small_url ||
          "https://placehold.co/200x200";

        return (
          <div
            className="disease-card"
            key={disease._id}
            onClick={() => handleCardClick(disease._id)}
          >
            <div className="card-front">
              <img src={firstImage} alt={disease.common_name} />
              <h3>{disease.common_name}</h3>
            </div>
            <div className="card-back">
              <h4>Scientific name(s):</h4>
              <p>
                {Array.isArray(disease.scientific_name)
                  ? disease.scientific_name.join(", ")
                  : disease.scientific_name}
              </p>
              {/* maybe a short snippet from the description */}
              {disease.description?.[0] && (
                <p>{disease.description[0].description.slice(0, 100)}...</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PlantDiseaseCarousel;
