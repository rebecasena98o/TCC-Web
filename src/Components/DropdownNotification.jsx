import React, { useState } from 'react';
import './DropdownNotification.css';


const DropdownNotification = ({ user, customIcon }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  
  const isLibrarian = user?.email?.includes('admin') || user?.role === 'librarian';

  
  const notificacoesAluno = [
    {
      id: 1,
      titulo: "Alteração de Status",
      descricao: "Seu TCC 'Análise de Sistemas...' mudou para: Ajustes Necessários.",
      tipo: "status",
      data: "Hoje, 14:30"
    },
    {
      id: 2,
      titulo: "Nova Mensagem",
      descricao: "O Bibliotecário enviou observações sobre a introdução.",
      tipo: "mensagem",
      data: "Ontem, 16:15"
    }
  ];

  const notificacoesBibliotecario = [
    {
      id: 1,
      titulo: "Novo Ticket Recebido",
      descricao: "João Santos enviou a primeira versão do TCC.",
      tipo: "ticket",
      data: "Hoje, 18:02"
    },
    {
      id: 2,
      titulo: "Resposta de Aluno",
      descricao: "Maria Silva respondeu no chat do chamado #1024.",
      tipo: "resposta",
      data: "Hoje, 11:20"
    }
  ];

  
  const notificacoesAtuais = isLibrarian ? notificacoesBibliotecario : notificacoesAluno;

  return (
    <div className="notification-dropdown">
      
      <button className={`bell-btn ${isOpen ? 'active' : ''}`} onClick={toggleDropdown}>
      {customIcon ? (
          <img src={customIcon} 
          alt="Notificações" 
          className="bell-img" 
          style={{ width: '22px', height: '22px', objectFit: 'contain' }} 
          />
        ) : (
      <span className="bell-icon">🔔</span>
      )}
      {notificacoesAtuais.length > 0 && (
        <span className="drop-notification-badge">
        {notificacoesAtuais.length}
      </span>
    )}
    
      </button>
      
      {isOpen && (
        <div className="notification-content">
          <div className="notification-header">
            <h4>Notificações</h4>
          </div>
          
          <div className="notification-list">
            {notificacoesAtuais.length === 0 ? (
              <p className="empty-notifications">Nenhuma nova notificação.</p>
            ) : (
              notificacoesAtuais.map((notif) => (
                <div key={notif.id} className={`notification-item ${notif.tipo}`}>
                  <div className="item-main">
                    <h5>{notif.titulo}</h5>
                    <p>{notif.descricao}</p>
                  </div>
                  <span className="item-time">{notif.data}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownNotification;