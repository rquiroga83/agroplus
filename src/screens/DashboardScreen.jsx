import React from 'react';
import './DashboardScreen.css';

const DashboardScreen = ({ onActivateAlerts, onMenuClick }) => {
    return (
        <div className="dashboard-screen">
            <header className="dash-header glass-header">
                <button className="icon-btn" onClick={onMenuClick}>
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

                    <div className="plans-container">
                        {/* Plan A */}
                        <div className="plan-card plan-a">
                            <div className="plan-header">
                                <div className="plan-title-row">
                                    <h3>🥔 Papa</h3>
                                    <div className="score-wrapper">
                                        <span className="success-rate">90% Éxito</span>
                                    </div>
                                </div>

                                <div className="monoculture-indicator">
                                    <div className="status-pill red">
                                        <span className="dot"></span>
                                        <span className="pill-text">Saturación Alta: Riesgo de sobreoferta</span>
                                    </div>
                                </div>
                            </div>

                            <div className="plan-body">
                                <ul className="info-list">
                                    <li>
                                        <span className="material-symbols-outlined icon-blue">local_shipping</span>
                                        <span>A 15 km del acopio más cercano</span>
                                    </li>
                                    <li>
                                        <span className="material-symbols-outlined icon-gray">add_road</span>
                                        <span>Acceso por vía secundaria</span>
                                    </li>
                                    <li>
                                        <span className="material-symbols-outlined icon-green">trending_up</span>
                                        <span>$120.000/carga <strong className="trend-up">⬆️</strong></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="plan-footer">
                                <p className="resilience-title">Resiliencia Climática a 5 Años</p>
                                <div className="resilience-timeline">
                                    <div className="timeline-segment safe" title="2025: Óptimo">2025</div>
                                    <div className="timeline-segment warning" title="2027: Estrés Medio">2027</div>
                                    <div className="timeline-segment danger" title="2030: Estrés Alto">2030+</div>
                                </div>
                                <p className="resilience-text">Viabilidad a largo plazo disminuye por aumento de temperatura proyectado.</p>
                            </div>
                        </div>

                        {/* Plan B */}
                        <div className="plan-card plan-b">
                            <div className="plan-header">
                                <div className="plan-title-row">
                                    <h3>🌽 Maíz</h3>
                                    <div className="score-wrapper">
                                        <span className="success-rate">85% Éxito</span>
                                    </div>
                                </div>

                                <div className="monoculture-indicator">
                                    <div className="status-pill green">
                                        <span className="dot"></span>
                                        <span className="pill-text">Baja presencia: Excelente oportunidad</span>
                                    </div>
                                </div>
                            </div>

                            <div className="plan-body">
                                <ul className="info-list">
                                    <li>
                                        <span className="material-symbols-outlined icon-blue">local_shipping</span>
                                        <span>Recolecta local disponible</span>
                                    </li>
                                    <li>
                                        <span className="material-symbols-outlined icon-gray">add_road</span>
                                        <span>Vía principal a 5 km</span>
                                    </li>
                                    <li>
                                        <span className="material-symbols-outlined icon-green">trending_flat</span>
                                        <span>$85.000/carga <strong className="trend-neutral">➖</strong></span>
                                    </li>
                                </ul>
                            </div>

                            <div className="plan-footer">
                                <p className="resilience-title">Resiliencia Climática a 5 Años</p>
                                <div className="resilience-timeline">
                                    <div className="timeline-segment safe" title="2025: Óptimo">2025</div>
                                    <div className="timeline-segment safe" title="2027: Óptimo">2027</div>
                                    <div className="timeline-segment safe" title="2030: Óptimo">2030+</div>
                                </div>
                                <p className="resilience-text">Cultivo de alta resiliencia térmica, apto para proyecciones climáticas futuras.</p>
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
