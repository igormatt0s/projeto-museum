import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { GalleryContext } from '../../context/GalleryContext'
import logo from '../../assets/images/logo.png'
import './Nav.css'

const Nav = () => {
  const { setSearchTerm } = useContext(GalleryContext)
  const [input, setInput] = useState('')

  const handleSearch = () => {
    setSearchTerm(input)
  };

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
      <div className="search">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Buscar obras..."
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">
          🔍
        </button>
      </div>
    </nav>
  );
};

export default Nav