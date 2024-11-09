import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Aside from './components/Aside/Aside'
import Footer from './components/Footer/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="content">
        <Aside />
        <Main />
      </div>
      <Footer />
    </div>
  );
}

export default App;
