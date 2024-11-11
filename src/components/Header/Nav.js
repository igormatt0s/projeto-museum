import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import './Nav.css'

const Nav = () => {
  return (
    <nav className="nav">
      <div className='navLinks'>
        <Link to="/"><img src={logo} className="App-logo" alt="logo" /></Link>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/about">Sobre The Met</Link></li>
          <li><Link to="/art">Arte</Link></li>
        </ul>
      </div>
      <p>Busca</p>
    </nav>
  );
};

export default Nav