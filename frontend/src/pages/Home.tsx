import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/sightings')
      .then((response) => setSightings(response.data))
      .catch((error) => console.error('Error fetching sightings:', error));
  }, []);

  return (
    <div>
      <h1>Wildlife Sightings</h1>
      <ul>
        {sightings.map((sighting) => (
          <li key={sighting.id}>
            {sighting.species}: {sighting.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
