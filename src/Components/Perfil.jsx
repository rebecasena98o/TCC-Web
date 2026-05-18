import React, { useState, useEffect } from 'react';
import './StylePerfil.css';
import { useNavigate } from 'react-router-dom';

const Perfil = ({ user, setUser }) => {
    
  const navigate = useNavigate();
  const isLibrarian = user?.role === 'librarian' || 
                      user?.email?.includes('librarian') || 
                      user?.email?.includes('bibliotecario');
                      
  const isAdmin = user?.role === 'admin' || 
                  user?.email?.includes('admin');
                  
  const isAluno = !isLibrarian && !isAdmin;

  const getDiferenciadoPadrao = (tipo) => {
    if (tipo === 'nome') {
      if (isAdmin) return 'Administrador do Sistema';
      if (isLibrarian) return 'Bibliotecário Unifor';
      return 'Aluno Graduação';
    }
    if (tipo === 'email') {
      if (isAdmin) return 'admin@unifor.br';
      if (isLibrarian) return 'bibliotecario@unifor.br';
      return 'aluno@unifor.br';
    }
  };

  const [nome, setNome] = useState(user?.name || user?.nome || getDiferenciadoPadrao('nome'));
  const [email, setEmail] = useState(user?.email || getDiferenciadoPadrao('email'));
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [avatar, setAvatar] = useState(
    user?.avatar || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user?.email || email || 'unifor'}`
  );

  useEffect(() => {
    if (user) {
      if (user.name || user.nome) setNome(user.name || user.nome);
      if (user.email) setEmail(user.email);
      if (user.avatar) setAvatar(user.avatar);
    }
  }, [user]);

  const handleSalvar = (e) => {
    e.preventDefault();
    
    if (isAdmin && senha !== confirmarSenha) {
      alert("As senhas informadas não coincidem!");
      return;
    }

    
    const dadosAtualizados = { ...user };
    dadosAtualizados.name = nome;
    dadosAtualizados.nome = nome;
    dadosAtualizados.avatar = avatar;
    dadosAtualizados.email = email;

    if (isLibrarian || isAdmin) {
      dadosAtualizados.email = email;
    }
    
    if (isAdmin && senha) {
      dadosAtualizados.password = senha; 
    }

    if (setUser) setUser(dadosAtualizados);
    alert("Perfil atualizado com sucesso!");
  };

  const handleTrocarAvatar = () => {
    
    const seeds = ['Felix', 'Aneka', 'Jack', 'Luna', 'Oliver', 'Maya', 'Aria', 'Milo', 'Zoe'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    setAvatar(`https://api.dicebear.com/9.x/avataaars/svg?seed=${randomSeed}`);
  };


  return (
    <div className="perfil-page-container">
      <div className="perfil-card">
        <div className="perfil-card-header">
          <h2>Configurações de Conta</h2>
          <span className={`badge-role ${isAdmin ? 'admin' : isLibrarian ? 'librarian' : 'aluno'}`}>
            {isAdmin ? 'Administrador' : isLibrarian ? 'Bibliotecário' : 'Aluno'}
          </span>
        </div>

        <form onSubmit={handleSalvar} className="perfil-form">
          
          
          <div className="avatar-edit-section">
            <img src={avatar} alt="Foto de Perfil" className="perfil-large-avatar" />
            <button type="button" className="btn-avatar-change" onClick={handleTrocarAvatar}>
              Alterar Imagem
            </button>
          </div>

          
          <div className="form-grid">
            <div className="form-group">
              <label>Nome Completo</label>
              <input 
                type="text" 
                value={nome} 
                onChange={(e) => setNome(e.target.value)} 
                required
              />
            </div>

            <div className="form-group">
              <label>E-mail Corporativo</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                disabled={isAluno} 
                className={isAluno ? "input-disabled" : ""}
                required
              />
              {isAluno && <small className="input-tip">Apenas bibliotecários ou administradores podem alterar o e-mail.</small>}
            </div>

            {isAdmin && (
              <>
                <div className="form-group">
                  <label>Nova Senha</label>
                  <input 
                    type="password" 
                    value={senha} 
                    placeholder="Digite uma nova senha"
                    onChange={(e) => setSenha(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Confirmar Nova Senha</label>
                  <input 
                    type="password" 
                    value={confirmarSenha} 
                    placeholder="Confirme a nova senha"
                    onChange={(e) => setConfirmarSenha(e.target.value)} 
                  />
                </div>
              </>
            )}
          </div>

         
          <div className="perfil-actions-group">
            <button 
              type="button" 
              className="btn-cancelar-perfil" 
              onClick={() => navigate(-1)} 
            >
              Cancelar
            </button>
            
            <button type="submit" className="btn-salvar-perfil">
              Salvar Alterações
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Perfil;