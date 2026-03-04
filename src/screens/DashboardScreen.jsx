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
                            Tu Recomendación de Cultivo
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

                {/* Section 2: Tu Ventana Estratégica de Siembra */}
                <section className="dash-section">
                    <div className="section-header-row">
                        <h2 className="section-title">
                            <div className="title-icon-wrapper"><span className="material-symbols-outlined icon-primary">calendar_month</span></div>
                            Tu Ventana Estratégica de Siembra
                        </h2>
                    </div>

                    <p className="strategic-text">
                        Sembrar entre el <strong>15 y el 30 de abril</strong> te permite aprovechar el inicio de las lluvias para la germinación y proyecta tu cosecha para agosto, un mes con <strong>buenos precios históricos</strong> en tu región.
                    </p>

                    {/* Phenological Timeline */}
                    <div className="card-box timeline-card">
                        <h3 className="card-box-title">Ciclo de Cultivo: Papa Sabanera</h3>

                        <div className="pheno-timeline-container">
                            <div className="timeline-axis">
                                <span style={{ left: '10%' }}>15 Mar</span>
                                <span style={{ left: '30%' }}>15 Abr</span>
                                <span style={{ left: '55%' }}>Mayo-Jun</span>
                                <span style={{ left: '85%' }}>10 Ago</span>
                            </div>

                            <div className="pheno-track">
                                {/* Background segments representing weather */}
                                <div className="pheno-track-bg">
                                    <div className="weather-bg weather-dry" style={{ left: '0%', width: '25%' }} title="Marzo: Clima seco ideal para preparar suelo"></div>
                                    <div className="weather-bg weather-rain" style={{ left: '25%', width: '50%' }} title="Abril-Junio: Temporada de lluvias, ideal para desarrollo"></div>
                                    <div className="weather-bg weather-dry" style={{ left: '75%', width: '25%' }} title="Julio-Agosto: Clima seco para cosecha"></div>
                                </div>

                                {/* Phases */}
                                <div className="pheno-phase prep" style={{ left: '10%' }}>
                                    <div className="phase-marker"></div>
                                    <div className="phase-label">
                                        <span className="material-symbols-outlined">agriculture</span>
                                        Prep. Suelo
                                    </div>
                                    <div className="phase-date">Marzo 15</div>
                                </div>

                                <div className="pheno-phase sowing" style={{ left: '30%' }}>
                                    <div className="phase-marker active-pulse"></div>
                                    <div className="phase-label highlight">
                                        <span className="material-symbols-outlined">seed</span>
                                        Siembra
                                    </div>
                                    <div className="phase-date highlight">Abr 15-30</div>
                                </div>

                                <div className="pheno-phase dev" style={{ left: '55%' }}>
                                    <div className="phase-marker"></div>
                                    <div className="phase-label">
                                        <span className="material-symbols-outlined">water_drop</span>
                                        Desarrollo
                                    </div>
                                    <div className="phase-date">Mayo-Junio</div>
                                </div>

                                <div className="pheno-phase harvest" style={{ left: '85%' }}>
                                    <div className="phase-marker"></div>
                                    <div className="phase-label">
                                        <span className="material-symbols-outlined">compost</span>
                                        Cosecha
                                    </div>
                                    <div className="phase-date">Agosto 10</div>
                                </div>
                            </div>
                        </div>

                        {/* Market Projection under Harvest */}
                        <div className="market-projection-box">
                            <div className="status-pill green">
                                <span className="material-symbols-outlined icon-sm">trending_up</span>
                                <span className="pill-text"><strong>Proyección Favorable:</strong> Precios históricamente altos en Agosto.</span>
                            </div>
                        </div>
                    </div>

                    {/* Climate Risks Widgets */}
                    <div className="risks-grid">
                        <div className="risk-widget enso-widget">
                            <div className="widget-header">
                                <span className="material-symbols-outlined risk-icon blue">cyclone</span>
                                <h4>Pronóstico ENSO</h4>
                            </div>
                            <div className="widget-body">
                                <div className="risk-progress-bg"><div className="risk-progress-fill warning" style={{ width: '70%' }}></div></div>
                                <p><strong>70% probabilidad de 'La Niña'</strong> (exceso de lluvias) durante la fase de floración.</p>
                            </div>
                        </div>

                        <div className="risk-widget water-widget">
                            <div className="widget-header">
                                <span className="material-symbols-outlined risk-icon orange">device_thermostat</span>
                                <h4>Déficit Hídrico (Siembra)</h4>
                            </div>
                            <div className="widget-body">
                                <div className="comparison-bars">
                                    <div className="bar-row">
                                        <span className="bar-label">Lluvia</span>
                                        <div className="bar-track"><div className="bar-fill blue" style={{ width: '40%' }}></div></div>
                                    </div>
                                    <div className="bar-row">
                                        <span className="bar-label">Requerido</span>
                                        <div className="bar-track"><div className="bar-fill green" style={{ width: '80%' }}></div></div>
                                    </div>
                                </div>
                                <p className="alert-text"><span className="material-symbols-outlined icon-sm">warning</span> Prepárate para regar en Abril.</p>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <button className="btn-strategic-cta transition-scale" onClick={onActivateAlerts}>
                        <span className="material-symbols-outlined">notification_add</span>
                        Agendar plan de tareas y recordatorios
                    </button>
                </section>
            </main>
        </div>
    );
};

export default DashboardScreen;
