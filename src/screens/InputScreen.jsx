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

const COLOMBIAN_CROPS = [
    'Aguacate', 'Algodón', 'Arroz', 'Banano', 'Cacao', 'Café',
    'Caña de azúcar', 'Frijol', 'Maíz', 'Palma de aceite',
    'Papa', 'Plátano', 'Sorgo', 'Tomate', 'Yuca'
];

const InputScreen = ({ onComplete, onMenuClick }) => {
    const [hectares, setHectares] = useState('');
    const [selectedCrops, setSelectedCrops] = useState([]);
    const [cropSearch, setCropSearch] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [validationError, setValidationError] = useState('');

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

            // Add click listener to map
            mapInstanceRef.current.on('click', (e) => {
                const { lat, lng } = e.latlng;

                // Remove old marker if exists
                if (markerInstanceRef.current) {
                    markerInstanceRef.current.remove();
                }

                markerInstanceRef.current = L.marker([lat, lng], { icon: customMarkerIcon }).addTo(mapInstanceRef.current);

                // Optional: Fly to clicked location to center it
                mapInstanceRef.current.flyTo([lat, lng], mapInstanceRef.current.getZoom(), { animate: true, duration: 0.5 });

                setLocationFound({ lat: lat.toFixed(4), lng: lng.toFixed(4) });
            });
        }

        // Cleanup on unmount
        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.off('click');
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    const handleLocate = () => {
        setIsLocating(true);

        if (!navigator.geolocation) {
            alert('La geolocalización no es compatible con tu navegador');
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                handleLocationUpdate(latitude, longitude);
            },
            (error) => {
                console.error("Error al obtener ubicación:", error);
                alert('No se pudo acceder a tu ubicación. Por favor revisa los permisos.');
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
        );
    };

    const handleLocationUpdate = (lat, lng) => {
        setIsLocating(false);
        setLocationFound({ lat: lat.toFixed(4), lng: lng.toFixed(4) });

        if (mapInstanceRef.current) {
            mapInstanceRef.current.flyTo([lat, lng], 18, { animate: true, duration: 1.5 });

            if (markerInstanceRef.current) {
                markerInstanceRef.current.remove();
            }

            setTimeout(() => {
                markerInstanceRef.current = L.marker([lat, lng], { icon: customMarkerIcon }).addTo(mapInstanceRef.current);
            }, 1000);
        }
    };

    const handleAddCrop = (crop) => {
        if (!selectedCrops.includes(crop)) {
            setSelectedCrops([...selectedCrops, crop]);
        }
        setCropSearch('');
        setShowDropdown(false);
    };

    const handleRemoveCrop = (cropToRemove) => {
        setSelectedCrops(selectedCrops.filter(crop => crop !== cropToRemove));
    };

    const handleAnalyzeClick = () => {
        if (!hectares || parseFloat(hectares) <= 0) {
            setValidationError('El tamaño del predio es obligatorio.');
            return;
        }
        setValidationError('');
        onComplete();
    };

    const filteredCrops = COLOMBIAN_CROPS.filter(crop =>
        crop.toLowerCase().includes(cropSearch.toLowerCase()) && !selectedCrops.includes(crop)
    );

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
                        <span>{isLocating ? 'Buscando satélites...' : (locationFound ? `Ubicación ${locationFound.lat}°, ${locationFound.lng}°` : 'Usar mi ubicación actual')}</span>
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
                    <label className="form-label">Tamaño del predio (Hectáreas) <span className="required-asterisk">*</span></label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon-left">straighten</span>
                        <input
                            type="number"
                            className={`form-input ${validationError ? 'input-error' : ''}`}
                            placeholder="Ej: 15.5"
                            value={hectares}
                            onChange={(e) => {
                                setHectares(e.target.value);
                                if (e.target.value) setValidationError('');
                            }}
                        />
                    </div>
                    {validationError && <span className="error-text">{validationError}</span>}
                </div>

                <div className="form-group relative">
                    <label className="form-label">Cultivos previos (Historial)</label>
                    <div className="input-wrapper">
                        <span className="material-symbols-outlined input-icon-left">potted_plant</span>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Buscar cultivo (Café, Cacao, etc)"
                            value={cropSearch}
                            onChange={(e) => {
                                setCropSearch(e.target.value);
                                setShowDropdown(true);
                            }}
                            onFocus={() => setShowDropdown(true)}
                            onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                        />
                        <span className="material-symbols-outlined input-icon-right">expand_more</span>
                    </div>

                    {showDropdown && filteredCrops.length > 0 && (
                        <ul className="dropdown-list">
                            {filteredCrops.map(crop => (
                                <li key={crop} className="dropdown-item" onClick={() => handleAddCrop(crop)}>
                                    {crop}
                                </li>
                            ))}
                        </ul>
                    )}

                    <div className="tags-container">
                        {selectedCrops.map(crop => (
                            <span key={crop} className="tag">
                                {crop}
                                <span className="material-symbols-outlined tag-close" onClick={() => handleRemoveCrop(crop)}>close</span>
                            </span>
                        ))}
                    </div>
                </div>

                {/* Action Footer */}
                <div className="action-footer with-nav">
                    <button className="btn-analyze" onClick={handleAnalyzeClick}>
                        <span className="material-symbols-outlined">psychology</span>
                        <span>Analizar Terreno con IA</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputScreen;
