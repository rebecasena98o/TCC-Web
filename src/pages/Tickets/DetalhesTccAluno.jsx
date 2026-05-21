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

function EditarTicketModal({ tcc, onClose, onSalvar }) {
  const [titulo, setTitulo] = useState(tcc.titulo);
  const [arquivo, setArquivo] = useState(null);

  function handleSalvar() {
    if (!titulo.trim()) return;
    onSalvar({ titulo: titulo.trim(), arquivo });
  }

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    background: 'rgba(10, 29, 55, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  };

  const boxStyle = {
    background: '#fff',
    borderRadius: '16px',
    width: '440px',
    maxWidth: '95vw',
    boxShadow: '0 8px 32px rgba(24,117,232,0.15)',
    overflow: 'hidden',
    fontFamily: 'Inter, sans-serif',
  };

  const headerStyle = {
    background: '#F5F9FF',
    borderBottom: '2px solid #C4D1EB',
    padding: '18px 24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const bodyStyle = {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  };

  const labelStyle = {
    fontSize: '13px',
    fontWeight: '600',
    color: '#374151',
    display: 'block',
    marginBottom: '6px',
  };

  const inputStyle = {
    width: '100%',
    border: '1px solid #C4D1EB',
    borderRadius: '20px',
    padding: '10px 16px',
    fontSize: '14px',
    color: '#374151',
    fontFamily: 'Inter, sans-serif',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const footerStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    padding: '16px 24px',
    borderTop: '1px solid #e5e7eb',
    background: '#F5F9FF',
  };

  return (
    <div style={overlayStyle}>
      <div style={boxStyle}>

        <div style={headerStyle}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#0A1D37', margin: 0 }}>
              Editar Ticket
            </h2>
            <p style={{ fontSize: '12px', color: '#1875E8', margin: '4px 0 0' }}>
              Atualize os dados do seu TCC
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#e5e7eb',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <div style={bodyStyle}>

          <div>
            <label style={labelStyle}>Título do TCC *</label>
            <input
              style={inputStyle}
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o título do seu TCC"
            />
          </div>

          <div>
            <label style={labelStyle}>
              Substituir arquivo{' '}
              <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 400 }}>
                (opcional)
              </span>
            </label>
            <input
              style={{ ...inputStyle, padding: '8px 16px', borderRadius: '12px' }}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setArquivo(e.target.files[0] || null)}
            />
            {arquivo && (
              <p style={{ fontSize: '12px', color: '#1875E8', marginTop: '6px' }}>
                📎 {arquivo.name}
              </p>
            )}
          </div>

        </div>

        <div style={footerStyle}>
          <button
            onClick={onClose}
            style={{
              background: '#fff',
              border: '1px solid #C4D1EB',
              borderRadius: '20px',
              padding: '8px 20px',
              fontWeight: '600',
              fontSize: '14px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleSalvar}
            disabled={!titulo.trim()}
            style={{
              background: titulo.trim() ? '#1875E8' : '#9ca3af',
              color: '#fff',
              border: 'none',
              borderRadius: '20px',
              padding: '8px 22px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: titulo.trim() ? 'pointer' : 'not-allowed',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            Salvar Alterações
          </button>
        </div>

      </div>
    </div>
  );
}

// ─── Tela principal ───────────────────────────────────────────────────────────
const DetalhesTccAluno = ({ user }) => {
  const location = useLocation();

  const tccInicial = location.state?.tccSelecionado || {
    titulo: 'Título Padrão do Projeto',
    status: 'Em análise',
    aluno: user?.email?.split('@')[0] || 'Estudante',
    statusClass: 'status-progresso',
  };

  // Observação enviada no momento de criação do ticket vira primeira mensagem
  const observacaoInicial = location.state?.observacaoInicial || null;

  const mensagensIniciais = [
    ...(observacaoInicial
      ? [{
          text: observacaoInicial,
          fromMe: true,
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        }]
      : []),
    {
      text: 'Olá! Analisei a introdução do seu TCC e deixei algumas observações.',
      fromMe: false,
      time: '14:30',
    },
    { text: 'Obrigado! Vou dar uma olhada nos pontos sugeridos.', fromMe: true, time: '14:35' },
  ];

  const [tcc, setTcc] = useState(tccInicial);
  const [historicoMensagens, setHistoricoMensagens] = useState(mensagensIniciais);
  const [editarAberto, setEditarAberto] = useState(false);
  const [toast, setToast] = useState(null);

  function exibirToast(mensagem, tipo = 'sucesso') {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3000);
  }

  const handleEnviarMensagemAluno = (textoDigitado) => {
    const horaAtual = new Date().toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
    setHistoricoMensagens((prev) => [
      ...prev,
      { text: textoDigitado, fromMe: true, time: horaAtual },
    ]);
  };

  function handleSalvarEdicao({ titulo, arquivo }) {
    // TODO: enviar para o backend
    console.log('Atualizando ticket:', { titulo, arquivo: arquivo?.name });

    setTcc((prev) => ({ ...prev, titulo }));
    setEditarAberto(false);
    exibirToast('Ticket atualizado com sucesso!');
  }

  const toastStyle = {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#fff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    zIndex: 9999,
    whiteSpace: 'nowrap',
    backgroundColor: toast?.tipo === 'erro' ? '#b11e11' : '#16a34a',
  };

  return (
    <div className="dashboard-wrapper">

      {toast && (
        <div style={toastStyle}>
          {toast.tipo === 'erro' ? '✕' : '✓'} {toast.mensagem}
        </div>
      )}

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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label>Título do TCC</label>
              {tcc.status !== 'Aprovado' && (
                <button
                  onClick={() => setEditarAberto(true)}
                  title="Editar ticket"
                  style={{
                    background: 'none',
                    border: '1px solid #C4D1EB',
                    borderRadius: '8px',
                    padding: '3px 10px',
                    fontSize: '12px',
                    color: '#1875E8',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: '600',
                  }}
                >
                  ✏️ Editar
                </button>
              )}
            </div>
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

      {editarAberto && (
        <EditarTicketModal
          tcc={tcc}
          onClose={() => setEditarAberto(false)}
          onSalvar={handleSalvarEdicao}
        />
      )}

    </div>
  );
};

export default DetalhesTccAluno;