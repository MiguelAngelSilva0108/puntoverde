import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import "../styles/Mapa.css";

const defaultCenter = { lat: 19.4326, lng: -99.1332 }; // Ciudad de México como predeterminado

function Mapa() {
    const [lugares, setLugares] = useState([]);
    const [loading, setLoading] = useState(false);
    const [map, setMap] = useState(null);
    const [userLocation, setUserLocation] = useState(defaultCenter);
    const [selectedLugar, setSelectedLugar] = useState(null);
    const [tipoLugar, setTipoLugar] = useState(["reciclaje", "basura", "depósito+reciclaje"]);

    const fetchLugares = async (center, radius, tipos) => {
        try {
            setLoading(true);
            const url = `http://localhost:5000/proxy?query=${tipos.join("|")}&lat=${center.lat}&lng=${center.lng}&radius=${radius}&language=es`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error("Error en la solicitud a la API de Google");
            }

            const data = await response.json();
            const nuevosLugares = data.results.filter(
                (lugar) =>
                    !lugares.some(
                        (existente) => existente.place_id === lugar.place_id
                    )
            );
            setLugares((prev) => [...prev, ...nuevosLugares]);
        } catch (error) {
            console.error("Error al buscar lugares:", error);
        } finally {
            setLoading(false);
        }
    };

    const calculateRadius = (bounds) => {
        const latLngA = bounds.getNorthEast();
        const latLngB = bounds.getSouthWest();
        return window.google.maps.geometry.spherical.computeDistanceBetween(latLngA, latLngB) / 2;
    };

    const handleSearchInThisArea = () => {
        if (map) {
            const bounds = map.getBounds();
            const center = bounds.getCenter();
            const radius = calculateRadius(bounds);
            fetchLugares(center.toJSON(), radius, tipoLugar);
        }
    };

    const handleMapLoad = (mapInstance) => {
        setMap(mapInstance);
    };

    const handleMarkerClick = (lugar) => {
        setSelectedLugar(lugar);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    fetchLugares({ lat: latitude, lng: longitude }, 10000, tipoLugar);
                },
                () => fetchLugares(defaultCenter, 10000, tipoLugar)
            );
        } else {
            fetchLugares(defaultCenter, 10000, tipoLugar);
        }
    }, [tipoLugar]);

    return (
        <LoadScript googleMapsApiKey="AIzaSyC_kWJGoGCdgwzLygI3REUY0uTJQXoZk9g" libraries={["geometry"]}>
            <div className="map-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar tipo de lugar (ej. reciclaje, depósito de basura)"
                        value={tipoLugar.join(", ")}
                        onChange={(e) =>
                            setTipoLugar(e.target.value.split(",").map((tipo) => tipo.trim()))
                        }
                    />
                </div>
                <GoogleMap
                    id="map"
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={userLocation}
                    zoom={12}
                    onLoad={handleMapLoad}
                >
                    {lugares.map((lugar, index) => (
                        <Marker
                            key={index}
                            position={{
                                lat: lugar.geometry.location.lat,
                                lng: lugar.geometry.location.lng,
                            }}
                            onClick={() => handleMarkerClick(lugar)}
                        />
                    ))}

                    {selectedLugar && (
                        <InfoWindow
                            position={{
                                lat: selectedLugar.geometry.location.lat,
                                lng: selectedLugar.geometry.location.lng,
                            }}
                            onCloseClick={() => setSelectedLugar(null)}
                        >
                            <div className="marker-info">
                                <h3>{selectedLugar.name || "Sin nombre"}</h3>
                                <p>{selectedLugar.formatted_address || "Dirección no disponible"}</p>
                                {selectedLugar.photos && selectedLugar.photos.length > 0 && (
                                    <img
                                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${selectedLugar.photos[0].photo_reference}&key=AIzaSyC_kWJGoGCdgwzLygI3REUY0uTJQXoZk9g`}
                                        alt={selectedLugar.name}
                                    />
                                )}
                            </div>
                        </InfoWindow>
                    )}

                    {/* Botón centrado para "Buscar en esta área" */} 
                    <div
                        style={{
                            position: "absolute",
                            top: "60px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            zIndex: 10,
                            background: "#007BFF",
                            padding: "12px 24px",
                            borderRadius: "25px",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "16px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                            cursor: "pointer",
                            transition: "background 0.3s ease",
                        }}
                        onMouseEnter={(e) => (e.target.style.background = "#0056b3")}
                        onMouseLeave={(e) => (e.target.style.background = "#007BFF")}
                        onClick={handleSearchInThisArea}
                    >
                        Buscar en esta área
                    </div>
                </GoogleMap>
                {loading && <div className="loader">Cargando...</div>}
            </div>
        </LoadScript>
    );
}

export default Mapa;
