import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../../imgs/LogoUnifor/logo-unifor.png';
import livroLogo from '../../imgs/LogoTccWeb/Livro_Logo.png';

const mockUsers = [
  { email: 'admin@unifor.br',          senha: 'admin123',  role: 'admin',    redirect: '/admin/analytics' },
  { email: 'bibliotecario@unifor.br',  senha: 'bib123',    role: 'librarian', redirect: '/librarian/queue' },
  { email: 'aluno@unifor.br',          senha: 'aluno123',  role: 'STUDENT',  redirect: '/aluno/homealuno' },
];

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    const usuario = mockUsers.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuario) {
      setErro('Credenciais incorretas');
      setTimeout(() => setErro(null), 3500);
      return;
    }

    setUser({ email: usuario.email, role: usuario.role });
    navigate(usuario.redirect);
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-page-container">

      {erro && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#b11e11',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '8px',
          fontSize: '14px',
          fontWeight: '500',
          fontFamily: 'Inter, sans-serif',
          boxShadow: '0 4px 16px rgba(177,30,17,0.3)',
          zIndex: 9999,
          whiteSpace: 'nowrap',
          animation: 'fadeInDown 0.3s ease',
        }}>
          ✕ {erro}
        </div>
      )}

      <div className="login-side-form">
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <img
            src={logoUnifor}
            alt="Logo Unifor"
            style={{ width: '150px', objectFit: 'contain' }}
          />
        </div>

        <h1 style={{ color: '#1875E8', fontSize: '20px', marginBottom: '10px', textAlign: 'center' }}>
          Já corrigiu seu TCC com a gente?
        </h1>
        <p style={{ fontSize: '14px', color: '#666', marginBottom: '30px', textAlign: 'center' }}>
          Faça seu login e boas correções!
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column' }}>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#333', display: 'block', marginBottom: '5px' }}>
              E-mail
            </label>
            <input
              type="email"
              placeholder="Exemplo: aluno@unifor.br"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label style={{ fontSize: '14px', color: '#333', display: 'block', marginBottom: '5px' }}>
              Senha
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-entrar-style">
            ENTRAR
          </button>

          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'center' }}>
            <span
              style={{
                fontSize: '12px',
                textDecoration: 'underline',
                textAlign: 'center',
                marginBottom: '10px',
                color: '#cf1616',
                cursor: 'pointer',
              }}
              onClick={handleForgotPassword}
            >
              ESQUECI MINHA SENHA
            </span>
          </div>

        </form>
      </div>

      <div className="login-side-image">
        <img src={livroLogo} alt="Marca Livro" className="livro-icon" />
        <div className="info-box-right">
          <p style={{ fontSize: '15px', marginBottom: '10px' }}>Não tem uma conta?</p>
          <button className="btn-cadastro-outline" onClick={() => navigate('/cadastro')}>
            FAÇA SEU CADASTRO
          </button>
        </div>
      </div>

    </div>
  );
};

export default Login;