import React, { useEffect, useState } from 'react';

let scriptLoaded = false;

// Función para cargar el script de Google Maps solo una vez
const loadGoogleMapsScript = () => {
  if (!scriptLoaded) {
    scriptLoaded = true;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    script.async = true;
    document.head.appendChild(script);
  }
};

const MapComponent = () => {
  const [map, setMap] = useState(null);

  // Cargar el script de Google Maps y el marcador avanzado
  useEffect(() => {
    if (!window.google) {
      loadGoogleMapsScript();  // Cargar el script solo si no está cargado
    }

    if (!map) return;

    // Crear un marcador usando la nueva API
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: { lat: -34.397, lng: 150.644 },
      map: map,
    });
  }, [map]);

  // Renderizar el mapa y controlar su carga
  return (
    <div
      id="map"
      style={{ width: '100%', height: '100vh' }} // Mapa adaptado a toda la pantalla
      ref={(el) => {
        if (el && !map) {
          setMap(new google.maps.Map(el, { center: { lat: -34.397, lng: 150.644 }, zoom: 8 }));
        }
      }}
    />
  );
};

export default MapComponent;
