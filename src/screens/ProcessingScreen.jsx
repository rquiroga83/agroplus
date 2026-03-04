import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProcessingScreen.css';

const ProcessingScreen = () => {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate AI data processing: increment by ~2% every 100ms
        const interval = setInterval(() => {
            setProgress(old => {
                if (old >= 100) {
                    clearInterval(interval);
                    setTimeout(() => navigate('/dashboard'), 800); // Wait shortly at 100% before transitioning
                    return 100;
                }
                return old + 2;
            });
        }, 100);
        return () => clearInterval(interval);
    }, [navigate]);

    // Dynamic status based on progress
    let statusText = "Analizando imágenes de Copernicus...";
    let subText = "Cruzando datos climáticos y registros UPRA/IDEAM...";
    if (progress > 30) {
        statusText = "Calculando índices de humedad y suelo...";
        subText = "Evaluando riesgo de inundaciones...";
    }
    if (progress > 60) {
        statusText = "Correlacionando modelos históricos...";
        subText = "Generando predicciones de éxito de cultivos...";
    }
    if (progress > 90) {
        statusText = "Finalizando clustering dinámico...";
        subText = "Preparando recomendaciones óptimas...";
    }

    return (
        <div className="processing-screen grid-pattern">
            <header className="proc-header">
                <button className="icon-btn dark-btn">
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="proc-title">Procesamiento Inteligente</h2>
            </header>

            <main className="proc-main">
                {/* Left Pane (Desktop) / Top (Mobile) */}
                <div className="proc-left-pane">
                    <div className="coord-overlay desktop-only">
                        <p>COORD X: 101.442.12</p>
                        <p>COORD Y: 88.102.53</p>
                        <p>RESULT GRID: 0.5M/PX</p>
                    </div>
                    {/* Satellite Visualization Area */}
                    <div className="satellite-area">
                        <div className="satellite-icon">
                            <span className="material-symbols-outlined sat-symbol">satellite_alt</span>
                        </div>

                        <div className="scanning-beam"></div>

                        <div className="map-rep-container">
                            <div className="map-rep-bg"></div>
                            <div className="scanning-line"></div>
                        </div>
                    </div>
                    <div className="node-info desktop-only">
                        <p>NODE: CO-BOG-04</p>
                        <p>ENGINE: AGRO_VISION_V4.2</p>
                        <p>PRECISION: 99.8% CERTAINTY</p>
                    </div>
                </div>

                {/* Right Pane (Desktop) / Bottom (Mobile) */}
                <div className="proc-right-pane">
                    <div className="tasks-header desktop-only">
                        <span className="material-symbols-outlined">analytics</span>
                        <h3>Procesamiento IA</h3>
                        <p className="subtitle">Análisis multiespectral en tiempo real</p>
                    </div>

                    {/* High-Tech Circular Progress */}
                    <div className="progress-container">
                        <div className="circular-progress glow-pulse">
                            <div className="spinner-border"></div>
                            <div className="progress-value">
                                <span className="percent-text">{progress}%</span>
                                <span className="loading-label">ANALIZANDO</span>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Status Text */}
                    <div className="status-container">
                        <div className="active-tasks-header desktop-only">
                            <span>TAREAS ACTIVAS</span>
                            <span className="tasks-count">3/5 READY</span>
                        </div>
                        <div className="status-content">
                            <div className="status-indicator">
                                <span className="material-symbols-outlined">settings_input_antenna</span>
                                <p>{statusText}</p>
                            </div>

                            <div className="progress-bar-bg">
                                <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                            </div>
                        </div>

                        <div className="substatus-container">
                            <p className="substatus-text">{subText}</p>
                            <p className="substatus-meta">
                                Esto puede tardar unos segundos debido a la alta precisión de los modelos agrometeorológicos.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="proc-footer">
                <div className="tech-badge">
                    <div className="badge-icons">
                        <div className="badge-icon"><span className="material-symbols-outlined">cloud</span></div>
                        <div className="badge-icon"><span className="material-symbols-outlined">public</span></div>
                        <div className="badge-icon"><span className="material-symbols-outlined">agriculture</span></div>
                    </div>
                    <span className="tech-text">ENGINE V2.4 // SYNCING SATELLITE HUB</span>
                </div>
            </footer>
        </div>
    );
};

export default ProcessingScreen;
