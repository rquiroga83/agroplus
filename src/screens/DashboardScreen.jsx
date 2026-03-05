import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
            enso: { probability: 70, text: "<strong>70% probabilidad de 'La Niña'</strong> (exceso de lluvias) durante la fase de floración.", alertType: 'warning', recommendation: 'Asegura la limpieza de canales de drenaje antes de la etapa de floración (Junio) para evitar encharcamientos.' },
            water: { rain: 40, required: 80, alert: "Prepárate para regar en Abril.", alertType: 'danger', recommendation: 'Activa o alquila equipo de riego suplementario para las primeras 3 semanas posteriores a la siembra.' }
        },
        resilienceRec: 'A largo plazo, el aumento de temperatura reducirá el rendimiento. Evalúa transicionar gradualmente a variedades de papa más tolerantes al calor para 2027.',
        monocultureText: 'Análisis satelital detecta que el 65% de los predios vecinos cultivarán papa. Esto puede causar caída de precios locales por sobreoferta al momento de cosecha.',
        detailedReport: {
            title: 'Informe Técnico: Viabilidad de Papa Sabanera',
            intro: 'La Papa Sabanera es un cultivo tradicionalmente fuerte en tu región, destacando por su alta adaptabilidad a los suelos franco-arenosos presentes en tu parcela. El algoritmo de viabilidad le otorga un **90% de éxito predictivo** basado en la calidad actual de tu tierra y la altitud geográfica térmica, lo cual provee las horas de frío exactas que el tubérculo necesita para su engrosamiento.',
            marketReasoning: 'A pesar del alto rendimiento biológico, el sistema alerta sobre un **Riesgo de Sobreoferta (Monocultivo)**. La visión satelital multiespectral indica que gran parte de las hectáreas vecinas han arado para sembrar lo mismo. Históricamente, cuando la saturación local supera el 50%, el precio de carga en el acopio local cae en promedio un 18%. Te recomendamos buscar contratos de futuros con supermercados o transformar el producto (cuarta gama) para esquivar la fluctuación del mercado en plaza.',
            climateReasoning: 'En el frente climático, nos enfrentamos a dos retos: **70% de probabilidad de La Niña** y un **Déficit Hídrico Inicial**. Esto significa que tendrás poco agua para hacer germinar la semilla, pero demasiada agua cuando la planta esté floreciendo. Por ende, la recomendación crítica es **conseguir riego suplementario en Abril** (para la germinación) y **construir/limpiar zanjas de drenaje profundo para Junio** (para evitar la pudrición por asfixia radicular provocada por La Niña).',
            conclusion: 'Es un cultivo de alto rendimiento comercial pero de **riesgo climático moderado-alto** para este semestre. Requiere manejo experto del agua.'
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
            enso: { probability: 30, text: "<strong>30% probabilidad de sequía</strong> prolongada. El cultivo debería tolerarlo bien.", alertType: 'safe', recommendation: 'Mantén una cobertura vegetal seca sobre el suelo (mulch) para retener humedad en caso de que la sequía se prolongue.' },
            water: { rain: 75, required: 70, alert: "Condiciones de humedad óptimas para el inicio.", alertType: 'success', recommendation: 'Aprovecha las lluvias iniciales para aplicar fertilizantes de fondo sin necesidad de riego artificial.' }
        },
        resilienceRec: 'El maíz tradicional de tu región tiene excelente resistencia térmica. Es tu opción más segura para asegurar ingresos estables en los próximos 5 años.',
        monocultureText: 'Análisis satelital indica baja intención de siembra de maíz en tu vereda. Tienes una ventana de oportunidad comercial alta.',
        detailedReport: {
            title: 'Informe Técnico: Viabilidad de Maíz Tradicional',
            intro: 'El Maíz Tradicional presenta una excelente tasa de **85% de éxito predictivo**. Aunque su rentabilidad neta por hectárea es estadísticamente menor que la papa en tiempos de vacas gordas, es un cultivo infinitamente más seguro y robusto. Las raíces profundas del maíz aprovecharán de maravilla la estructura de tu lote.',
            marketReasoning: 'El mercado actual presenta una **Ventana de Oportunidad**. Los indicadores de teledetección (NDVI de predios a 10km a la redonda) muestran una baja intención de siembra de maíz este semestre (preferencia masiva por papa). Al haber escasez local en el tiempo de cosecha (Julio), tendrás poder de negociación directo con los silos y compradores de la región, pudiendo fijar el precio por encima del soporte de $85.000 la carga.',
            climateReasoning: 'Climáticamente, es el cultivo ideal para este semestre en tu finca. El pronóstico prevé **lluvias iniciales fuertes (75mm)** que superan el requerimiento del maíz (70mm) para germinar, ahorrándote costos de riego. Además, la planta soporta perfectamente el **30% de probabilidad de sequía** tardía que pronostica el ENSO (El Niño fase neutral-seca). La recomendación de usar abono orgánico (mulch) es puramente preventiva para maximizar el grosor de la mazorca en caso de que la sequía se extienda más de 15 días.',
            conclusion: 'El maíz es el **cultivo estratégico y seguro** para esta temporada. Minimiza los riesgos de inversión agrícola y garantiza la venta.'
        }
    }
};

