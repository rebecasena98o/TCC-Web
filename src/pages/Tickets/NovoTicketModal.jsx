import React, { useState } from 'react';
import { FaBook, FaGraduationCap, FaCommentAlt, FaPaperclip, FaTimes } from 'react-icons/fa';
import '../../Style/Ticket/StyleTicket.css';

const NovoTicketModal = ({ isOpen, onClose, user, onAddTicket}) => {
  
  const [tema, setTema] = useState('');
  const [observacoes, setObservacoes] = useState('');
  const [arquivo, setArquivo] = useState(null);

  if (!isOpen) return null;

  const cursoUsuario = user?.course || user?.curso || "Curso Não Identificado";

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArquivo(file);
    }
  };

  const handleSubmeterTicket = (e) => {
    e.preventDefault();
    
    
    if (!tema.trim() || !arquivo) {
      alert("Por favor, preencha o tema e anexe o arquivo do seu TCC!");
      return;
    }

    // Estrutura do payload simulando o envio para o backend
    const novoTicketPayload = {
      aluno: user?.name || user?.email,
      curso: cursoUsuario,
      title: tema,
      description: observacoes,
      file: arquivo.name,
      sentDate: new Date().toISOString().split('T')[0], // Data atual formato YYYY-MM-DD
      status: 'PENDENTE'
    };

    console.log("Enviando Novo Ticket para a Fila do Bibliotecário:", novoTicketPayload);
    alert("Ticket aberto com sucesso! Seu TCC foi enviado para a fila de avaliação.");

    if (typeof onAddTicket === 'function') {
      onAddTicket(tema);
    }
    
    setTema('');
    setObservacoes('');
    setArquivo(null);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        
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
            <label htmlFor="observacoes">Observações (Opcional)</label>
            <div className="modal-input-wrapper text-area-wrapper">
              <FaCommentAlt className="input-icon textarea-icon" />
              <textarea 
                id="observacoes"
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                placeholder="Insira notas adicionais sobre a versão do arquivo, se necessário..."
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
            <label htmlFor="file-tcc-upload" className={`btn-upload-trigger ${arquivo ? 'file-attached' : ''}`}>
              <FaPaperclip /> {arquivo ? 'Alterar Arquivo Anexado' : 'Anexar TCC (Obrigatório) *'}
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