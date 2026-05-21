import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../../../../../Style/Ticket/StyleSuporteIA.css';

const SuporteIAModal = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState('');
  const [ticket, setTicket] = useState('');
  const [resposta, setResposta] = useState('');

  if (!isOpen) return null;

  const handleEnviar = () => {
    console.log({
      prompt,
      ticket
    });

    // Simulação de resposta IA
    setResposta('Resposta gerada pela IA...');
  };

  return (
    <div className="modal-overlay">
      <div className="suporte-ia-modal">

        <div className="suporte-ia-header">
          <h2>Suporte IA</h2>

          <button
            type="button"
            className="btn-close-suporte"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        <div className="suporte-ia-body">

          <div className="suporte-form-group">
            <label>Prompt</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Digite o prompt..."
              rows="4"
            />
          </div>

          <div className="suporte-form-group">
            <label>Ticket</label>
            <textarea
              value={ticket}
              onChange={(e) => setTicket(e.target.value)}
              placeholder="Digite as informações do ticket..."
              rows="4"
            />
          </div>

          <button
            className="btn-enviar-ia"
            onClick={handleEnviar}
          >
            Enviar
          </button>

          <div className="suporte-form-group">
            <label>Resposta</label>
            <textarea
              value={resposta}
              readOnly
              placeholder="A resposta da IA aparecerá aqui..."
              rows="6"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SuporteIAModal;