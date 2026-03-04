import React, { useState } from 'react';
import './DashboardScreen.css';

const CROP_DATA = {
    papa: {
        id: 'papa',
        name: 'Papa Sabanera',
        text: 'Sembrar entre el <strong>15 y el 30 de abril</strong> te permite aprovechar el inicio de las lluvias para la germinación y proyecta tu cosecha para agosto, un mes con <strong>buenos precios históricos</strong> en tu región.',
        weather: [
            { type: 'dry', left: '0%', width: '25%', title: 'Marzo: Clima seco ideal para preparar suelo' },
            { type: 'rain', left: '25%', width: '50%', title: 'Abril-Junio: Temporada de lluvias, ideal para desarrollo' },
            { type: 'dry', left: '75%', width: '25%', title: 'Julio-Agosto: Clima seco para cosecha' }
        ],
        axis: [
            { left: '10%', label: '15 Mar' },
            { left: '30%', label: '15 Abr' },
            { left: '55%', label: 'Mayo-Jun' },
            { left: '85%', label: '10 Ago' }
        ],
        phases: [
            { type: 'prep', left: '10%', icon: 'agriculture', label: 'Prep. Suelo', date: 'Marzo 15', active: false },
            { type: 'sowing', left: '30%', icon: 'seed', label: 'Siembra', date: 'Abr 15-30', active: true },
            { type: 'dev', left: '55%', icon: 'water_drop', label: 'Desarrollo', date: 'Mayo-Junio', active: false },
            { type: 'harvest', left: '85%', icon: 'compost', label: 'Cosecha', date: 'Agosto 10', active: false }
        ],
        market: {
            status: 'green',
            icon: 'trending_up',
            text: '<strong>Proyección Favorable:</strong> Precios históricamente altos en Agosto.'
        },
        risks: {
            enso: { probability: 70, text: "<strong>70% probabilidad de 'La Niña'</strong> (exceso de lluvias) durante la fase de floración.", alertType: 'warning' },
            water: { rain: 40, required: 80, alert: "Prepárate para regar en Abril.", alertType: 'danger' }
        }
    },
    maiz: {
        id: 'maiz',
        name: 'Maíz Tradicional',
        text: 'La siembra a <strong>finales de marzo</strong> asegura que la planta reciba suficiente agua durante su desarrollo vegetativo, reduciendo riesgos y aprovechando una ventana estable de precios locales.',
        weather: [
            { type: 'dry', left: '0%', width: '15%', title: 'Inicio Marzo: Preparación' },
            { type: 'rain', left: '15%', width: '55%', title: 'Marzo-Mayo: Lluvias moderadas' },
            { type: 'dry', left: '70%', width: '30%', title: 'Junio-Julio: Secado y cosecha' }
        ],
        axis: [
            { left: '10%', label: '10 Mar' },
            { left: '25%', label: '25 Mar' },
            { left: '50%', label: 'Abr-May' },
            { left: '80%', label: 'Julio' }
        ],
        phases: [
            { type: 'prep', left: '10%', icon: 'agriculture', label: 'Prep. Suelo', date: 'Marzo 10', active: false },
            { type: 'sowing', left: '25%', icon: 'seed', label: 'Siembra', date: 'Mar 20-30', active: true },
            { type: 'dev', left: '50%', icon: 'water_drop', label: 'Desarrollo', date: 'Abril-Mayo', active: false },
            { type: 'harvest', left: '80%', icon: 'compost', label: 'Cosecha', date: 'Julio', active: false }
        ],
        market: {
            status: 'green',
            icon: 'trending_flat',
            text: '<strong>Proyección Estable:</strong> Demanda constante y precios neutros proyectados.'
        },
        risks: {
            enso: { probability: 30, text: "<strong>30% probabilidad de sequía</strong> prolongada. El cultivo debería tolerarlo bien.", alertType: 'safe' },
            water: { rain: 75, required: 70, alert: "Condiciones de humedad óptimas para el inicio.", alertType: 'success' }
        }
    }
};

