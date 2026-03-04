import React from 'react';
import './DashboardScreen.css';

const DashboardScreen = ({ onActivateAlerts }) => {
    return (
        <div className="dashboard-screen">
            <header className="dash-header glass-header">
                <button className="icon-btn">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <h1 className="header-title">AgroPlus Dashboard</h1>
                <button className="icon-btn primary-dim">
                    <span className="material-symbols-outlined" style={{ color: 'var(--primary)' }}>account_circle</span>
                </button>
            </header>

            <main className="dash-main">
                {/* Section 1: ¿Qué sembrar? */}
                <section className="dash-section">
                    <div className="section-header-row">
                        <h2 className="section-title">
                            <div className="title-icon-wrapper"><span className="material-symbols-outlined icon-primary">potted_plant</span></div>
                            ¿Qué sembrar?
                        </h2>
                        <span className="badge-text">Top Recomendados</span>
                    </div>

                    <div className="crops-list">
                        <div className="crop-card">
                            <div className="crop-icon-box">
                                <span className="material-symbols-outlined">restaurant</span>
                            </div>
                            <div className="crop-info">
                                <div className="crop-header">
                                    <h3>Papa</h3>
                                    <span className="success-rate">90% Éxito</span>
                                </div>
                                <div className="progress-bg"><div className="progress-fill highlight" style={{ width: '90%' }}></div></div>
                            </div>
                        </div>

                        <div className="crop-card">
                            <div className="crop-icon-box">
                                <span className="material-symbols-outlined">eco</span>
                            </div>
                            <div className="crop-info">
                                <div className="crop-header">
                                    <h3>Yuca</h3>
                                    <span className="success-rate">82% Éxito</span>
                                </div>
                                <div className="progress-bg"><div className="progress-fill" style={{ width: '82%' }}></div></div>
                            </div>
                        </div>

                        <div className="crop-card">
                            <div className="crop-icon-box">
                                <span className="material-symbols-outlined">local_cafe</span>
                            </div>
                            <div className="crop-info">
                                <div className="crop-header">
                                    <h3>Café</h3>
                                    <span className="success-rate">75% Éxito</span>
                                </div>
                                <div className="progress-bg"><div className="progress-fill" style={{ width: '75%' }}></div></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: ¿Cuándo sembrar? */}
                <section className="dash-section">
                    <h2 className="section-title">
                        <div className="title-icon-wrapper"><span className="material-symbols-outlined icon-primary">calendar_month</span></div>
                        ¿Cuándo sembrar?
                    </h2>

                    <div className="weather-cards-row desktop-only" style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                        <div className="card-box" style={{ flex: 1, padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ color: '#3b82f6' }}>water_drop</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>LLUVIA</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>120mm</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>+15% vs Histórico</div>
                        </div>
                        <div className="card-box" style={{ flex: 1, padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                <span className="material-symbols-outlined" style={{ color: '#f59e0b' }}>thermostat</span>
                                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>TEMP</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-main)' }}>18°C</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>Óptimo</div>
                        </div>
                    </div>
                    <div className="card-box">
                        <p className="subtitle">Ventana ideal para: <strong>Papa Sabanera</strong></p>

                        <div className="timeline-container">
                            <div className="timeline-labels">
                                <span>Marzo</span>
                                <span>Abril</span>
                                <span>Mayo</span>
                                <span>Junio</span>
                            </div>
                            <div className="timeline-bar">
                                <div className="timeline-window">
                                    <span className="window-text">Ventana Ideal</span>
                                </div>
                                <div className="timeline-marker">
                                    <div className="marker-line"></div>
                                    <div className="marker-dot"></div>
                                </div>
                            </div>
                        </div>

                        <div className="info-row">
                            <span className="material-symbols-outlined icon-warning">info</span>
                            <p>Condiciones óptimas de lluvia esperadas en Abril.</p>
                        </div>
                    </div>
                </section>

                {/* Section 3: ¿Dónde sembrar? */}
                <section className="dash-section">
                    <h2 className="section-title">
                        <div className="title-icon-wrapper"><span className="material-symbols-outlined icon-primary">map</span></div>
                        ¿Dónde sembrar?
                    </h2>
                    <div className="map-card">
                        <div className="map-area">
                            <div className="heatmap-overlay"></div>
                            <div className="map-legend">
                                <div className="legend-item"><div className="dot green"></div><span>Nutrientes Óptimos</span></div>
                                <div className="legend-item"><div className="dot yellow"></div><span>Suelo Seco</span></div>
                                <div className="legend-item"><div className="dot red"></div><span>Riesgo Erosión</span></div>
                            </div>
                        </div>
                        <div className="map-footer">
                            <div className="map-footer-text">
                                <h4>Lote 'La Esperanza'</h4>
                                <p>Área: 4.5 Hectáreas</p>
                            </div>
                            <button className="text-btn transition-scale">
                                Ver análisis completo
                                <span className="material-symbols-outlined arrow-icon">arrow_forward</span>
                            </button>
                        </div>
                    </div>
                </section>

                <div className="action-row">
                    <button className="btn btn-alerts transition-scale" onClick={onActivateAlerts}>
                        <span className="material-symbols-outlined">notifications_active</span>
                        Activar Alertas de Cultivo
                    </button>
                </div>
            </main>
        </div>
    );
};

export default DashboardScreen;
