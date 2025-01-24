import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Form, Button, Modal, Alert } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { GalleryContext } from '../../context/GalleryContext';
import { AuthContext } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { setSearchTerm } = useContext(GalleryContext);
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const [validationError, setValidationError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = () => {
    if (!input.trim()) {
      setValidationError('Please, enter a search term.');
      return;
    }
    setValidationError('');
    setSearchTerm(input);
    navigate('/art');
    setShowSearch(false);
    setInput('');
  };

  const clearSearch = () => {
    setInput('');
    setValidationError('');
    setSearchTerm('');
  };

  return (
    <header className="App-header">
      <Navbar expand="lg nav">
        <Container className="nav-container">
          <Link to="/">
            <img src={logo} alt="logo" className="logo" />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="navLinks">
            <Nav variant="underline" className="d-flex">
              <Nav.Item>
                <Nav.Link as={Link} to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link as={Link} to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>About The Met</Nav.Link>
              </Nav.Item>
              {/* Mostrar links para Insert e Search apenas se o usuário estiver logado */}
              {isLoggedIn && (
                <>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/insert" className={`nav-link ${location.pathname === '/insert' ? 'active' : ''}`}>Insert Artwork</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link as={Link} to="/art" className={`nav-link ${location.pathname === '/art' ? 'active' : ''}`} onClick={() => setSearchTerm('')}>Art</Nav.Link>
                  </Nav.Item>
                </>
              )}
              {/* Alternar entre Login e Logout */}
              {!isLoggedIn && (
                <Nav.Item>
                  <Nav.Link as={Link} to="/login" className={`nav-link ${location.pathname === '/login' ? 'active' : ''}`}>Login</Nav.Link>
                </Nav.Item>
              )}
            </Nav>
            {isLoggedIn && (
              <div className="d-flex">
                <div className="search-icon mx-4" onClick={() => setShowSearch(true)}>
                  <FaSearch size={20} style={{ color: '#FFF' }} />
                  <span className="spanText ms-2">Search</span>
                </div>
                <Button variant="link" className="nav-link logout-link" onClick={handleLogout}>Logout</Button>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
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
              placeholder="Search for Works of Art..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </Form.Group>
          {validationError && <Alert variant="warning" className="mt-2">{validationError}</Alert>}
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={clearSearch}>
              Clean
            </Button>
            <Button variant="primary" className="custom-search-button" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </header>
  );
};

export default Header;
