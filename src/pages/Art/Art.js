import React, { useContext, useEffect, useState } from 'react'
import { GalleryContext } from '../../context/GalleryContext'
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './Art.css'
import axios from 'axios';

const Art = () => {
  const { artworks } = useContext(GalleryContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentArtworks, setCurrentArtworks] = useState([]);
  const artworksPerPage = 20;

  const fetchPageArtworks = async () => {
    let validArtworks = [];
    let currentIndex = (currentPage - 1) * artworksPerPage;
  
    while (validArtworks.length < artworksPerPage && currentIndex < artworks.length) {
      // Tenta buscar até 20 IDs a partir do índice atual
      const batchIDs = artworks.slice(currentIndex, currentIndex + artworksPerPage);
      
      // Usa `Promise.allSettled` para lidar com respostas `null`
      const artData = await Promise.allSettled(
        batchIDs.map(async (id) => {
          try {
            const res = await axios.get(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return res.data.primaryImageSmall ? res.data : null;
          } catch (error) {
            console.error(`Erro ao buscar obra com ID ${id}:`, error);
            return null;
          }
        })
      );

      console.log(artData)
  
      // Filtra e adiciona apenas as respostas válidas
      const newValidArtworks = artData
        .filter(result => result.status === 'fulfilled' && result.value !== null)
        .map(result => result.value);
  
      validArtworks.push(...newValidArtworks);
  
      // Atualiza o índice para continuar buscando a partir do próximo bloco
      currentIndex += artworksPerPage;
    }
  
    // Limita para exatamente 20 obras válidas
    setCurrentArtworks(validArtworks.slice(0, artworksPerPage));
  };

  // Atualizar as obras da página quando a página atual ou as artworks mudarem
  useEffect(() => {
    fetchPageArtworks();
  }, [currentPage, artworks]);

  // Funções para navegação de página
  const handleNextPage = () => {
    if (currentPage < Math.ceil(artworks.length / artworksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Container className='art-container'>
      <h1 className="my-4 text-center">Art Gallery</h1>
      {currentArtworks.length === 0 ? (
        <Alert variant="info" className="text-center">
          No search has been conducted. Please perform a search to see the main artworks.
        </Alert>
      ) : (
        <>
          <Row>
            {currentArtworks.map((artwork) => (
              <Col md={4} lg={3} key={artwork.objectID} className="mb-4">
                <Link to={`/art/${artwork.objectID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Card>
                    <Card.Img variant="top" src={artwork.primaryImageSmall || 'placeholder.jpg'} />
                    <Card.Body>
                      <Card.Title>{artwork.title}</Card.Title>
                      <Card.Text>{artwork.artistDisplayName}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
          <div className="pagination-controls text-center my-4">
            <Button
              onClick={handlePreviousPage}
              className={`button-navigation ${currentPage > 1 ? 'enabled' : 'disabled'}`}
              disabled={currentPage <= 1}
            >
              Previous
            </Button>
            <span className="page-indicator mx-3">Page {currentPage}</span>
            <Button
              onClick={handleNextPage}
              className={`button-navigation ${currentPage < Math.ceil(artworks.length / artworksPerPage) ? 'enabled' : 'disabled'}`}
              disabled={currentPage === Math.ceil(artworks.length / artworksPerPage)}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Art;