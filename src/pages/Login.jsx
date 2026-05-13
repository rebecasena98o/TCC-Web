import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../imgs/logo-unifor.png';
import livroLogo from '../imgs/Livro_Logo.png';

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const role = email.includes('bib') ? 'LIBRARIAN' : 'STUDENT';
    setUser({ email, role });
    if(role === 'LIBRARIAN') navigate('/LibrarianQueue');
    else navigate('/AlunoDashboard');
  };

  return (
    <div className="login-page-container">
      
      
      <div className="login-side-form">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
            <img 
                 src={logoUnifor} 
                 alt="Logo Unifor" 
                 style={{ 
                 width: '100px',    
                  height: 'auto', 
                 objectFit: 'contain' 
                }} 
               />
        </div>
        
        <h1 style={{color: '#1875E8', fontSize: '32px', marginBottom: '10px'}}>Já fez seu TCC com a gente?</h1>
        <p style={{fontSize: '14px', color: '#666', marginBottom: '30px'}}>Faça seu login e boas correções!</p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>
          
          
          <div className="form-group" style={{marginBottom: '15px'}}>
            <label style={{fontSize: '12px', color: '#333', display: 'block', marginBottom: '5px'}}>E-mail</label>
            <input 
              type="email" 
              placeholder="exemplo@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>

          <div className="form-group" style={{marginBottom: '15px'}}>
            <label style={{fontSize: '12px', color: '#333', display: 'block', marginBottom: '5px'}}>Senha</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required 
            />
          </div>

          <button type="submit" style={{backgroundColor: '#1875E8', color: 'white', padding: '12px', border: 'none', borderRadius: '20px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px'}}>
            ENTRAR
          </button>
          
          <span style={{marginTop: '20px', textAlign: 'center', fontSize: '11px', textDecoration: 'underline', color: '#666'}}>PRIMEIRO ACESSO / ESQUECI MINHA SENHA</span>
        </form>
      </div>

      {/* LADO DIREITO: PAINEL VISUAL*/}
      <div className="login-side-image">
        <img 
          src={livroLogo} 
          alt="Marca Livro" 
          className="livro-icon"
        />
        <div className="info-box-right">
          <p style={{fontSize: '14px', marginBottom: '10px'}}>Ainda não estuda com a gente?</p>
          <button style={{background: 'transparent', border: '1px solid white', color: 'white', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer'}}>
            FAZER MATRÍCULA
          </button>
        </div>
      </div>

    </div>
  );
};

export default Login;