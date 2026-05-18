import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import '../../Style/Register/StyleForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleRecuperar = (e) => {
    e.preventDefault();

    
    if (!email.includes('@unifor.br')) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    
    console.log(`Solicitação de recuperação enviada para: ${email}`);
    setEnviado(true);
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        
        
        <div className="auth-card-header">
          <h2>Recuperar Senha</h2>
          <p className="auth-subtitle">
            {!enviado 
              ? "Insira seu e-mail corporativo para receber as instruções de redefinição."
              : "Verifique a sua caixa de entrada!"}
          </p>
        </div>

        {!enviado ? (
          
          <form onSubmit={handleRecuperar} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">E-mail Cadastrado</label>
              <div className="input-with-icon">
                <FaEnvelope className="input-icon" />
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="exemplo@unifor.br" 
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn-auth-primary">
              Enviar Link de Recuperação
            </button>
          </form>
        ) : (
          
          <div className="feedback-sucesso-container">
            <div className="feedback-icon-success">✓</div>
            <p className="feedback-text">
              Um link de redefinição de senha foi enviado para <strong>{email}</strong>. 
              O link expira em 30 minutos.
            </p>
            <button 
              type="button" 
              className="btn-auth-primary" 
              onClick={() => setEnviado(false)}
            >
              Reenviar E-mail
            </button>
          </div>
        )}

        
        <div className="auth-card-footer">
          <button 
            type="button" 
            className="btn-voltar-login" 
            onClick={() => navigate('/login')}
          >
            <FaArrowLeft className="icon-seta" /> Voltar para o Login
          </button>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;