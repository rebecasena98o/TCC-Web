import React from 'react';
import Header from '../../components/Header';
import '../../Style/StyleGlobal.css';

const HomeAluno = ({ user }) => {
  
  const meusTccs = [
    {
      id: 1,
      titulo: "Análise de Sistemas de Informação na Gestão Empresarial",
      status: "Ajustes Necessários",
      versao: 2,
      data: "2026-04-28",
      mensagens: 4,
      statusClass: "status-alerta"
    },
    {
      id: 2,
      titulo: "Impactos da Tecnologia na Educação Moderna",
      status: "Em Correção",
      versao: 1,
      data: "2026-04-28",
      mensagens: 2,
      statusClass: "status-progresso"
    }
  ];

  return (
    <div className="dashboard-wrapper">
      <Header user={user} />
      
      <main className="content-container">
        <div className="content-header">
          <div>
            <h2 className="section-title">Meus TCCs</h2>
            <p className="section-subtitle">Acompanhe o status das suas revisões</p>
          </div>
          <button className="btn-novo-tcc">
            <span>+</span> Novo TCC
          </button>
        </div>

        <div className="tcc-grid">
          {meusTccs.map(tcc => (
            <div key={tcc.id} className="tcc-card">
              <div className="card-header">
                <i className="icon-doc">📄</i>
                <span className={`badge ${tcc.statusClass}`}>{tcc.status}</span>
              </div>
              
              <h3 className="tcc-title">{tcc.titulo}</h3>
              
              <div className="card-footer">
                <div className="footer-info">
                  <span>Versão {tcc.versao}</span>
                  <span style={{ marginLeft: '10px' }}>{tcc.data}</span>
                </div>
                <div className="footer-messages">
                  <span>💬 {tcc.mensagens}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomeAluno;