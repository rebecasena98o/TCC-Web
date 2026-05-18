import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../../imgs/LogoUnifor/logo-unifor.png';
import "../../Style/Admin/StyleDelegacao.css";

const bibliotecarios = [
  { id: 1, nome: 'Dr. Carlos Oliveira' },
  { id: 2, nome: 'Dra. Fernanda Costa' },
  { id: 3, nome: 'Dra. Ana Paula Santos' },
  { id: 4, nome: 'Dr. Ricardo Mendes' },
];

const initialTickets = [
  {
    id: 1,
    aluno: 'Maria Silva',
    titulo: 'Análise de Sistemas de Informação',
    bibliotecario: 'Dr. Carlos Oliveira',
    status: 'Em Revisão',
    data: '2026-04-26',
  },
  {
    id: 2,
    aluno: 'João Santos',
    titulo: 'Impactos da IA no Mercado',
    bibliotecario: 'Dr. Carlos Oliveira',
    status: 'Pendente',
    data: '2026-04-28',
  },
  {
    id: 3,
    aluno: 'Ana Costa',
    titulo: 'Sustentabilidade Corporativa',
    bibliotecario: 'Dra. Fernanda Costa',
    status: 'Em Revisão',
    data: '2026-04-27',
  },
  {
    id: 4,
    aluno: 'Pedro Oliveira',
    titulo: 'Marketing Digital',
    bibliotecario: 'Dra. Ana Paula Santos',
    status: 'Aprovado',
    data: '2026-04-10',
  },
];

const statusClass = {
  'Em Revisão': 'status-em-revisao',
  Pendente: 'status-pendente',
  Aprovado: 'status-aprovado',
  Reprovado: 'status-reprovado',
};

function TransferModal({ ticket, onClose, onConfirm }) {
  const [destino, setDestino] = useState('');
  const [motivo, setMotivo] = useState('');

  const opcoes = bibliotecarios.filter(
    (b) => b.nome !== ticket.bibliotecario
  );

  function handleConfirm() {
    if (!destino) return;
    onConfirm(ticket.id, destino);
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">

        <div className="modal-header">
          <div className="modal-header-left">
            <img
              src={logoUnifor}
              alt="Logo Unifor"
              className="modal-logo"
            />

            <div>
              <h2 className="modal-title">Transferir Revisão</h2>

              <p className="modal-subtitle">
                Transferir trabalho de um bibliotecário para outro
              </p>
            </div>
          </div>

          <button
            className="modal-close-btn"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="modal-body">

          <div className="modal-info-block">
            <span className="modal-label">Trabalho:</span>
            <span className="modal-value">{ticket.titulo}</span>
          </div>

          <div className="modal-info-block">
            <span className="modal-label">Atualmente com:</span>
            <span className="modal-value">
              {ticket.bibliotecario}
            </span>
          </div>

          <div className="modal-field-group">
            <label className="modal-field-label">
              Transferir para:
            </label>

            <select
              className="modal-select"
              value={destino}
              onChange={(e) => setDestino(e.target.value)}
            >
              <option value="">
                Selecione o bibliotecário
              </option>

              {opcoes.map((b) => (
                <option key={b.id} value={b.nome}>
                  {b.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-field-group">
            <label className="modal-field-label">
              Motivo da transferência:
            </label>

            <input
              className="modal-input"
              type="text"
              placeholder="Ex: Sobrecarga de trabalho, férias..."
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
            />
          </div>

        </div>

        <div className="modal-footer">

          <button
            className="btn-cancelar"
            onClick={onClose}
          >
            Cancelar
          </button>

          <button
            className="btn-confirmar"
            onClick={handleConfirm}
            disabled={!destino}
          >
            Confirmar Transferência
          </button>

        </div>
      </div>
    </div>
  );
}

export default function Delegacao({ user }) {

  const navigate = useNavigate();

  const [tickets, setTickets] = useState(initialTickets);

  const [modalTicket, setModalTicket] = useState(null);

  const [feedback, setFeedback] = useState(null);

  const [abaAtiva, setAbaAtiva] = useState('Delegação');

  function handleNavClick(aba) {
    setAbaAtiva(aba);
    if (aba === 'Analytics') navigate('/admin/analytics');
    if (aba === 'Bibliotecários') navigate('/admin/bibliotecarios');
  }

  function abrirModal(ticket) {
    if (ticket.status === 'Aprovado') return;
    setModalTicket(ticket);
  }

  function fecharModal() {
    setModalTicket(null);
  }

  function confirmarTransferencia(id, novoResponsavel) {

    setTickets((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, bibliotecario: novoResponsavel }
          : t
      )
    );

    setFeedback(
      `Transferência realizada com sucesso para ${novoResponsavel}.`
    );

    setModalTicket(null);

    setTimeout(() => setFeedback(null), 3500);
  }

  const innerStyle = {
    margin: '0 32px',
  };

  return (
    <div className="delegacao-page">

      <header
        className="delegacao-header"
        style={innerStyle}
      >

        <div className="delegacao-header-left">

          <h1 className="delegacao-header-title">
            Painel Administrativo - Unifor
          </h1>

          <p className="delegacao-header-sub">
            Bem-vinda,{' '}
            {user?.email?.split('@')[0] ||
              'Maria Licciardi de Lima'}
          </p>

        </div>

        <button
          className="btn-sair"
          onClick={() => navigate('/login')}
        >
          Sair
        </button>

      </header>

      <div
        className="delegacao-top-bar"
        style={innerStyle}
      >

        <img
          src={logoUnifor}
          alt="Logo Unifor"
          className="delegacao-logo"
        />

        <span className="delegacao-top-title">
          Painel Administrativo
        </span>

      </div>

      <nav
        className="delegacao-nav"
        style={innerStyle}
      >

        {['Analytics', 'Delegação', 'Bibliotecários'].map(
          (aba) => (
            <button
              key={aba}
              className={`nav-tab ${
                abaAtiva === aba
                  ? 'nav-tab-active'
                  : ''
              }`}
              onClick={() => handleNavClick(aba)}
            >
              {aba === 'Analytics' && '📊 '}
              {aba === 'Delegação' && '⇄ '}
              {aba === 'Bibliotecários' && '👤 '}
              {aba}
            </button>
          )
        )}

      </nav>

      <main className="delegacao-main">

        {feedback && (
          <div className="delegacao-toast">
            ✓ {feedback}
          </div>
        )}

        <section className="delegacao-card">

          <h2 className="delegacao-card-title">
            Trabalhos e Atribuições
          </h2>

          <table className="delegacao-table">

            <thead>
              <tr>
                <th>Aluno</th>
                <th>Título do TCC</th>
                <th>Bibliotecário Responsável</th>
                <th>Status</th>
                <th>Data de Atribuição</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>

              {tickets.map((t) => (
                <tr key={t.id}>

                  <td>{t.aluno}</td>

                  <td>{t.titulo}</td>

                  <td>{t.bibliotecario}</td>

                  <td>
                    <span
                      className={`status-badge-delegacao ${
                        statusClass[t.status] ?? ''
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td>{t.data}</td>

                  <td>

                    <button
                      className="btn-transferir"
                      onClick={() => abrirModal(t)}
                      disabled={t.status === 'Aprovado'}
                    >
                      ⇄ Transferir
                    </button>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </section>

      </main>

      {modalTicket && (
        <TransferModal
          ticket={modalTicket}
          onClose={fecharModal}
          onConfirm={confirmarTransferencia}
        />
      )}

    </div>
  );
}
