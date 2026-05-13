import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../imgs/logo-unifor.png';
import livroLogo from '../imgs/Livro_Logo.png';

const Cadastro = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    email: '',
    telefone: '',
    curso: '',
    outrocurso: '',
    senha: '',
    confirmarSenha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCadastro = (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

  const cursoFinal = formData.curso === 'outro' ? formData.outroCurso : formData.curso;

  console.log("Dados prontos para o backend:", { ...formData, curso: cursoFinal });
    
    alert("Cadastro realizado com sucesso!");
    navigate('/login');
  };

  return (
    <div className="login-page-container cadastro-container">
      <div className="login-side-form scrollable-form">
        <div className="brand-container">
            <img 
              src={logoUnifor} 
              alt="Logo Unifor" 
              className="logo-top" 
            />
        </div>
        
        <h1 className="form-title">Crie sua conta</h1>
        <p className="form-subtitle">Preencha os dados abaixo para acessar a plataforma.</p>

        <form onSubmit={handleCadastro} className="main-form">
          <div className="form-group">
            <label>Nome Completo</label>
            <input type="text" name="nome" placeholder="Seu nome completo" onChange={handleChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Matrícula</label>
              <input type="text" name="matricula" placeholder="0000000" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Telefone</label>
              <input type="tel" name="telefone" placeholder="(85) 99999-9999" onChange={handleChange} required />
            </div>
          </div>

          <div className="form-group">
            <label>E-mail Institucional</label>
            <input type="email" name="email" placeholder="nome@edu.unifor.br" onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Curso</label>
            <select name="curso" value={formData.curso} onChange={handleChange} required className="input-select">
              <option value="">Selecione seu curso</option>
              <option value="cienciacomputacao">Ciência da Computação</option>
              <option value="ads">Análise e Desenv. de Sistemas</option>
              <option value="engcivil">Engenharia Civil</option>
              <option value="engmecanica">Engenharia Mecânica</option>
              <option value="engeletrica">Engenharia Elétrica</option>
              <option value="engquimica">Engenharia Química</option>
              <option value="adm">Administração</option>
              <option value="cont">Contabilidade</option>
              <option value="dir">Direito</option>
              <option value="med">Medicina</option>
              <option value="odonto">Odontologia</option>
              <option value="enferm">Enfermagem</option>
              <option value="biomed">Biomedicina</option>
              <option value="fisioterapia">Fisioterapia</option>
              <option value="nutricao">Nutrição</option>
              <option value="EdFisica">Educação Física</option>
              <option value="arquitetura">Arquitetura</option>
              <option value="design">Design</option>
              <option value="comunicacao">Comunicação Social</option>
              <option value="bio">Biologia</option>
              <option value="psico">Psicologia</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          {formData.curso === 'outro' && (
            <div className="form-group" style={{ animation: 'fadeIn 0.3s ease-in-out' }}>
              <label>Especifique seu curso</label>
              <input 
                type="text" 
                name="outroCurso" 
                placeholder="Digite o nome do curso" 
                value={formData.outroCurso}
                onChange={handleChange} 
                required 
              />
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Senha</label>
              <input type="password" name="senha" placeholder="••••••••" onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Confirmar Senha</label>
              <input type="password" name="confirmarSenha" placeholder="••••••••" onChange={handleChange} required />
            </div>
          </div>

          <button type="submit" className="btn-entrar-style">CADASTRAR</button>
          
          <span className="back-link" onClick={() => navigate('/login')}>
            Já tem uma conta? Voltar ao Login
          </span>
        </form>
      </div>

      
      <div className="login-side-image">
        <img src={livroLogo} alt="Marca Livro" className="livro-icon" />
        <div className="info-box-right">
          <p>Sua jornada acadêmica organizada em um só lugar.</p>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;