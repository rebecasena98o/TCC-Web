import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../../imgs/LogoUnifor/logo-unifor.png';
import livroLogo from '../../imgs/LogoTccWeb/Livro_Logo.png';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@unifor.br") {
      
      setUser({ email, role: 'admin' });
      navigate('/admin/delegacao');
      
    } else if (email === "bibliotecario@unifor.br" || email.includes('bib')) {
      setUser({ email, role: 'LIBRARIAN' });
      navigate('/librarian/queue');
      
    } else {
      
      setUser({ email, role: 'STUDENT' });
      navigate('/aluno/homealuno');
    }
  };

  const handleForgotPassword = () => {
    alert("Um e-mail de recuperação foi enviado para o endereço cadastrado!");
  };

  return (
    <div className="login-page-container">
      
      
      <div className="login-side-form">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <img 
                 src={logoUnifor} 
                 alt="Logo Unifor" 
                 style={{ 
                 width: '150px',           
                 objectFit: 'contain' 
                }} 
               />
        </div>
        
        <h1 
        style={{
          color: '#1875E8',
          fontSize: '20px', 
          marginBottom: '10px', 
          textAlign: 'center', 
          }}
          >Já corrigiu seu TCC com a gente?</h1>
        <p 
        style={{
          fontSize: '14px', 
          color: '#666', 
          marginBottom: '30px', 
           textAlign: 'center' 
  }}
          >Faça seu login e boas correções!</p>


        <form onSubmit={handleLogin} style={{
           display: 'flex',
           flexDirection: 'column' 
           }}>
          
          
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label style={{fontSize: '14px', color: '#333', display: 'block', marginBottom: '5px'}}>E-mail</label>
            <input 
              type="Matrícula" 
              placeholder="Exemplo: 202312345"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group" style={{marginBottom: '15px'}}>
            <label style={{fontSize: '14px', color: '#333', display: 'block', marginBottom: '5px'}}>Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required 
            />
          </div>

          <button type="submit" 
          className="btn-entrar-style">
                  ENTRAR
          </button>
          
          <div style={{ 
            marginTop: '20px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '8px', 
            alignItems: 'center' 
          }}>
          </div>

          <span style={{
              fontSize: '12px',
              textDecoration: 'underline',
              textAlign: 'center',
              marginBottom: '10px',
              color: '#cf1616',
              cursor: 'pointer'
            }}
            onClick={handleForgotPassword}>
              ESQUECI MINHA SENHA
            </span>
          
          </form>
      </div>

      <div className="login-side-image">
        <img 
          src={livroLogo} 
          alt="Marca Livro" 
          className="livro-icon"
        />
        <div className="info-box-right">
          <p style={{
            fontSize: '15px',
            marginBottom: '10px'
            }}>Não tem uma conta?</p>
            
          <button className="btn-cadastro-outline" 
            onClick={() => navigate('/cadastro')} 
            >FAÇA SEU CADASTRO</button>
          </div>
        </div>

      </div>
  );
};

export default Login;