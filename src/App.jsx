import { useState } from 'react';
import InputScreen from './screens/InputScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import DashboardScreen from './screens/DashboardScreen';
import AlertsScreen from './screens/AlertsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('input');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'input':
        return <InputScreen onComplete={() => setCurrentScreen('processing')} onMenuClick={() => setIsMenuOpen(true)} />;
      case 'processing':
        return <ProcessingScreen onComplete={() => setCurrentScreen('dashboard')} />;
      case 'dashboard':
        return <DashboardScreen onActivateAlerts={() => setCurrentScreen('alerts')} />;
      case 'alerts':
        return <AlertsScreen />;
      default:
        return <InputScreen onComplete={() => setCurrentScreen('processing')} onMenuClick={() => setIsMenuOpen(true)} />;
    }
  };

  return (
    <div className="app-shell">
      {/* Mobile Sidebar Overlay */}
      {isMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={e => e.stopPropagation()}>
            <div className="drawer-header">
              <span className="material-symbols-outlined logo-icon">eco</span>
              <span className="logo-text">AgroPlus</span>
              <button className="icon-btn" onClick={() => setIsMenuOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="drawer-nav-items">
              <button
                className={`drawer-item ${currentScreen === 'input' ? 'active' : ''}`}
                onClick={() => handleNavClick('input')}
              >
                <span className="material-symbols-outlined">home</span>
                <span className="drawer-text">Inicio</span>
              </button>
              <button className="drawer-item" onClick={() => handleNavClick('input')}>
                <span className="material-symbols-outlined">map</span>
                <span className="drawer-text">Mapas</span>
              </button>
              <button
                className={`drawer-item ${currentScreen === 'dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('dashboard')}
              >
                <span className="material-symbols-outlined">monitoring</span>
                <span className="drawer-text">Análisis</span>
              </button>
              <button
                className={`drawer-item ${currentScreen === 'alerts' ? 'active' : ''}`}
                onClick={() => handleNavClick('alerts')}
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="drawer-text">Alertas</span>
              </button>
              <button className="drawer-item" onClick={() => handleNavClick('input')}>
                <span className="material-symbols-outlined">person</span>
                <span className="drawer-text">Perfil</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation (Sidebar on Desktop, Bottom Nav on Mobile) */}
      {currentScreen !== 'processing' && currentScreen !== 'input' && (
        <nav className="app-nav">
          <div className="nav-logo desktop-only">
            <span className="material-symbols-outlined logo-icon">eco</span>
            <span className="logo-text">AgroPlus</span>
          </div>
          <div className="nav-items-container">
            <button
              className={`nav-item ${currentScreen === 'input' || currentScreen === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentScreen('input')}
            >
              <span className="material-symbols-outlined">home</span>
              <span className="nav-text">Inicio</span>
            </button>
            <button className="nav-item">
              <span className="material-symbols-outlined">map</span>
              <span className="nav-text">Mapas</span>
            </button>
            <button
              className={`nav-item ${currentScreen === 'dashboard' ? 'active' : ''}`}
              onClick={() => setCurrentScreen('dashboard')}
            >
              <span className="material-symbols-outlined">monitoring</span>
              <span className="nav-text">Análisis</span>
            </button>
            <button
              className={`nav-item ${currentScreen === 'alerts' ? 'active' : ''}`}
              onClick={() => setCurrentScreen('alerts')}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="nav-text">Alertas</span>
            </button>
            <button className="nav-item">
              <span className="material-symbols-outlined">person</span>
              <span className="nav-text">Perfil</span>
            </button>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="main-content">
        {renderScreen()}
      </main>
    </div>
  );
}

export default App;
