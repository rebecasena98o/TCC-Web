import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ title, subtitle, stats }) => {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="header-container">
        {/* Topo: Logo e Botão Voltar */}
        <div className="header-top">
          <button onClick={() => navigate(-1)} className="back-button">
            ← Voltar
          </button>
          <div className="brand-logo">TCC Mobile</div>
          <div className="header-actions">
            <button className="theme-toggle">🌙</button>
          </div>
        </div>

        {/* Corpo: Título e Estatísticas */}
        <div className="header-body">
          <div>
            <h1 className="header-title">{title}</h1>
            <p className="header-subtitle">{subtitle}</p>
          </div>

          {/* Grid de Estatísticas (Se houver) */}
          {stats && (
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon-row">
                  <span className="stat-label">Pendentes</span>
                </div>
                <div className="stat-count">{stats.pending || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-row">
                  <span className="stat-label">Aprovados</span>
                </div>
                <div className="stat-count">{stats.approved || 0}</div>
              </div>
              <div className="stat-card">
                <div className="stat-icon-row">
                  <span className="stat-label">Total</span>
                </div>
                <div className="stat-count">{stats.total || 0}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;