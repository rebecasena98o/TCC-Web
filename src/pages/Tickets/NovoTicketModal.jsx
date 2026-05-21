import React, { useState } from 'react';
import { FaBook, FaGraduationCap, FaCommentAlt, FaPaperclip, FaTimes } from 'react-icons/fa';
import '../../Style/Ticket/StyleTicket.css';

const NovoTicketModal = ({ isOpen, onClose, user, onAddTicket }) => {

  const [tema, setTema] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [toast, setToast] = useState(null);

  if (!isOpen) return null;

  const cursoUsuario = user?.course || user?.curso || 'Curso Não Identificado';

  function exibirToast(mensagem, tipo = 'erro') {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3500);
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setArquivo(file);
  };

  const handleSubmeterTicket = (e) => {
    e.preventDefault();

    if (!tema.trim() || !arquivo) {
      exibirToast('Por favor, preencha o tema e anexe o arquivo do seu TCC!');
      return;
    }

    const novoTicketPayload = {
      aluno: user?.name || user?.email,
      curso: cursoUsuario,
      title: tema,
      description: observacoes,
      file: arquivo.name,
      sentDate: new Date().toISOString().split('T')[0],
      status: 'PENDENTE',
    };

    console.log('Enviando Novo Ticket para a Fila do Bibliotecário:', novoTicketPayload);

    if (typeof onAddTicket === 'function') {
      // Passa tema e observações para o pai poder incluir a observação
      // como primeira mensagem do chat ao navegar para DetalhesTccAluno
      onAddTicket({ tema, observacoes: observacoes.trim() });
    }

    setTema('');
    setObservacoes('');
    setArquivo(null);
    onClose();
  };

  const toastStyle = {
    position: 'absolute',
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: '#b11e11',
    color: '#ffffff',
    padding: '10px 20px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '500',
    fontFamily: 'Inter, sans-serif',
    zIndex: 99,
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(177,30,17,0.3)',
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card" style={{ position: 'relative' }}>

        {toast && <div style={toastStyle}>✕ {toast.mensagem}</div>}

        <button type="button" className="btn-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modal-header">
          <h2>Cadastrar Novo TCC</h2>
          <p>Abra um ticket para enviar seu trabalho para a validação da biblioteca.</p>
        </div>

        <form onSubmit={handleSubmeterTicket} className="modal-form">

          <div className="modal-form-group">
            <label htmlFor="tema">Nome do TCC / Tema *</label>
            <div className="modal-input-wrapper">
              <FaBook className="input-icon" />
              <input
                type="text"
                id="tema"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Ex: Impactos da IA na Engenharia de Software"
                required
              />
            </div>
          </div>

          <div className="modal-form-group">
            <label htmlFor="curso">Curso Vinculado</label>
            <div className="modal-input-wrapper field-disabled">
              <FaGraduationCap className="input-icon" />
              <input
                type="text"
                id="curso"
                value={cursoUsuario}
                disabled
                readOnly
              />
            </div>
          </div>

          <div className="modal-form-group">
            <label htmlFor="observacoes">
              Observações{' '}
              <span style={{ fontSize: '11px', color: '#6b7280', fontWeight: 400 }}>
                (será enviada como primeira mensagem ao bibliotecário)
              </span>
            </label>
            <div className="modal-input-wrapper text-area-wrapper">
              <FaCommentAlt className="input-icon textarea-icon" />
              <textarea
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Descreva pontos de atenção, versão do arquivo ou dúvidas para o bibliotecário..."
                rows="3"
              />
            </div>
          </div>

          <div className="file-upload-container">
            <input
              type="file"
              id="file-tcc-upload"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label
              htmlFor="file-tcc-upload"
              className={`btn-upload-trigger ${arquivo ? 'file-attached' : ''}`}
            >
              <FaPaperclip />{' '}
              {arquivo ? 'Alterar Arquivo Anexado' : 'Anexar TCC (Obrigatório) *'}
            </label>

            {arquivo && (
              <span className="file-status-label">
                Arquivo selecionado: <strong>{arquivo.name}</strong>
              </span>
            )}
          </div>

          <div className="modal-footer-actions">
            <button type="button" className="btn-modal-cancel" onClick={onClose}>
              Cancelar
            </button>

            <button
              type="submit"
              className="btn-modal-submit"
              disabled={!arquivo || !tema.trim()}
            >
              Abrir Ticket
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NovoTicketModal;