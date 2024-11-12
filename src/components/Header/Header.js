import React, { useContext, useState } from 'react'
import { Navbar, Nav, Container, Form, Button, InputGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'
import { GalleryContext } from '../../context/GalleryContext'
import './Header.css'

const Header = () => {
  const { setSearchTerm } = useContext(GalleryContext)
  const [input, setInput] = useState('')

  const handleSearch = () => {
    setSearchTerm(input);
  }

  return (
    <header className="App-header">
      <Navbar expand="lg nav">
        <Container className="nav-container d-flex justify-content-between align-items-center">
          <div className="navLinks d-flex align-items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>
            <Nav variant="underline" className="d-flex">
              <Nav.Item>
                <Nav.Link href="/" className='nav-link'>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/about" className='nav-link'>About The Met</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link href="/art" className='nav-link'>Art</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="search">
            <InputGroup>
              <Button variant="outline-secondary" id="button-addon1" className="search-button" onClick={handleSearch}>
                Buscar
              </Button>
              <Form.Control
                type="text"
                placeholder="Buscar obras..."
                className="me-2 search-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </InputGroup>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header