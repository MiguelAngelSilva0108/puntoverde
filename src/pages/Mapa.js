// src/pages/Mapa.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const center = [23.634501, -102.552784]; // Centro de México

function Mapa() {
    return (
        <div>
            <h1>Mapa con Centros de Reciclaje</h1>
            <MapContainer center={center} zoom={5} style={{ width: '100%', height: '400px' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={center}>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default Mapa;