const DashboardScreen = ({ onActivateAlerts, onMenuClick }) => {
    const [selectedCrop, setSelectedCrop] = useState('papa');
    const cropData = CROP_DATA[selectedCrop];

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
                {/* Section 1: Tu Recomendación de Cultivo */}
                <section className="dash-section">
                    <div className="section-header-row">
                        <h2 className="section-title">
                            <div className="title-icon-wrapper"><span className="material-symbols-outlined icon-primary">potted_plant</span></div>
                            Tu Recomendación de Cultivo
                        </h2>
                        <span className="badge-text">Top Recomendados</span>
                    </div>

                    <div className="plans-container">
                        {/* Plan A (Papa) */}
                        <div
                            className={`plan-card plan-a ${selectedCrop === 'papa' ? 'selected' : ''}`}
                            onClick={() => setSelectedCrop('papa')}
                            style={{ cursor: 'pointer' }}
                        >
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

                        {/* Plan B (Maíz) */}
                        <div
                            className={`plan-card plan-b ${selectedCrop === 'maiz' ? 'selected' : ''}`}
                            onClick={() => setSelectedCrop('maiz')}
                            style={{ cursor: 'pointer' }}
                        >
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

                    <p className="strategic-text" dangerouslySetInnerHTML={{ __html: cropData.text }}></p>

                    {/* Phenological Timeline */}
                    <div className="card-box timeline-card">
                        <h3 className="card-box-title">Ciclo de Cultivo: {cropData.name}</h3>

                        <div className="pheno-timeline-container">
                            <div className="timeline-axis">
                                {cropData.axis.map((tick, i) => (
                                    <span key={i} style={{ left: tick.left }}>{tick.label}</span>
                                ))}
                            </div>

                            <div className="pheno-track">
                                {/* Background segments representing weather */}
                                <div className="pheno-track-bg">
                                    {cropData.weather.map((segment, i) => (
                                        <div key={i} className={`weather-bg weather-${segment.type}`} style={{ left: segment.left, width: segment.width }} title={segment.title}></div>
                                    ))}
                                </div>

                                {/* Phases */}
                                {cropData.phases.map((phase, i) => (
                                    <div key={i} className={`pheno-phase ${phase.type}`} style={{ left: phase.left }}>
                                        <div className={`phase-marker ${phase.active ? 'active-pulse' : ''}`}></div>
                                        <div className={`phase-label ${phase.active ? 'highlight' : ''}`}>
                                            <span className="material-symbols-outlined">{phase.icon}</span>
                                            {phase.label}
                                        </div>
                                        <div className={`phase-date ${phase.active ? 'highlight' : ''}`}>{phase.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Market Projection under Harvest */}
                        <div className="market-projection-box">
                            <div className={`status-pill ${cropData.market.status}`}>
                                <span className="material-symbols-outlined icon-sm">{cropData.market.icon}</span>
                                <span className="pill-text" dangerouslySetInnerHTML={{ __html: cropData.market.text }}></span>
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
                                <div className="risk-progress-bg"><div className={`risk-progress-fill ${cropData.risks.enso.alertType}`} style={{ width: `${cropData.risks.enso.probability}%` }}></div></div>
                                <p dangerouslySetInnerHTML={{ __html: cropData.risks.enso.text }}></p>
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
                                        <div className="bar-track"><div className="bar-fill blue" style={{ width: `${cropData.risks.water.rain}%` }}></div></div>
                                    </div>
                                    <div className="bar-row">
                                        <span className="bar-label">Requerido</span>
                                        <div className="bar-track"><div className="bar-fill green" style={{ width: `${cropData.risks.water.required}%` }}></div></div>
                                    </div>
                                </div>
                                <p className="alert-text">
                                    {cropData.risks.water.alertType === 'danger' && <span className="material-symbols-outlined icon-sm" style={{ color: '#b91c1c' }}>warning</span>}
                                    {cropData.risks.water.alertType === 'success' && <span className="material-symbols-outlined icon-sm" style={{ color: '#15803d' }}>check_circle</span>}
                                    <span style={{ color: cropData.risks.water.alertType === 'danger' ? '#b91c1c' : (cropData.risks.water.alertType === 'success' ? '#15803d' : 'inherit') }}>{cropData.risks.water.alert}</span>
                                </p>
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
