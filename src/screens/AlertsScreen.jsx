import React, { useState } from 'react';
import './AlertsScreen.css';

const AlertsScreen = () => {
    const [waConnected, setWaConnected] = useState(true);

    return (
        <div className="alerts-screen">
            {/* Header Navigation */}
            <header className="alerts-header glass-header">
                <div className="icon-btn">
                    <span className="material-symbols-outlined icon-agro-green">arrow_back_ios</span>
                </div>
                <h2 className="header-title">Seguimiento y Alertas</h2>
                <div style={{ width: '40px' }}></div> {/* Spacer */}
            </header>

            <main className="alerts-main">
                {/* WhatsApp Integration Card */}
                <div className="wa-card">
                    <div className="wa-card-content">
                        <div className="wa-icon-box">
                            <span className="material-symbols-outlined">chat</span>
                        </div>
                        <div className="wa-info">
                            <h3>Conexión a WhatsApp</h3>
                            <p>Recibe alertas en lenguaje natural y recomendaciones personalizadas directamente en tu móvil.</p>
                        </div>
                        <div className="wa-toggle">
                            <div
                                className={`toggle-switch ${waConnected ? 'active' : ''}`}
                                onClick={() => setWaConnected(!waConnected)}
                            >
                                <div className="toggle-thumb"></div>
                            </div>
                        </div>
                    </div>
                    <div className="wa-image-preview"></div>
                </div>

                {/* Section 1: Alertas Proactivas */}
                <section className="alerts-section">
                    <div className="section-header-row">
                        <h3 className="section-title">Alertas Proactivas</h3>
                        <span className="link-text">Ver todas</span>
                    </div>

                    <div className="alerts-list">
                        {/* Notification Card 1 */}
                        <div className="alert-card alert-warning">
                            <div className="alert-icon-box">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>thunderstorm</span>
                            </div>
                            <div className="alert-content">
                                <div className="alert-header">
                                    <span className="alert-type">Aviso Meteorológico</span>
                                    <span className="alert-time">Ahora</span>
                                </div>
                                <h4>Lluvia fuerte mañana</h4>
                                <p>Se esperan precipitaciones intensas en Boyacá. Protege tus semilleros de papa.</p>
                            </div>
                        </div>

                        {/* Notification Card 2 */}
                        <div className="alert-card alert-info">
                            <div className="alert-icon-box">
                                <span className="material-symbols-outlined">device_thermostat</span>
                            </div>
                            <div className="alert-content">
                                <div className="alert-header">
                                    <span className="alert-type">Alerta de Helada</span>
                                    <span className="alert-time">2h ago</span>
                                </div>
                                <h4>Descenso térmico nocturno</h4>
                                <p>Temperaturas bajo 4°C estimadas para la madrugada del jueves.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section 2: Recomendaciones Diarias */}
                <section className="alerts-section">
                    <h3 className="section-title">Recomendaciones Diarias</h3>

                    <div className="alerts-list">
                        {/* Recommendation 1 */}
                        <div className="rec-card">
                            <div className="rec-header">
                                <div className="rec-icon-box">
                                    <span className="material-symbols-outlined">eco</span>
                                </div>
                                <div className="rec-title-info">
                                    <p className="rec-title">Cuidado de Suelo</p>
                                    <p className="rec-subtitle">Basado en datos de hoy</p>
                                </div>
                            </div>
                            <div className="rec-content">
                                <h4>Momento ideal para fertilizar la Papa</h4>
                                <p>La humedad relativa del 75% permitirá una absorción óptima de nutrientes durante las próximas 48 horas.</p>
                                <button className="btn-rec">Ver detalles técnicos</button>
                            </div>
                        </div>

                        {/* Recommendation 2 */}
                        <div className="rec-card">
                            <div className="rec-header">
                                <div className="rec-icon-box">
                                    <span className="material-symbols-outlined">opacity</span>
                                </div>
                                <div className="rec-title-info">
                                    <p className="rec-title">Riego Inteligente</p>
                                    <p className="rec-subtitle">Sugerencia de ahorro</p>
                                </div>
                            </div>
                            <div className="rec-content">
                                <h4>Ajuste de riego por nubosidad</h4>
                                <p>Reduce un 15% el riego programado hoy debido a la alta nubosidad matutina.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AlertsScreen;
