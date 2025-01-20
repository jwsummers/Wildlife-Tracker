import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from '../components/Map';
import styles from './Home.module.css';
import { useNavigate } from 'react-router-dom';

type Sighting = {
  id: number;
  species: string;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
};

const Home: React.FC = () => {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/sightings')
      .then((response) => {
        console.log('Fetched sightings:', response.data);
        setSightings(response.data);
      })
      .catch((error) => console.error('Error fetching sightings:', error));
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1>Local Wildlife Tracker</h1>
        <p>
          Explore and document wildlife sightings in your area. Click on map
          markers to view details, or add your own sightings using the button
          below.
        </p>
        {/* Add Sightings Button */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.addButton}
            onClick={() => navigate('/add-sighting')}
          >
            Add New Sighting
          </button>
        </div>
      </header>

      {/* Map Section */}
      <div className={styles.mapContainer}>
        <Map sightings={sightings} />
      </div>
    </div>
  );
};

export default Home;
