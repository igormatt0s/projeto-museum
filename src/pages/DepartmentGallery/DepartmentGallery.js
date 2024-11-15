// pages/DepartmentGallery/DepartmentGallery.js
import React, { useContext } from 'react';
import { GalleryContext } from '../../context/GalleryContext';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useArtworks from '../../hooks/useArtworks';
import './DepartmentGallery.css';

const DepartmentGallery = () => {
  const { selectedDepartment, artworks, isLoading } = useContext(GalleryContext);
  const { currentPage, currentArtworks, handleNextPage, handlePreviousPage } = useArtworks(artworks);

  return (
    <Container className='department-gallery'>
      <h2 className="my-4 text-center">Works of the Department {selectedDepartment.name}</h2>
      {isLoading ? (
        <Alert variant="info" className="text-center" style={{backgroundColor: 'rgb(211, 253, 200)'}}>
          Loading images...
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
          disabled={currentPage === 1}
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

export default DepartmentGallery;
