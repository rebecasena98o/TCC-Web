import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './StyleHeader.css';
import { FaArrowLeft, FaUser, FaSignOutAlt } from 'react-icons/fa';
import DropdownNotification from './DropdownNotification.jsx';
import SininhoIcon from '../imgs/Header/sininho-notification.png';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const estaNaTelaDoTicket = location.pathname === '/detalhes-tcc';
  const isLibrarian = user?.role === 'librarian' || user?.email?.includes('librarian');
  const isAdmin = user?.role === 'admin' || user?.email?.includes('admin');

  const toggleProfileDropdown = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleVoltarPainel = () => {
    if (isAdmin) {
      navigate('/admin/delegacao');
    } else if (isLibrarian) {
      navigate('/LibrarianQueue');
    } else {
      navigate('/aluno/homealuno');
    }
  };

  const handleLogout = () => {
    if (setUser) setUser(null);
    navigate('/login');
  };

  const getNomeExibicao = () => {
    return user?.name || user?.nome || user?.email?.split('@')[0] || 'Usuário';
  };

  return (
    <header className="main-header">
      <div className="header-container-home">

        <div className="header-left-group">
          <div className="header-title-row">
            {estaNaTelaDoTicket && (
              <button onClick={handleVoltarPainel} className="btn-voltar-header">
                <FaArrowLeft className="icon-voltar" /> Voltar
              </button>
            )}
            <h1 className="brand-title">
              {isAdmin
                ? 'Painel Administrativo - Unifor'
                : 'Sistema de Revisão de TCC - Unifor'}
            </h1>
          </div>

          <p className="welcome-subtitle">
            {isAdmin
              ? `Bem-vindo, Administrador`
              : `Bem-vindo, ${getNomeExibicao()}`}
          </p>
        </div>

        <div className="header-right">
          <DropdownNotification user={user} customIcon={SininhoIcon} />

          <div className="profile-dropdown-container">
            <div className="user-profile-group" onClick={toggleProfileDropdown}>
              <div className="user-avatar-container">
                <img
                  src={user?.avatar || "https://api.dicebear.com/9.x/avataaars/svg?seed=Felix"}
                  alt="Avatar"
                  className="user-avatar"
                />
              </div>
              <span className="user-name-display">{getNomeExibicao()}</span>
              <span className={`dropdown-arrow ${isProfileOpen ? 'open' : ''}`}>∨</span>
            </div>

            {isProfileOpen && (
              <div className="profile-dropdown-content">
                <div className="profile-dropdown-info">
                  <strong>{getNomeExibicao()}</strong>
                  <span>{user?.email || 'admin@unifor.br'}</span>
                </div>
                <hr className="dropdown-divider" />
                <button className="dropdown-item" onClick={() => { navigate('/perfil'); setIsProfileOpen(false); }}>
                  <FaUser className="item-icon" /> Perfil
                </button>
                <button className="dropdown-item logout" onClick={handleLogout}>
                  <FaSignOutAlt className="item-icon" /> Sair
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;