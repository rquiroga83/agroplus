import { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import InputScreen from './screens/InputScreen';
import ProcessingScreen from './screens/ProcessingScreen';
import DashboardScreen from './screens/DashboardScreen';
import AlertsScreen from './screens/AlertsScreen';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
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
                className={`drawer-item ${currentPath === '/' ? 'active' : ''}`}
                onClick={() => handleNavClick('/')}
              >
                <span className="material-symbols-outlined">home</span>
                <span className="drawer-text">Inicio</span>
              </button>
              <button className="drawer-item" onClick={() => handleNavClick('/')}>
                <span className="material-symbols-outlined">map</span>
                <span className="drawer-text">Mapas</span>
              </button>
              <button
                className={`drawer-item ${currentPath === '/dashboard' ? 'active' : ''}`}
                onClick={() => handleNavClick('/dashboard')}
              >
                <span className="material-symbols-outlined">monitoring</span>
                <span className="drawer-text">Análisis</span>
              </button>
              <button
                className={`drawer-item ${currentPath === '/alerts' ? 'active' : ''}`}
                onClick={() => handleNavClick('/alerts')}
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="drawer-text">Alertas</span>
              </button>
              <button className="drawer-item" onClick={() => handleNavClick('/')}>
                <span className="material-symbols-outlined">person</span>
                <span className="drawer-text">Perfil</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Navigation (Sidebar on Desktop, Bottom Nav on Mobile) */}
      {currentPath !== '/processing' && currentPath !== '/' && (
        <nav className="app-nav">
          <div className="nav-logo desktop-only">
            <span className="material-symbols-outlined logo-icon">eco</span>
            <span className="logo-text">AgroPlus</span>
          </div>
          <div className="nav-items-container">
            <button
              className={`nav-item ${currentPath === '/' || currentPath === '/dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('/')}
            >
              <span className="material-symbols-outlined">home</span>
              <span className="nav-text">Inicio</span>
            </button>
            <button className="nav-item" onClick={() => handleNavClick('/')}>
              <span className="material-symbols-outlined">map</span>
              <span className="nav-text">Mapas</span>
            </button>
            <button
              className={`nav-item ${currentPath === '/dashboard' ? 'active' : ''}`}
              onClick={() => handleNavClick('/dashboard')}
            >
              <span className="material-symbols-outlined">monitoring</span>
              <span className="nav-text">Análisis</span>
            </button>
            <button
              className={`nav-item ${currentPath === '/alerts' ? 'active' : ''}`}
              onClick={() => handleNavClick('/alerts')}
            >
              <span className="material-symbols-outlined">notifications</span>
              <span className="nav-text">Alertas</span>
            </button>
            <button className="nav-item" onClick={() => handleNavClick('/')}>
              <span className="material-symbols-outlined">person</span>
              <span className="nav-text">Perfil</span>
            </button>
          </div>
        </nav>
      )}

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<InputScreen onMenuClick={() => setIsMenuOpen(true)} />} />
          <Route path="/processing" element={<ProcessingScreen />} />
          <Route path="/dashboard" element={<DashboardScreen onMenuClick={() => setIsMenuOpen(true)} />} />
          <Route path="/alerts" element={<AlertsScreen onMenuClick={() => setIsMenuOpen(true)} />} />
          {/* Catch all route redirects to home */}
          <Route path="*" element={<InputScreen onMenuClick={() => setIsMenuOpen(true)} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
