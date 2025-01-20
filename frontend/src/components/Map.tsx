import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Point from '@arcgis/core/geometry/Point';
import esriConfig from '@arcgis/core/config';

// Set your API key
esriConfig.apiKey = import.meta.env.VITE_ARCGIS_API_KEY;

type Sighting = {
  id: number;
  species: string;
  description: string;
  latitude: number;
  longitude: number;
  date: string;
};

interface MapProps {
  sightings: Sighting[];
}

const Map: React.FC<MapProps> = ({ sightings }) => {
  const mapDiv = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('Sightings received by Map:', sightings);

    if (!mapDiv.current) return;

    const webMap = new WebMap({
      basemap: 'dark-gray-vector',
    });

    const view = new MapView({
      container: mapDiv.current,
      map: webMap,
      center: [-74.006, 40.7128],
      zoom: 4,
      popup: {
        dockEnabled: false, // Prevent popup docking below the map
        defaultPopupTemplateEnabled: true, // Ensure popups are enabled
      },
    });

    const graphicsLayer = new GraphicsLayer();
    webMap.add(graphicsLayer);

    sightings.forEach((sighting) => {
      console.log('Adding marker for sighting:', sighting);

      // Define geometry for the marker
      const point = new Point({
        longitude: sighting.longitude,
        latitude: sighting.latitude,
      });

      // Define a more visually engaging symbol
      const symbol = {
        type: 'simple-marker',
        color: sighting.species === 'Red Fox' ? [255, 69, 0] : [30, 144, 255], // Different colors based on species
        size: 14, // Larger marker size
        style: 'circle',
        outline: {
          color: [255, 255, 255], // White outline
          width: 2, // Thicker outline
        },
      };

      const popupTemplate = {
        title: 'Sighting: {species}',
        content: `
          <b>Description:</b> {description}<br>
          <b>Date:</b> ${new Date(sighting.date).toLocaleDateString()}
        `,
      };

      const graphic = new Graphic({
        geometry: point,
        symbol: symbol,
        attributes: {
          species: sighting.species,
          description: sighting.description,
        },
        popupTemplate: popupTemplate, // Attach popup template
      });

      graphicsLayer.add(graphic);
    });

    return () => {
      view.destroy();
    };
  }, [sightings]);

  return (
    <div
      style={{ width: '80%', height: '500px', margin: '0 auto' }}
      ref={mapDiv}
    ></div>
  );
};

export default Map;
