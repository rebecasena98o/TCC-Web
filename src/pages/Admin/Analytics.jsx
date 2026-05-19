import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../../imgs/LogoUnifor/logo-unifor.png';
import '../../Style/Admin/StyleAnalytics.css';

const rankingData = [
  {
    posicao: 1,
    nome: 'Dra. Fernanda Costa',
    concluidas: 52,
    emAndamento: 3,
    tempoMedio: '2.8 dias',
    status: 'Ativo',
  },
  {
    posicao: 2,
    nome: 'Dra. Ana Paula Santos',
    concluidas: 45,
    emAndamento: 5,
    tempoMedio: '3.2 dias',
    status: 'Ativo',
  },
  {
    posicao: 3,
    nome: 'Dr. Carlos Oliveira',
    concluidas: 38,
    emAndamento: 8,
    tempoMedio: '4.1 dias',
    status: 'Ativo',
  },
  {
    posicao: 4,
    nome: 'Dr. Roberto Silva',
    concluidas: 31,
    emAndamento: 0,
    tempoMedio: '3.5 dias',
    status: 'Inativo',
  },
];

const medalEmoji = { 1: '🥇', 2: '🥈', 3: '🥉' };

const statCards = [
  {
    label: 'Total de Revisões',
    value: 166,
    icon: '📄',
    colorClass: 'icon-blue',
  },
  {
    label: 'Em Andamento',
    value: 16,
    icon: '📈',
    colorClass: 'icon-orange',
  },
  {
    label: 'Aprovados',
    value: 1,
    icon: '📈',
    colorClass: 'icon-green',
  },
  {
    label: 'Bibliotecários Ativos',
    value: 3,
    icon: '👥',
    colorClass: 'icon-purple',
  },
];

export default function Analytics({ user }) {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState('Analytics');

  function handleNavClick(aba) {
    setAbaAtiva(aba);
    if (aba === 'Analytics') navigate('/admin/analytics');
    if (aba === 'Delegação') navigate('/admin/delegacao');
    if (aba === 'Bibliotecários') navigate('/admin/bibliotecarios');
  }

  const innerStyle = { margin: '0 32px' };

  return (
    <div className="analytics-page">

      <header className="analytics-header" style={innerStyle}>
        <div className="analytics-header-left">
          <h1 className="analytics-header-title">
            Painel Administrativo - Unifor
          </h1>
          <p className="analytics-header-sub">
            Bem-vinda,{' '}
            {user?.email?.split('@')[0] || 'Maria Licciardi de Lima'}
          </p>
        </div>
        <button
          className="btn-sair"
          onClick={() => navigate('/login')}
        >
          Sair
        </button>
      </header>

      <div className="analytics-top-bar" style={innerStyle}>
        <img
          src={logoUnifor}
          alt="Logo Unifor"
          className="analytics-logo"
        />
        <span className="analytics-top-title">Painel Administrativo</span>
      </div>

      <nav className="analytics-nav" style={innerStyle}>
        {['Analytics', 'Delegação', 'Bibliotecários'].map((aba) => (
          <button
            key={aba}
            className={`nav-tab ${abaAtiva === aba ? 'nav-tab-active' : ''}`}
            onClick={() => handleNavClick(aba)}
          >
            {aba === 'Analytics' && '📊 '}
            {aba === 'Delegação' && '⇄ '}
            {aba === 'Bibliotecários' && '👤 '}
            {aba}
          </button>
        ))}
      </nav>

      <main className="analytics-main">

        <div className="analytics-cards-row">
          {statCards.map((card) => (
            <div className="analytics-stat-card" key={card.label}>
              <div className="analytics-stat-info">
                <span className="analytics-stat-label">{card.label}</span>
                <span className="analytics-stat-value">{card.value}</span>
              </div>
              <div className={`analytics-stat-icon ${card.colorClass}`}>
                {card.icon}
              </div>
            </div>
          ))}
        </div>

        <section className="analytics-ranking-card">
          <div className="analytics-ranking-header">
            <h2 className="analytics-ranking-title">
              Ranking de Produtividade
            </h2>
            
          </div>

          <table className="analytics-table">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Bibliotecário</th>
                <th>Revisões Concluídas</th>
                <th>Em Andamento</th>
                <th>Tempo Médio</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rankingData.map((r) => (
                <tr key={r.posicao}>
                  <td className="analytics-posicao-cell">
                    {medalEmoji[r.posicao] || ''}
                    {' '}{r.posicao}º
                  </td>
                  <td>{r.nome}</td>
                  <td>{r.concluidas}</td>
                  <td>{r.emAndamento}</td>
                  <td>{r.tempoMedio}</td>
                  <td>
                    <span
                      className={`status-badge-analytics ${
                        r.status === 'Ativo'
                          ? 'status-ativo'
                          : 'status-inativo'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </main>
    </div>
  );
}
