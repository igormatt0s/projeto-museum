import React from 'react'
import logo from '../../assets/images/logo.png'
import './Nav.css'

const Nav = () => {
  return (
    <nav className="nav">
      <a href="#home"><img src={logo} className="App-logo" alt="logo" /></a>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="/">About The Met</a></li>
        <li><a href="/">Art</a></li>
      </ul>
      <p>Search</p>
    </nav>
  );
};

export default Nav