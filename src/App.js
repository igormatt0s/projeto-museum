import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Aside from './components/Aside/Aside';
import Footer from './components/Footer/Footer';
import About from './pages/About/About';
import Art from './pages/Art/Art';
import DepartmentGallery from './pages/DepartmentGallery/DepartmentGallery';
import ArtDetails from './pages/ArtDetails/ArtDetails';
import GalleryProvider from './context/GalleryContext';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <GalleryProvider>
      <Router>
        <div className="App d-flex flex-column min-vh-100">
          <Header />
          <div className="content-container">
            <Container className="routes p-0 m-0">
              <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/about" element={<About />} />
                <Route path="/art" element={<Art />} />
                <Route path="/department/:id" element={<DepartmentGallery />} />
                <Route path="/art/:objectID" element={<ArtDetails />} />
              </Routes>
            </Container>
            <Aside />
          </div>
          <Footer />
        </div>
      </Router>
    </GalleryProvider>
  );
}

export default App;
