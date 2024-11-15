import React, { useContext } from 'react';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { GalleryContext } from '../../context/GalleryContext';
import useArtworks from '../../hooks/useArtworks';
import './Art.css';

const Art = () => {
  const { artworks, isLoading } = useContext(GalleryContext);
  const { currentPage, currentArtworks, handleNextPage, handlePreviousPage } = useArtworks(artworks);

  return (
    <Container className="art-container">
      <h1 className="my-4 text-center">Art Gallery</h1>
      {isLoading ? (
        <Alert variant="info" className="text-center" style={{backgroundColor: 'rgb(211, 253, 200)'}}>
          Loading images...
        </Alert>
      ) : currentArtworks.length === 0 ? (
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
          <div className="pagination-controls text-center my-5">
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
              className={`button-navigation ${currentPage < Math.ceil(artworks.length / 20) ? 'enabled' : 'disabled'}`}
              disabled={currentPage === Math.ceil(artworks.length / 20)}
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
