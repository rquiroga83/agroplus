import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InputScreen.css';

// Fix missing marker icons for standard Leaflet in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Marker
const customMarkerIcon = new L.divIcon({
    className: 'custom-leaflet-icon',
    html: `<div class="leaflet-custom-marker">
            <div class="marker-ping"></div>
            <div class="marker-dot"></div>
            <span class="material-symbols-outlined marker-icon">location_on</span>
         </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
});

const defaultCenter = [4.6097, -74.0817]; // Bogota
const targetLocation = [4.57, -74.21];

const InputScreen = ({ onComplete, onMenuClick }) => {
    const [hectares, setHectares] = useState('');
    const [isLocating, setIsLocating] = useState(false);
    const [locationFound, setLocationFound] = useState(false);
    const mapRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const markerInstanceRef = useRef(null);

    useEffect(() => {
        // Initialize map only once
        if (mapRef.current && !mapInstanceRef.current) {
            mapInstanceRef.current = L.map(mapRef.current, {
                zoomControl: false
            }).setView(defaultCenter, 13);

            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
            }).addTo(mapInstanceRef.current);
        }

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const handleLocate = () => {
        setIsLocating(true);
        setTimeout(() => {
            setIsLocating(false);
            setLocationFound(true);

            // Fly to location
            if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo(targetLocation, 16, { animate: true, duration: 1.5 });

                // Remove old marker if exists
                if (markerInstanceRef.current) {
                    markerInstanceRef.current.remove();
                }

                // Add new marker with delay to match flight
                setTimeout(() => {
                    markerInstanceRef.current = L.marker(targetLocation, { icon: customMarkerIcon }).addTo(mapInstanceRef.current);
                }, 1000);
            }
        }, 1500);
    };

    return (
        <div className="input-screen">
            {/* Header */}
            <header className="header-top glass-header">
                <button className="icon-btn primary-dim" onClick={onMenuClick}>
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h1 className="header-title">Análisis de Terreno</h1>
                <button className="icon-btn terracotta-dim">
                    <span className="material-symbols-outlined">account_circle</span>
                </button>
            </header>

            {/* Map Section */}
            <div className="map-section">
                <div ref={mapRef} className="leaflet-map-container"></div>

                {/* Floating GPS Button */}
                <div className="gps-btn-container">
                    <button className="gps-btn" onClick={handleLocate}>
                        <span className="material-symbols-outlined btn-icon">{isLocating ? 'sync' : (locationFound ? 'check_circle' : 'my_location')}</span>
                        <span>{isLocating ? 'Buscando satélites...' : (locationFound ? 'Ubicación 4.57° N, 74.21° W' : 'Usar mi ubicación actual')}</span>
                    </button>
                </div>
            </div>

            {/* Data Section */}
            <div className="data-section">
                <div className="section-header">
                    <h3 className="section-title">Datos del Predio</h3>
                    <span className="step-badge">Paso 1 de 2</span>
                </div>

                <div className="form-group">
                    <label className="form-label">Tamaño del predio (Hectáreas)</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon-left">straighten</span>
                        <input
                            type="number"
                            className="form-input"
                            placeholder="Ej: 15.5"
                            value={hectares}
                            onChange={(e) => setHectares(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Cultivos previos (Historial)</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon-left">potted_plant</span>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Buscar cultivo (Café, Cacao, etc)"
                        />
                        <span className="material-symbols-outlined input-icon-right">expand_more</span>
                    </div>

                    <div className="tags-container">
                        <span className="tag">Café <span className="material-symbols-outlined tag-close">close</span></span>
                        <span className="tag">Maíz <span className="material-symbols-outlined tag-close">close</span></span>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="action-footer with-nav">
                    <button className="btn-analyze" onClick={onComplete}>
                        <span className="material-symbols-outlined">psychology</span>
                        <span>Analizar Terreno con IA</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputScreen;
