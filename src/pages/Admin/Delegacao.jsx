import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/Header';
import logoUnifor from '../../imgs/LogoUnifor/logo-unifor.png';
import '../../Style/StyleGlobal.css';
import '../../Style/Admin/StyleDelegacao.css';

const bibliotecariosIniciais = [
  { id: 1, nome: 'Carlos Oliveira', email: 'carlos@unifor.br', matricula: 'BIB001', telefone: '(85) 99999-1111', curso: 'Biblioteconomia', status: 'Ativo' },
  { id: 2, nome: 'Fernanda Costa', email: 'fernanda@unifor.br', matricula: 'BIB002', telefone: '(85) 99999-2222', curso: 'Biblioteconomia', status: 'Ativo' },
  { id: 3, nome: 'Ana Paula Santos', email: 'ana@unifor.br', matricula: 'BIB003', telefone: '(85) 99999-3333', curso: 'Biblioteconomia', status: 'Inativo' },
];

const initialTickets = [
  { id: 1, aluno: 'Maria Silva', titulo: 'Análise de Sistemas de Informação', bibliotecario: 'Carlos Oliveira', status: 'Em Revisão', data: '2026-04-26' },
  { id: 2, aluno: 'João Santos', titulo: 'Impactos da IA no Mercado', bibliotecario: 'Carlos Oliveira', status: 'Pendente', data: '2026-04-28' },
  { id: 3, aluno: 'Ana Costa', titulo: 'Sustentabilidade Corporativa', bibliotecario: 'Fernanda Costa', status: 'Em Revisão', data: '2026-04-27' },
  { id: 4, aluno: 'Pedro Oliveira', titulo: 'Marketing Digital', bibliotecario: 'Ana Paula Santos', status: 'Aprovado', data: '2026-04-10' },
];

const statusClass = {
  'Em Revisão': 'status-em-revisao',
  Pendente: 'status-pendente',
  Aprovado: 'status-aprovado',
  Reprovado: 'status-reprovado',
};

const camposVazios = { nome: '', email: '', matricula: '', telefone: '', senha: '', curso: '' };

