import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Modal, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { GalleryContext } from '../../context/GalleryContext';
import './Header.css';

const Header = () => {
  const { setSearchTerm, error } = useContext(GalleryContext);
  const [input, setInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = () => {
    if (!input.trim()) {
      setValidationError('Por favor, insira um termo de busca.');
      return;
    }
    setValidationError('');
    setSearchTerm(input);
    navigate('/art');
    setShowSearch(false);
  };

  const clearSearch = () => {
    setInput('');
    setValidationError('');
  };

  return (
    <header className="App-header">
      <Navbar expand="lg nav">
        <Container className="nav-container d-flex justify-content-between align-items-center">
          <div className="navLinks d-flex align-items-center">
            <Link to="/">
              <img src={logo} alt="logo" className="logo" />
            </Link>

            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
              <Nav variant="underline" className="d-flex">
                <Nav.Item>
                  <Nav.Link as={Link} to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About The Met</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/art" className={`nav-link ${location.pathname === '/art' ? 'active' : ''}`}>Art</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </div>
          <div className="search-icon" onClick={() => setShowSearch(true)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <FaSearch size={20} style={{ color: '#FFF' }} />
            <span className="ms-2" style={{ color: '#FFF', fontWeight: 'bold' }}>Search</span>
          </div>
        </Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
      </Navbar>

      <Modal show={showSearch} onHide={() => setShowSearch(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Art</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="search-input">
            <Form.Label>Search art</Form.Label>
            <Form.Control
              type="text"
              placeholder="Buscar obras..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
          {validationError && <Alert variant="warning" className="mt-2">{validationError}</Alert>}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={clearSearch}>
              Limpar
            </Button>
            <Button variant="primary" className="custom-search-button" onClick={handleSearch}>
              Buscar
            </Button>
          </div>
        </Modal.Body>
      </Modal>

      {error && (
        <Alert variant="danger" className="mt-2">
          {error}
        </Alert>
      )}
    </header>
  );
};

export default Header;
