import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header';
import '../../Style/StyleDetalhes.css';
import iconeUpload from '../../imgs/Chat/enviar.png';
import iconeDownload from '../../imgs/Chat/caixa-de-entrada.png';

const DetalhesTccAluno = ({ user }) => {
  const location = useLocation();
  
 
  const tcc = location.state?.tccSelecionado || {
    titulo: "Título Padrão",
    status: "Em análise",
    aluno: user?.email?.split('@')[0] || "Estudante",
    statusClass: "status-progresso"
  };

  return (
    <div className="dashboard-wrapper">
      <Header user={user} />
      
      
      <main className="ticket-container" style={{ paddingTop: '110px' }}>
        
        
        <aside className="ticket-sidebar">
          <div className="info-card-aluno">
            <div className="user-avatar-placeholder">👤</div>
            <div>
              <h4>{tcc.aluno}</h4>
              <p>Autor do Projeto</p>
            </div>
          </div>

          <div className="tcc-detail-box">
            <label>Título do TCC</label>
            <h3>{tcc.titulo}</h3>
          </div>

          <div className="status-container-ticket">
            <label>Status Atual</label>
            <div className={`status-badge-grande ${tcc.statusClass}`}>
              {tcc.status}
            </div>
          </div>

          <div className="ticket-actions">
            <button className="btn-ticket btn-enviar">
              <img src={iconeUpload} alt="" className="btn-icon" /> 
              Enviar Nova Versão
            </button>
  
            <button className="btn-ticket btn-baixar">
              <img src={iconeDownload} alt="" className="btn-icon" /> 
              Baixar TCC Corrigido
            </button>
          </div>
        </aside>

        {/* LADO DIREITO: Chat */}
        <section className="chat-section">
          <div className="chat-header">
            <h4>Mensagens com o Bibliotecário</h4>
          </div>

          <div className="chat-messages-area">
            <div className="msg-bubble system">
              O bibliotecário iniciou a revisão do seu TCC.
            </div>
            <div className="msg-bubble receive">
              Olá, recebi sua última versão. Por favor, ajuste as referências conforme as normas ABNT na página 15.
            </div>
            <div className="msg-bubble send">
              Entendido! Vou realizar os ajustes e enviar a nova versão ainda hoje.
            </div>
          </div>

          <div className="chat-input-area">
            <input type="text" placeholder="Digite sua mensagem aqui..." />
            <button className="btn-send-msg">Enviar</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DetalhesTccAluno;