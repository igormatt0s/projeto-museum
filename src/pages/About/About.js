import React from 'react'
import './About.css'
import atm_facade from '../../assets/images/atm_facade.jpg'
import buddha from '../../assets/images/buddha.jpg'
import atm_curatorial_roman from '../../assets/images/atm_curatorial_roman.jpg'
import atm_policies from '../../assets/images/atm_policies.jpg'

const About = () => {
    return (
      <main className="about">
        <section className="resume">
            <div className="resumeText">
                <h1>The Met</h1>
                <p>O Met apresenta mais de 5.000 anos de arte de todo o mundo para que todos possam experimentar e desfrutar.</p>
            </div>
            <img src={atm_facade} className="imageMet" alt="Uma vista da fachada neoclássica do The Met Fifth Avenue" />
        </section>
        <section className='info'>
            <h2>Sobre o Museu</h2>
            <p>O Museu fica em dois locais icônicos na cidade de Nova York - The Met Fifth Avenue e The Met Cloisters. Milhões de pessoas também participam da experiência do Met online.</p>
            <p>Desde que foi fundado em 1870, o Met sempre aspirou a ser mais do que um tesouro de objetos raros e bonitos. Todos os dias, a arte ganha vida nas galerias do Museu e por meio de suas exposições e eventos, revelando novas ideias e conexões inesperadas ao longo do tempo e entre culturas.</p>
            <div className='mission'>
                <img src={buddha} className="imageMission" alt="Buddha de Medicine Bhaishajyaguru" />
                <div className='missionText'>
                    <h3>Missão</h3>
                    <p>O Museu Metropolitano de Arte coleta, estuda, conserva e apresenta obras de arte significativas ao longo do tempo e das culturas para conectar todas as pessoas à criatividade, conhecimento, ideias e umas às outras.</p>
                </div>
            </div>
            <div className='apiText'>
                <div className='rowImages'>
                    <img src={atm_curatorial_roman} className="imageMet" alt="Arte grega e romana" />
                    <img src={atm_policies} className="imageMet" alt="Escultura romana" />
                </div>
                <h3>API da coleção do Metropolitan Museum of Art</h3>
                <p>O Metropolitan Museum of Art fornece conjuntos de dados selecionados de informações sobre mais de 470.000 obras de arte em sua coleção para uso comercial e não comercial irrestrito. Na medida do possível por lei, o Metropolitan Museum of Art renunciou a todos os direitos autorais e direitos relacionados ou conexos a este conjunto de dados usando a licença Creative Commons Zero. Este trabalho é publicado nos Estados Unidos da América. Esses conjuntos de dados selecionados agora estão disponíveis para uso em qualquer mídia sem permissão ou taxa; Eles também incluem dados de identificação de obras de arte protegidas por direitos autorais. Os conjuntos de dados suportam a pesquisa, uso e interação com a coleção do Museu.</p>
                <p>Os conjuntos de dados de acesso aberto do Met estão disponíveis por meio de nossa API. A API (serviço web RESTful em formato JSON) dá acesso a todos os dados de acesso aberto do The Met e às imagens de alta resolução correspondentes (formato JPEG) que são de domínio público.</p>
            </div>
        </section>
      </main>
    );
  };
  
  export default About;