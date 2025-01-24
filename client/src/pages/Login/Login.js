import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Form } from 'react-bootstrap';
import { GalleryContext } from '../../context/GalleryContext';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import './Login.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useContext(GalleryContext);
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/auth/login', { email, password });
      setUser(data.user);
      if (data.token) {
        localStorage.setItem('token', data.token); // Salva o token no localStorage
        login(data.token); // Salva o token no contexto e localStorage
        navigate('/');
      }
    } catch (err) {
      setError('Email ou senha inválidos.');
    }
  };

  return (
    <div className="login-container">
      <h1 className="my-4 text-center">Login</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Button type="submit" className="w-100 mt-5 custom-search-button">Login</Button>
      </Form>
    </div>
  );
};

export default Login;