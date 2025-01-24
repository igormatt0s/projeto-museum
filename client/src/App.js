import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Aside from './components/Aside/Aside';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Art from './pages/Art/Art';
import DepartmentGallery from './pages/DepartmentGallery/DepartmentGallery';
import ArtDetails from './pages/ArtDetails/ArtDetails';
import Login from './pages/Login/Login';
import InsertArtwork from './pages/InsertArtwork/InsertArtwork';
import GalleryProvider from './context/GalleryContext';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Container, Button } from 'react-bootstrap';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function App() {
  const [isAsideVisible, setIsAsideVisible] = useState(false);

  const toggleAside = () => {
    setIsAsideVisible((prev) => !prev);
  };

  // Rota protegida - só acessa se estiver logado
  const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    if (isLoggedIn === null) {
      return <p>Loading...</p>;
    }
    if (!isLoggedIn) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  // Rota de login - redireciona se já estiver logado
  const LoginRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);
    if (isLoggedIn) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <AuthProvider>
      <GalleryProvider>
        <Router basename="/projeto-museum">
          <div className="App d-flex flex-column min-vh-100">
            <Header />
            <div className="content-container">
              <Container className="routes p-0 m-0">
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/art" element={
                    <ProtectedRoute>
                      <Art />
                    </ProtectedRoute>
                  } />
                  <Route path="/login" element={
                    <LoginRoute>
                      <Login />
                    </LoginRoute>
                  } />
                  <Route path="/insert" element={
                    <ProtectedRoute>
                      <InsertArtwork />
                    </ProtectedRoute>
                  } />
                  <Route path="/department/:id" element={<DepartmentGallery />} />
                  <Route path="/art/:objectID" element={<ArtDetails />} />
                </Routes>
              </Container>

              <div className={`aside-container ${isAsideVisible ? 'show' : 'hide'}`}>
                <Aside toggleAside={toggleAside} />
              </div>

              <Button
                variant="primary"
                onClick={toggleAside}
                className="floating-toggle-button"
                style={{ position: 'fixed', right: isAsideVisible ? '250px' : '10px', zIndex: 10, }}
              >
                {isAsideVisible ? <FaChevronLeft /> : <FaChevronRight />}
              </Button>
            </div>
            <Footer />
          </div>
        </Router>
      </GalleryProvider>
    </AuthProvider>
  );
}

export default App;
