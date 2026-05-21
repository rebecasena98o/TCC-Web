import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUnifor from '../../imgs/LogoUnifor/logo-unifor.png';
import livroLogo from '../../imgs/LogoTccWeb/Livro_Logo.png';
import '../../Style/Register/StyleCadastro.css';

// TODO: substituir por chamada à API quando o backend estiver pronto
const matriculasCadastradas = ['2023001', '2023002', '2022100', '2021999'];

const Cadastro = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    matricula: '',
    email: '',
    telefone: '',
    curso: '',
    outroCurso: '',
    senha: '',
    confirmarSenha: '',
  });

  const [toast, setToast] = useState(null); // { mensagem, tipo: 'erro' | 'sucesso' }

  function exibirToast(mensagem, tipo = 'erro') {
    setToast({ mensagem, tipo });
    setTimeout(() => setToast(null), 3500);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    if (matriculasCadastradas.includes(formData.matricula.trim())) {
      exibirToast('Esta matrícula já está cadastrada. Verifique seus dados.');
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      exibirToast('As senhas não coincidem. Tente novamente.');
      return;
    }

    const cursoFinal =
      formData.curso === 'outro' ? formData.outroCurso : formData.curso;

    // TODO: enviar para o backend
    console.log('Dados prontos para o backend:', {
      ...formData,
      curso: cursoFinal,
    });

    // Simula cadastro bem-sucedido adicionando à lista mock
    matriculasCadastradas.push(formData.matricula.trim());

    exibirToast('Cadastro realizado com sucesso!', 'sucesso');
    setTimeout(() => navigate('/login'), 3500);
  };

  const toastStyle = {
    position: 'fixed',
    top: '24px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#ffffff',
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    fontFamily: 'Inter, sans-serif',
    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
    zIndex: 9999,
    whiteSpace: 'nowrap',
    backgroundColor: toast?.tipo === 'sucesso' ? '#16a34a' : '#b11e11',
  };

  return (
    <div className="cadastro-page-body">

      {toast && (
        <div style={toastStyle}>
          {toast.tipo === 'sucesso' ? '✓' : '✕'} {toast.mensagem}
        </div>
      )}

      <div className="cadastro-container">

        <div className="cadastro-side-form">
          <div className="cadastro-brand-section">
            <img src={logoUnifor} alt="Logo Unifor" className="cadastro-logo" />
          </div>

          <h1 className="cadastro-title">Crie sua conta</h1>
          <p className="cadastro-subtitle">
            Preencha os dados abaixo para acessar a plataforma.
          </p>

          <form onSubmit={handleCadastro}>

            <div className="form-group">
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                placeholder="Seu nome completo"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Matrícula</label>
                <input
                  type="text"
                  name="matricula"
                  placeholder="0000000"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Telefone</label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="(85) 99999-9999"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>E-mail Institucional</label>
              <input
                type="email"
                name="email"
                placeholder="nome@edu.unifor.br"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Curso</label>
              <select
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                required
                className="input-select"
              >
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
              <div
                className="form-group"
                style={{ animation: 'fadeIn 0.3s ease-in-out' }}
              >
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
                <input
                  type="password"
                  name="senha"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Confirmar Senha</label>
                <input
                  type="password"
                  name="confirmarSenha"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn-entrar-style"
              style={{ marginTop: '20px' }}
            >
              CADASTRAR
            </button>

            <span
              className="link-footer"
              onClick={() => navigate('/login')}
            >
              Já tem uma conta? Voltar ao Login
            </span>

          </form>
        </div>

        <div className="cadastro-side-info">
          <img
            src={livroLogo}
            alt="Marca Livro"
            className="cadastro-livro-icon"
          />
          <div className="cadastro-info-box">
            <p>Sua jornada acadêmica organizada em um só lugar.</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cadastro;