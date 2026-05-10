import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, BarChart3, FileText, Clock, AlertTriangle } from 'lucide-react';
import '../style/StyleGlobal.css';

const Header = ({ 
  title, 
  subtitle, 
  status, 
  showBackButton = false, 
  actionContent, 
  stats = [], 
  toggleDarkMode, 
  isDark 
}) => {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="header-container">
        
        {/* Topo: Navegação e Utilidades */}
        <div className="header-top">
          {showBackButton ? (
            <button onClick={() => navigate(-1)} className="back-button">
              <ArrowLeft size={16} />
              <span>Voltar</span>
            </button>
          ) : (
            <Link to="/" className="brand-logo">TCC Unifor</Link>
          )}

          <div className="header-actions">
            {actionContent}
            <button onClick={toggleDarkMode} className="theme-toggle">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="header-body">
          <div className="header-info">
            <h1 className="header-title">{title}</h1>
            {subtitle && <p className="header-subtitle">{subtitle}</p>}
            
            {status && (
              <div className="status-badge-container">
                <span className={`status-badge status-${status.type}`}>
                  {status.label}
                </span>
              </div>
            )}
          </div>

          {/* Cards de Estatísticas (Visão Bibliotecário) */}
          {stats.length > 0 && (
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon-row">
                    {stat.type === 'total' && <FileText size={14} />}
                    {stat.type === 'open' && <Clock size={14} />}
                    {stat.type === 'priority' && <AlertTriangle size={14} />}
                    <span className="stat-label">{stat.label}</span>
                  </div>
                  <span className="stat-count">{stat.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;