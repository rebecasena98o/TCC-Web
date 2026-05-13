import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Style/StyleHeader.css';
import SininhoIcon from '../imgs/sininho-notification.png'; 

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <header className="main-header">
      <div className="header-container-home">
        
        
        <div className="header-left">
          <h1 className="brand-title">Sistema de Revisão de TCC - Unifor</h1>
          <p className="welcome-subtitle">Bem-vindo, {user?.email?.split('@')[0] || 'Maria Silva'}</p>
        </div>
        
        
        <div className="header-right">
          <div className="notification-bell">
            <img src={SininhoIcon} alt="Notificações" className="bell-img" />
            <span className="notification-badge"></span>
          </div>

          <div className="user-profile-group">
            <div className="user-avatar-container">
              
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                alt="Avatar" 
                className="user-avatar" 
              />
            </div>
            <span className="user-name-display">{user?.email?.split('@')[0] || 'Rebeca'}</span>
            <span className="dropdown-arrow">∨</span>
          </div>

          <button className="btn-sair-header" onClick={() => navigate('/login')}>
            Sair
          </button>
        </div>

      </div>
    </header>
  );
};

export default Header;