import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import '../styles/Mapa.css';

const center = { lat: 23.634501, lng: -102.552784 };

function Mapa() {
    const [lugares, setLugares] = useState([]);

    useEffect(() => {
        const buscarCentros = async () => {
            try {
                const response = await fetch(
                    `http://localhost:3001/api/nearbysearch?location=${center.lat},${center.lng}&radius=50000&type=recycling&key=TU_API_KEY`
                );
                const data = await response.json();
                setLugares(data.results);
            } catch (error) {
                console.error("Error al buscar centros de reciclaje:", error);
            }
        };

        buscarCentros();
    }, []);

    return (
        <LoadScript googleMapsApiKey="AIzaSyC_kWJGoGCdgwzLygI3REUY0uTJQXoZk9g">
            <GoogleMap
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={center}
                zoom={5}
            >
                {lugares.map((lugar, index) => (
                    <Marker
                        key={index}
                        position={{
                            lat: lugar.geometry.location.lat,
                            lng: lugar.geometry.location.lng,
                        }}
                    />
                ))}
            </GoogleMap>
        </LoadScript>
    );
}

export default Mapa;

