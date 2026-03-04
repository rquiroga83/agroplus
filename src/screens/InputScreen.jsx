import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './InputScreen.css';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
import * as turf from '@turf/turf';

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

const InputScreen = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [hectares, setHectares] = useState('');
    const [validationError, setValidationError] = useState('');

    // Chat States
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: '¡Hola! Para darte la mejor recomendación, cuéntame: ¿qué cultivos has tenido antes en este terreno y cómo te fue con ellos (rendimiento, plagas, etc.)?' }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const chatEndRef = useRef(null);

    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [chatMessages, isChatLoading]);

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

            // Add GeoSearch Control
            const searchProvider = new OpenStreetMapProvider({
                params: {
                    countrycodes: 'co', // Limit to Colombia
                }
            });
            const searchControl = new GeoSearchControl({
                provider: searchProvider,
                style: 'button',
                position: 'topleft',
                showMarker: true,
                showPopup: false,
                autoClose: true,
                retainZoomLevel: false,
                animateZoom: true,
                keepResult: true,
                searchLabel: 'Buscar municipio o vereda...'
            });
            mapInstanceRef.current.addControl(searchControl);

            // Add Geoman Draw Controls
            mapInstanceRef.current.pm.addControls({
                position: 'topleft',
                drawPolygon: true,
                editMode: true,
                dragMode: true,
                cutPolygon: false,
                removalMode: true,
                drawMarker: false,
                drawPolyline: false,
                drawRectangle: false,
                drawCircle: false,
                drawCircleMarker: false,
                drawText: false,
            });

            // Set Geoman language to Spanish
            mapInstanceRef.current.pm.setLang('es');

            // Handle Polygon Drawing for Area Calculation
            mapInstanceRef.current.on('pm:create', (e) => {
                const layer = e.layer;
                if (e.shape === 'Polygon') {
                    // Remove previous drawn polygons to keep only one
                    mapInstanceRef.current.eachLayer((l) => {
                        if (l instanceof L.Polygon && l !== layer) {
                            l.remove();
                        }
                    });

                    // Calculate area using Turf
                    const geojson = layer.toGeoJSON();
                    const areaSquareMeters = turf.area(geojson);
                    const areaHectares = areaSquareMeters / 10000;

                    setHectares(areaHectares.toFixed(2));
                    setValidationError('');

                    // Center the polygon
                    mapInstanceRef.current.fitBounds(layer.getBounds());
                }
            });

            // Add click listener to map (for quick marker)
            mapInstanceRef.current.on('click', (e) => {
                // Only place quick marker if not in drawing mode
                if (!mapInstanceRef.current.pm.globalDrawModeEnabled()) {
                    const { lat, lng } = e.latlng;

                    // Remove old marker if exists
                    if (markerInstanceRef.current) {
                        markerInstanceRef.current.remove();
                    }

                    markerInstanceRef.current = L.marker([lat, lng], { icon: customMarkerIcon }).addTo(mapInstanceRef.current);

                    // Optional: Fly to clicked location to center it
                    mapInstanceRef.current.flyTo([lat, lng], mapInstanceRef.current.getZoom(), { animate: true, duration: 0.5 });

                    setLocationFound({ lat: lat.toFixed(4), lng: lng.toFixed(4) });
                }
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

    const handleSendMessage = async () => {
        if (!chatInput.trim()) return;

        const newMessages = [...chatMessages, { role: 'user', content: chatInput.trim() }];
        setChatMessages(newMessages);
        setChatInput('');
        setIsChatLoading(true);

        try {
            const apiMessages = newMessages.map(msg => ({ role: msg.role, content: msg.content }));
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: apiMessages })
            });

            if (response.status === 429) {
                const data = await response.json();
                setChatMessages(prev => [...prev, { role: 'assistant', content: `[Aviso]: ${data.error}` }]);
                setIsChatLoading(false);
                return;
            }

            if (!response.ok) throw new Error('Error al conectar con el asistente.');

            const data = await response.json();
            const aiContent = data.message;
            setChatMessages(prev => [...prev, { role: 'assistant', content: aiContent }]);

            if (aiContent.includes('Analizar Terreno con IA')) {
                setHasAnswered(true);
            }
        } catch (error) {
            console.error('Chat error:', error);
            setChatMessages(prev => [...prev, { role: 'assistant', content: 'Lo siento, tuve un problema al procesar tu mensaje. ¿Podrías intentar de nuevo?' }]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleAnalyzeClick = () => {
        if (!hectares || parseFloat(hectares) <= 0) {
            setValidationError('El tamaño del predio es obligatorio.');
            return;
        }
        if (!hasAnswered) {
            setValidationError('Por favor, responde al asistente sobre tus cultivos previos.');
            return;
        }
        setValidationError('');
        navigate('/processing');
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
                        <span>{isLocating ? 'Buscando satélites...' : (locationFound ? `Ubicación ${locationFound.lat}°, ${locationFound.lng}°` : 'Usar mi ubicación actual')}</span>
                    </button>
                </div>
            </div>

            {/* Data Section */}
            <div className="data-section">
                <div className="drag-indicator"></div>
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

                <div className="form-group chat-section">
                    <label className="form-label">Historial Agrícola (Chat con Asistente) <span className="required-asterisk">*</span></label>
                    <div className="chat-container">
                        <div className="chat-messages">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`chat-bubble ${msg.role === 'user' ? 'msg-user' : 'msg-ai'}`}>
                                    {msg.content}
                                </div>
                            ))}
                            {isChatLoading && (
                                <div className="chat-bubble msg-ai loading-dots">
                                    <span>.</span><span>.</span><span>.</span>
                                </div>
                            )}
                            <div ref={chatEndRef} />
                        </div>
                        <div className="chat-input-area">
                            <input
                                type="text"
                                className="chat-input"
                                placeholder="Escribe tu respuesta aquí..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                disabled={isChatLoading}
                            />
                            <button className="chat-btn" onClick={handleSendMessage} disabled={isChatLoading || !chatInput.trim()}>
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Action Footer */}
                <div className="action-footer with-nav">
                    <button
                        className={`btn-analyze ${!hasAnswered ? 'disabled' : ''}`}
                        onClick={handleAnalyzeClick}
                        disabled={!hasAnswered}
                    >
                        <span className="material-symbols-outlined">psychology</span>
                        <span>Analizar Terreno con IA</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputScreen;