const DashboardScreen = ({ onMenuClick }) => {
    const navigate = useNavigate();
    const [selectedCrop, setSelectedCrop] = useState('papa');
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);

    const cropData = CROP_DATA[selectedCrop];

    const handleOpenReport = () => {
        setIsReportModalOpen(true);
    };

    const handleCloseReport = () => {
        setIsReportModalOpen(false);
    };

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
                                    <span className="metric-subtitle margin-top-sm" style={{ display: 'block', marginTop: '4px' }}>
                                        {CROP_DATA.papa.monocultureText}
                                    </span>
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
                                        <div>
                                            <span>$120.000/carga <strong className="trend-up">⬆️</strong></span>
                                            <span className="metric-subtitle">Venta promedio en cosecha (Estimado).</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div className="plan-footer">
                                <div className="resilience-header">
                                    <p className="resilience-title">Resiliencia Climática a 5 Años</p>
                                </div>
                                <p className="explanation-box">
                                    Proyección de cómo este cultivo soportará los cambios climáticos esperados para tu región en la próxima media década.
                                </p>
                                <div className="resilience-timeline">
                                    <div className="timeline-segment safe" title="2025: Óptimo">2025</div>
                                    <div className="timeline-segment warning" title="2027: Estrés Medio">2027</div>
                                    <div className="timeline-segment danger" title="2030: Estrés Alto">2030+</div>
                                </div>
                                <p className="resilience-text">Viabilidad a largo plazo disminuye por aumento de temperatura proyectado.</p>
                                <div className="recommendation-box warning">
                                    <span className="material-symbols-outlined">lightbulb</span>
                                    <span>{CROP_DATA.papa.resilienceRec}</span>
                                </div>
                                <button className="btn-outline-primary margin-top-md w-full" onClick={(e) => { e.stopPropagation(); setSelectedCrop('papa'); handleOpenReport(); }}>
                                    <span className="material-symbols-outlined">description</span> Ver Informe Detallado
                                </button>
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
                                    <span className="metric-subtitle margin-top-sm" style={{ display: 'block', marginTop: '4px' }}>
                                        {CROP_DATA.maiz.monocultureText}
                                    </span>
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
                                <div className="resilience-header">
                                    <p className="resilience-title">Resiliencia Climática a 5 Años</p>
                                </div>
                                <p className="explanation-box">
                                    Proyección de cómo este cultivo soportará los cambios climáticos esperados para tu región en la próxima media década.
                                </p>
                                <div className="resilience-timeline">
                                    <div className="timeline-segment safe" title="2025: Óptimo">2025</div>
                                    <div className="timeline-segment safe" title="2027: Óptimo">2027</div>
                                    <div className="timeline-segment safe" title="2030: Óptimo">2030+</div>
                                </div>
                                <p className="resilience-text">Cultivo de alta resiliencia térmica, apto para proyecciones climáticas futuras.</p>
                                <div className="recommendation-box">
                                    <span className="material-symbols-outlined">verified_user</span>
                                    <span>{CROP_DATA.maiz.resilienceRec}</span>
                                </div>
                                <button className="btn-outline-primary margin-top-md w-full" onClick={(e) => { e.stopPropagation(); setSelectedCrop('maiz'); handleOpenReport(); }}>
                                    <span className="material-symbols-outlined">description</span> Ver Informe Detallado
                                </button>
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
                    <p className="explanation-box margin-bottom">
                        Estas fechas son calculadas cruzando los requerimientos hídricos de la planta con las proyecciones de lluvia en tu finca, maximizando la supervivencia.
                    </p>

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
                            <p className="explanation-box margin-bottom">
                                Probabilidad de impacto de El Niño/La Niña (ENSO) durante las etapas críticas del cultivo, según proyecciones NOAA.
                            </p>
                            <div className="widget-body">
                                <div className="risk-progress-bg"><div className={`risk-progress-fill ${cropData.risks.enso.alertType}`} style={{ width: `${cropData.risks.enso.probability}%` }}></div></div>
                                <p dangerouslySetInnerHTML={{ __html: cropData.risks.enso.text }}></p>
                                <div className={`recommendation-box ${cropData.risks.enso.alertType === 'warning' || cropData.risks.enso.alertType === 'danger' ? 'warning' : ''}`}>
                                    <span className="material-symbols-outlined">shield</span>
                                    <span>{cropData.risks.enso.recommendation}</span>
                                </div>
                            </div>
                        </div>

                        <div className="risk-widget water-widget">
                            <div className="widget-header">
                                <span className="material-symbols-outlined risk-icon orange">device_thermostat</span>
                                <h4>Déficit Hídrico (Siembra)</h4>
                            </div>
                            <p className="explanation-box margin-bottom">
                                Compara la lluvia esperada en tu área frente al agua requerida por la planta para germinar.
                            </p>
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
                                <div className={`recommendation-box ${cropData.risks.water.alertType === 'warning' || cropData.risks.water.alertType === 'danger' ? 'warning' : ''}`}>
                                    <span className="material-symbols-outlined">water_drop</span>
                                    <span>{cropData.risks.water.recommendation}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <button className="btn-strategic-cta transition-scale" onClick={() => navigate('/alerts')}>
                        <span className="material-symbols-outlined">notification_add</span>
                        Agendar plan de tareas y recordatorios
                    </button>
                </section>
            </main>

            {/* Detailed Report Modal */}
            {isReportModalOpen && (
                <div className="report-modal-overlay" onClick={handleCloseReport}>
                    <div className="report-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">{cropData.detailedReport.title}</h2>
                            <button className="btn-close-modal" onClick={handleCloseReport}>
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="report-section">
                                <h3><span className="material-symbols-outlined">psychology</span> Justificación Agrológica</h3>
                                <p dangerouslySetInnerHTML={{ __html: cropData.detailedReport.intro }}></p>
                            </div>
                            <div className="report-section">
                                <h3><span className="material-symbols-outlined">storefront</span> Análisis de Mercado & Monocultivo</h3>
                                <p dangerouslySetInnerHTML={{ __html: cropData.detailedReport.marketReasoning }}></p>
                            </div>
                            <div className="report-section">
                                <h3><span className="material-symbols-outlined">public</span> Razonamiento Climático</h3>
                                <p dangerouslySetInnerHTML={{ __html: cropData.detailedReport.climateReasoning }}></p>
                            </div>
                            <div className="report-conclusion">
                                <h3><span className="material-symbols-outlined">task_alt</span> Veredicto Final</h3>
                                <p dangerouslySetInnerHTML={{ __html: cropData.detailedReport.conclusion }}></p>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-primary w-full" onClick={handleCloseReport}>Entendido</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardScreen;
