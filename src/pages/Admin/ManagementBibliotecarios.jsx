import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../../imgs/LogoUnifor/logo-unifor.png';
import '../../Style/StyleGlobal.css';
import '../../Style/Admin/StyleDelegacao.css';

const bibliotecariosIniciais = [
  { id: 1, nome: 'Carlos Oliveira', email: 'carlos@unifor.br', matricula: 'BIB001', telefone: '(85) 99999-1111', curso: 'Biblioteconomia', status: 'Ativo' },
  { id: 2, nome: 'Fernanda Costa', email: 'fernanda@unifor.br', matricula: 'BIB002', telefone: '(85) 99999-2222', curso: 'Biblioteconomia', status: 'Ativo' },
  { id: 3, nome: 'Ana Paula Santos', email: 'ana@unifor.br', matricula: 'BIB003', telefone: '(85) 99999-3333', curso: 'Biblioteconomia', status: 'Inativo' },
];

const camposVazios = { nome: '', email: '', matricula: '', telefone: '', senha: '', curso: '' };

function BibliotecarioModal({ bibliotecario, onClose, onSave }) {
  const [form, setForm] = useState(bibliotecario ? { ...bibliotecario, senha: '' } : { ...camposVazios });
  const isEdicao = !!bibliotecario;

  const campos = [
    { label: 'Nome Completo', name: 'nome', type: 'text' },
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
                value={form[name] || ''}
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
            disabled={!form.nome || !form.email || !form.matricula}
            onClick={() => onSave(form)}
          >
            {isEdicao ? 'Salvar' : 'Adicionar'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ManagementBibliotecarios({ user }) {
  const navigate = useNavigate();
  const [bibliotecarios, setBibliotecarios] = useState(bibliotecariosIniciais);
  const [modalBibliotecario, setModalBibliotecario] = useState(undefined);

  
  const abaAtiva = 'Bibliotecários';

  function handleNavClick(aba) {
    if (aba === 'Analytics') navigate('/admin/analytics');
    if (aba === 'Delegação') navigate('/admin/delegacao');
    if (aba === 'Bibliotecários') navigate('/admin/bibliotecarios');
  }

  function alterarStatus(id) {
    setBibliotecarios((prev) => prev.map((b) => b.id === id ? { ...b, status: b.status === 'Ativo' ? 'Inativo' : 'Ativo' } : b));
  }

  function excluirBibliotecario(id) {
    if (window.confirm("Tem certeza de que deseja excluir este bibliotecário?")) {
      setBibliotecarios((prev) => prev.filter((b) => b.id !== id));
    }
  }

  function salvarBibliotecario(form) {
    if (form.id) {
      setBibliotecarios((prev) => prev.map((b) => b.id === form.id ? { ...b, ...form } : b));
    } else {
      setBibliotecarios((prev) => [{ ...form, id: Date.now(), status: 'Ativo' }, ...prev]);
    }
    setModalBibliotecario(undefined);
  }

  const innerStyle = { margin: '0 32px' };

  return (
    <div className="delegacao-page">
      
      <header className="delegacao-header" style={innerStyle}>
        <div className="delegacao-header-left">
          <h1 className="delegacao-header-title">Painel Administrativo - Unifor</h1>
          <p className="delegacao-header-sub">
            Bem-vinda, {user?.email?.split('@')[0] || 'Maria Licciardi de Lima'}
          </p>
        </div>
        <button className="btn-sair" onClick={() => navigate('/login')}>Sair</button>
      </header>

      <div className="delegacao-top-bar" style={innerStyle}>
        <img src={logoUnifor} alt="Logo Unifor" className="delegacao-logo" />
        <span className="delegacao-top-title">Painel Administrativo</span>
      </div>

      <nav className="delegacao-nav" style={innerStyle}>
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

      <main className="delegacao-main">
        <section className="delegacao-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h2 className="delegacao-card-title" style={{ margin: 0 }}>Gerenciamento de Bibliotecários</h2>
              <p style={{ margin: '4px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>Gerencie os dados cadastrais, status ativos e remoções</p>
            </div>
            <button className="btn-confirmar" style={{ width: 'auto', padding: '10px 20px' }} onClick={() => setModalBibliotecario(null)}>
              + Adicionar Bibliotecário
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
                <th style={{ textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {bibliotecarios.map((b) => (
                <tr key={b.id}>
                  <td><strong>{b.nome}</strong></td>
                  <td>{b.email}</td>
                  <td>{b.matricula}</td>
                  <td>{b.telefone}</td>
                  <td>{b.curso}</td>
                  <td>
                    <span className={`status-badge-delegacao ${b.status === 'Ativo' ? 'status-aprovado' : 'status-pendente'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                      <button className="btn-transferir" onClick={() => setModalBibliotecario(b)}>✏️ Editar</button>
                      <button 
                        className="btn-cancelar" 
                        style={{ 
                          color: b.status === 'Ativo' ? '#c2410c' : '#166534',
                          borderColor: b.status === 'Ativo' ? '#c2410c' : '#166534',
                          backgroundColor: b.status === 'Ativo' ? '#fff7ed' : '#f0fdf4'
                        }} 
                        onClick={() => alterarStatus(b.id)}
                      >
                        {b.status === 'Ativo' ? '🛑 Inativar' : '🟢 Ativar'}
                      </button>
                      <button className="btn-cancelar" style={{ backgroundColor: '#fef2f2', color: '#991b1b', borderColor: '#991b1b' }} onClick={() => excluirBibliotecario(b.id)}>🗑️ Excluir</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>

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