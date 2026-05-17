import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../Components/Header.jsx';
import '../../Style/DetailsTccTicket/StyleDetalhes.css';
import TccChat from '../Librarian/LibrarianMain/TccChat/TccChat.jsx';
import iconeUpload from '../../imgs/Chat/enviar.png';
import iconeDownload from '../../imgs/Chat/caixa-de-entrada.png';
import '../../Style/Librarian/StyleTccChat.css';
import '../../Style/Librarian/StyleMessageList.css';
import '../../Style/Librarian/StyleMessage.css';

const DetalhesTccAluno = ({ user }) => {
  const location = useLocation();

  const tcc = location.state?.tccSelecionado || {
    titulo: "Título Padrão do Projeto",
    status: "Em análise",
    aluno: user?.email?.split('@')[0] || "Estudante",
    statusClass: "status-progresso"
  };


  const [historicoMensagens, setHistoricoMensagens] = useState([
    { text: "Olá! Analisei a introdução do seu TCC e deixei algumas observações.", fromMe: false, time: "14:30" },
    { text: "Obrigado! Vou dar uma olhada nos pontos sugeridos.", fromMe: true, time: "14:35" }
  ]);


  const handleEnviarMensagemAluno = (textoDigitado) => {
    const horaAtual = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    const novaMensagem = {
      text: textoDigitado,
      fromMe: true, 
      time: horaAtual
    };
  
    setHistoricoMensagens([...historicoMensagens, novaMensagem]);
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
            <label> Título do TCC </label>
            <h3> {tcc.titulo} </h3>
          </div>

          <div className="status-container-ticket">
            <label> Status Atual </label>
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

        
        <section className="chat-section">
          <div className="chat-header">
            <h4>Mensagens com o Bibliotecário</h4>
          </div>

          <div style={{ flex: 1, padding: '10px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <TccChat 
              messages={historicoMensagens} 
              onSend={handleEnviarMensagemAluno} 
            />
          </div>
        </section>

      </main>
    </div>
  );
};

export default DetalhesTccAluno;