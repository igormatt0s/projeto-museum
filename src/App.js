import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Aside from './components/Aside/Aside'
import Footer from './components/Footer/Footer'
import About from './pages/About/About'
import Art from './pages/Art/Art'

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="content">
          <div className="routes">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/about" element={<About />} />
              <Route path="/art" element={<Art />} />
            </Routes>
          </div>
          {/*<Aside className="aside" />*/}
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
