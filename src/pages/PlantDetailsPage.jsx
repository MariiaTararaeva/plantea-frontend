import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import "../components/navbarStyling.css";

const PlantDetailsPage = () => {
  const { plantId } = useParams(); // Retrieve plantId from URL
  const [plant, setPlant] = useState(null); // Store plant details
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/plants/${plantId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch plant details");
        }
        const data = await response.json();
        setPlant(data);
      } catch (err) {
        console.error("Error fetching plant details:", err);
        setError(err.message);
      }
    };

    fetchPlantDetails();
  }, [plantId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!plant) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-content">
      <h1 className="h1">{plant.common_name || plant.scientific_name}</h1>
      <img
        src={plant.default_image?.thumbnail || "/placeholder.jpg"}
        alt={plant.common_name || "Plant"}
        className="plant-image"
      />
      <p>
        <strong>Scientific Name:</strong> {plant.scientific_name}
      </p>
      <p>
        <strong>Common Name:</strong> {plant.common_name}
      </p>
      <p>
        <strong>Watering:</strong>{" "}
        {plant.watering || "No description available."}
      </p>
      <p>
        <strong>Sunlight:</strong>{" "}
        {Array.isArray(plant.sunlight) && plant.sunlight.length > 1
          ? plant.sunlight.join(", ")
          : plant.sunlight || "Unknown"}
      </p>
    </div>
  );
};

export default PlantDetailsPage;
