import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './SightingForm.module.css';

const SightingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    species: '',
    description: '',
    latitude: '',
    longitude: '',
  });
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/sightings', {
        ...formData,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
        date: new Date().toISOString(),
      });
      navigate('/'); // Navigate back to home after successful submission
    } catch (error) {
      console.error('Error adding sighting:', error);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Add a New Sighting</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Species:
          <input
            type='text'
            name='species'
            value={formData.species}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Description:
          <textarea
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Latitude:
          <input
            type='number'
            name='latitude'
            value={formData.latitude}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Longitude:
          <input
            type='number'
            name='longitude'
            value={formData.longitude}
            onChange={handleChange}
            required
          />
        </label>
        <button type='submit' className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default SightingForm;