function TransferModal({ ticket, bibliotecarios, onClose, onConfirm }) {
  const [destino, setDestino] = useState('');
  const opcoes = bibliotecarios.filter((b) => b.nome !== ticket.bibliotecario);

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-header-left">
            <img src={logoUnifor} alt="Logo" className="modal-logo" />
            <div>
              <h2 className="modal-title">Transferir Revisão</h2>
              <p className="modal-subtitle">Selecione o novo responsável</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="modal-info-block">
            <span className="modal-label">Aluno</span>
            <span className="modal-value">{ticket.aluno}</span>
          </div>
          <div className="modal-info-block">
            <span className="modal-label">Título</span>
            <span className="modal-value">{ticket.titulo}</span>
          </div>
          <div className="modal-field-group">
            <label className="modal-field-label">Transferir para:</label>
            <select className="modal-select" value={destino} onChange={(e) => setDestino(e.target.value)}>
              <option value="">Selecione</option>
              {opcoes.map((b) => (
                <option key={b.id} value={b.nome}>{b.nome}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button className="btn-confirmar" disabled={!destino} onClick={() => onConfirm(ticket.id, destino)}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}

function BibliotecarioModal({ bibliotecario, onClose, onSave }) {
  const [form, setForm] = useState(bibliotecario ? { ...bibliotecario, senha: '' } : { ...camposVazios });
  const isEdicao = !!bibliotecario;

  const campos = [
    { label: 'Nome', name: 'nome', type: 'text' },
    { label: 'E-mail', name: 'email', type: 'email' },
    { label: 'Matrícula', name: 'matricula', type: 'text' },
    { label: 'Telefone', name: 'telefone', type: 'text' },
    { label: 'Curso', name: 'curso', type: 'text' },
    { label: isEdicao ? 'Nova Senha (deixe em branco para não alterar)' : 'Senha', name: 'senha', type: 'password' },
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <div className="modal-header">
          <div className="modal-header-left">
            <img src={logoUnifor} alt="Logo" className="modal-logo" />
            <div>
              <h2 className="modal-title">{isEdicao ? 'Editar Bibliotecário' : 'Adicionar Bibliotecário'}</h2>
              <p className="modal-subtitle">{isEdicao ? 'Altere os dados abaixo' : 'Preencha os dados do novo bibliotecário'}</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          {campos.map(({ label, name, type }) => (
            <div className="modal-field-group" key={name}>
              <label className="modal-field-label">{label}</label>
              <input
                className="modal-input"
                type={type}
                name={name}
                value={form[name]}
                onChange={(e) => setForm({ ...form, [e.target.name]: e.target.value })}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="btn-cancelar" onClick={onClose}>Cancelar</button>
          <button
            className="btn-confirmar"
            disabled={!form.nome || !form.email || !form.matricula || !form.curso}
            onClick={() => onSave(form)}
          >
            {isEdicao ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Delegacao({ user, setUser }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [bibliotecarios, setBibliotecarios] = useState(bibliotecariosIniciais);
  const [modalTicket, setModalTicket] = useState(null);
  const [modalBibliotecario, setModalBibliotecario] = useState(undefined);
  const [abaAtiva, setAbaAtiva] = useState('Delegação');

  function confirmarTransferencia(id, novoResponsavel) {
    setTickets((prev) => prev.map((t) => t.id === id ? { ...t, bibliotecario: novoResponsavel } : t));
    setModalTicket(null);
  }

  function alterarStatus(id) {
    setBibliotecarios((prev) => prev.map((b) => b.id === id ? { ...b, status: b.status === 'Ativo' ? 'Inativo' : 'Ativo' } : b));
  }

  function excluirBibliotecario(id) {
    setBibliotecarios((prev) => prev.filter((b) => b.id !== id));
  }

  function salvarBibliotecario(form) {
    if (form.id) {
      setBibliotecarios((prev) => prev.map((b) => b.id === form.id ? { ...b, ...form } : b));
    } else {
      setBibliotecarios((prev) => [{ ...form, id: Date.now(), status: 'Ativo' }, ...prev]);
    }
    setModalBibliotecario(undefined);
  }

  return (
    <div className="dashboard-wrapper">
      <Header user={user} setUser={setUser} />

      <main className="content-container" style={{ paddingTop: '110px' }}>

        <div className="content-header">
          <div>
            <h2 className="section-title">Painel Administrativo</h2>
            <p className="section-subtitle">Gerencie delegações e bibliotecários</p>
          </div>
        </div>

        <div className="delegacao-nav-clean">
          {[
            { label: 'Analytics', icon: '📊' },
            { label: 'Delegação', icon: '⇄' },
            { label: 'Bibliotecários', icon: '👤' },
          ].map(({ label, icon }) => (
            <button
              key={label}
              className={`nav-tab-clean ${abaAtiva === label ? 'nav-tab-clean-active' : ''}`}
              onClick={() => setAbaAtiva(label)}
            >
              {icon} {label}
            </button>
          ))}
        </div>

        <div className="tcc-card" style={{ padding: '28px 32px', borderRadius: '12px' }}>

          {abaAtiva === 'Delegação' && (
            <>
              <h3 className="delegacao-card-title">Trabalhos e Atribuições</h3>
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
                        <span className={`status-badge-delegacao ${statusClass[t.status]}`}>
                          {t.status}
                        </span>
                      </td>
                      <td>{t.data}</td>
                      <td>
                        <button
                          className="btn-transferir"
                          disabled={t.status === 'Aprovado'}
                          onClick={() => setModalTicket(t)}
                        >
                          ⇄ Transferir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {abaAtiva === 'Bibliotecários' && (
            <>
              <div className="content-header" style={{ marginBottom: '20px' }}>
                <h3 className="delegacao-card-title">Bibliotecários</h3>
                <button className="btn-novo-tcc" onClick={() => setModalBibliotecario(null)}>
                  <span>+</span> Adicionar
                </button>
              </div>
              <table className="delegacao-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Matrícula</th>
                    <th>Telefone</th>
                    <th>Curso</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {bibliotecarios.map((b) => (
                    <tr key={b.id}>
                      <td>{b.nome}</td>
                      <td>{b.email}</td>
                      <td>{b.matricula}</td>
                      <td>{b.telefone}</td>
                      <td>{b.curso}</td>
                      <td>
                        <span className={`status-badge-delegacao ${b.status === 'Ativo' ? 'status-aprovado' : 'status-pendente'}`}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn-transferir" onClick={() => setModalBibliotecario(b)}>Editar</button>
                        <button className="btn-cancelar" onClick={() => alterarStatus(b.id)}>
                          {b.status === 'Ativo' ? 'Inativar' : 'Ativar'}
                        </button>
                        <button className="btn-cancelar" onClick={() => excluirBibliotecario(b.id)}>Excluir</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {abaAtiva === 'Analytics' && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
              <span style={{ fontSize: '48px' }}>📊</span>
              <p style={{ marginTop: '16px', fontSize: '16px' }}>Analytics em desenvolvimento</p>
            </div>
          )}

        </div>
      </main>

      {modalTicket && (
        <TransferModal
          ticket={modalTicket}
          bibliotecarios={bibliotecarios}
          onClose={() => setModalTicket(null)}
          onConfirm={confirmarTransferencia}
        />
      )}

      {modalBibliotecario !== undefined && (
        <BibliotecarioModal
          bibliotecario={modalBibliotecario}
          onClose={() => setModalBibliotecario(undefined)}
          onSave={salvarBibliotecario}
        />
      )}
    </div>
  );
}